import { JsonApiDataStore } from "jsonapi-datastore"
import { Diory } from "./models/diory"
import { Connection } from "./models/connection"
import { DiographApi } from "./lib/diograph-api"

import { EXIF } from 'exif-js'
import * as request from "superagent"

// Better error message for Unhandled Promise rejections
process.on('unhandledRejection', function(reason, p) {
    console.log("Unhandled Rejection, reason: ", reason);
});

// Promise.all() requires this to work
declare var Promise: any;

export interface ConnectionObject {
  fromDiory: Diory;
  toDiory: Diory;
  connection: Connection;
}

export class DiographStore {

  public static setAuthToken(token) {
    DiographApi.authToken = token
    this.datastore = new JsonApiDataStore();
  }

  private static datastore = new JsonApiDataStore()

  static getDiory(id): Promise<Diory> {
    if (id === undefined) { throw "No id was given for DiographStore.getDiory()" }
    return DiographApi.get(id).then(response => {
      this.datastore.sync(response)
      return new Diory(this.datastore.find("diories", response.data.id))
    }).catch(err => {
      if (err.status === 404) {
        return null
      }
    })
  }

  static getAllDiories(type=undefined): Promise<Diory[]> {
    let dioryJSONs, dioryIds
    return DiographApi.getAll(type).then(response => {
      this.datastore.sync(response)
      if (type) {
        let dioryIds = response["data"].map(dioryJSON => { return dioryJSON["id"]})
        dioryJSONs = this.datastore.findAll("diories").filter(dioryData => {
          return dioryIds.includes(dioryData.id)
        })
      } else {
        dioryJSONs = this.datastore.findAll("diories")
      }
      return dioryJSONs.map(diory => {
        return new Diory(diory)
      })
    })
  }

  static createDiory(obj): Promise<Diory> {
    if (!(obj instanceof Object)) { throw "Data given for DiographStore.createDiory() wasn't an object"}
    let requestObj = this.convertResponseObjectToRequestObject(obj)
    return DiographApi.create(requestObj).then(response => {
      this.datastore.sync(response)
      return new Diory(this.datastore.find("diories", response.data.id))
    })
  }

  static updateDiory(id, obj): Promise<Diory> {
    if (id === undefined) { throw "No id was given for DiographStore.updateDiory()" }
    if (!(obj instanceof Object)) { throw "Data given for DiographStore.updateDiory() wasn't an object"}
    let requestObj = this.convertResponseObjectToRequestObject(obj)
    return DiographApi.update(id, requestObj).then(response => {
      this.datastore.sync(response)
      return new Diory(this.datastore.find("diories", response.data.id))
    })
  }

  static deleteDiory(id): Promise<any> {
    return DiographApi.delete(id).then(response => {
      let dioryDatastoreModel = this.datastore.find("diories", id)
      this.datastore.destroy(dioryDatastoreModel)
      return null
    })
  }

  static getConnection(fromDioryId, toDioryId): Promise<any> {
    if (fromDioryId === undefined || toDioryId === undefined) { throw "Required two ids not given to DiographStore.getConnection()" }
    return DiographApi.get([fromDioryId, toDioryId], "connections").then(response => {
      this.datastore.sync(response)
      if (response.data.length > 0) {
        return new Connection(this.datastore.find("connections", response.data[0].id))
      } else {
        return null
      }
    })
  }

  static deleteConnection(fromDioryId, toDioryId): Promise<any> {
    if (fromDioryId === undefined || toDioryId === undefined) { throw "Required two ids not given to DiographStore.deleteConnection()" }
    return this.getConnection(fromDioryId, toDioryId).then(connection => {
      if (connection === null) {
        return null
      } else {
        return DiographApi.delete(connection.id, "connections").then(response => {
          // let connectionDatastoreModel = this.datastore.find("connections", connection.id)
          // this.datastore.destroy(connectionDatastoreModel)
          return null
        })
      }
    })
  }

  static deleteStrongConnection(fromDioryId, toDioryId): Promise<any> {
    if (fromDioryId === undefined || toDioryId === undefined) { throw "Required two ids not given to DiographStore.deleteStrongConnection()" }
    let fromToPromise = this.deleteConnection(fromDioryId, toDioryId)
    let toFromPromise = this.deleteConnection(toDioryId, fromDioryId)
    return Promise.all([fromToPromise, toFromPromise]).then(() => {
      return null
    })
  }

  static connectDiories(fromDioryId, toDioryId): Promise<ConnectionObject> {
    if (fromDioryId === undefined || toDioryId === undefined) { throw "DiographStore.connectDiories() requires two parameters" }
    let fromDiory, toDiory
    let fromDioryPromise = this.getDiory(fromDioryId).then((diory) => {
      fromDiory = diory
    })
    let toDioryPromise = this.getDiory(toDioryId).then(diory => {
      toDiory = diory
    })
    return Promise.all([fromDioryPromise, toDioryPromise]).then(() => {
      let requestObject = {
        "from-diory-id": fromDiory.id,
        "to-diory-id": toDiory.id
      }
      return DiographApi.create(requestObject, "connections").then(response => {
        this.datastore.sync(response)
        return {
          fromDiory: fromDiory,
          toDiory: toDiory,
          connection: new Connection(this.datastore.find("connections", response.data.id))
        }
      })
    })
  }

  static createAndConnectDiory(obj, fromDioryId): Promise<ConnectionObject> {
    if (!(obj instanceof Object)) { throw "Data given for DiographStore.createAndConnectDiory() wasn't an object"}
    if (fromDioryId === undefined) { throw "DiographStore.createAndConnectDiory() requires two parameters" }
    return this.createDiory(obj).then(createdDiory => {
      return this.connectDiories(fromDioryId, createdDiory.id).then(connectionObject => {
        return connectionObject;
      })
    })
  }

  static createAndConnectDioryStrongly(obj, fromDioryId): Promise<ConnectionObject> {
    return this.createAndConnectDiory(obj, fromDioryId).then(connectionObject => {
      return this.connectDiories(connectionObject.toDiory.id, connectionObject.fromDiory.id).then((updatedConnectionObject) => {
        connectionObject.fromDiory = updatedConnectionObject.toDiory
        connectionObject.toDiory = updatedConnectionObject.fromDiory
        return connectionObject;
      })
    })
  }

  static async createDioryFromImageFile(event): Promise<Diory> {
    var file = event.target.files[0];
    console.log(file);

    // 1. Background is the uploaded image's S3 url
    let background =
      // Get uploadUrl from diory-server
      await DiographApi.getUploadUrls().then((uploadUrls) => {
        console.log(uploadUrls["upload-url"])
        // Upload the file to S3 via PUT request to uploadUrl
        return request.put(uploadUrls["upload-url"]).send(file).then((response) => {
          // Return S3 url
          console.log(uploadUrls["public-url"])
          return uploadUrls["public-urls"]
        })
      })

    // 2. Date, latitude & longitude are extracted from EXIF
    let exif = await this.extractEXIFData(file)
    console.log(exif)

    // 3. Diory attributes are composed to dioryData
    let dioryData = {
      name: file.name,
      type: "image",
      background: background,
      date: exif["date"],
      latitude: exif["latitude"],
      longitude: exif["longitude"]
    }

    console.log(dioryData)

    // 4. Create diory and return it
    return this.createDiory(dioryData).then(diory => {
      return diory
    })
  }

  static async extractEXIFData(file) {
    let exif = {}
    return EXIF.getData(file, function() {
      exif["date"] = this.toGpsDecimal(EXIF.getTag(this, "DateTimeOriginal"));
      exif["latitude"] = this.toGpsDecimal(EXIF.getTag(this, "GPSLatitude"));
      exif["longitude"] = this.toGpsDecimal(EXIF.getTag(this, "GPSLongitude"));
      return exif
    });

  }

  static toGpsDecimal(number) {
    return number[0].numerator + number[1].numerator /
      (60 * number[1].denominator) + number[2].numerator / (3600 * number[2].denominator);
  };

  // Private

  static convertResponseObjectToRequestObject(obj) {
    delete obj["connectedDiories"]
    delete obj["id"]
    if (obj["type"]) {
      obj["diory-type"] = obj["type"]
      delete obj["type"]
    }
    if (obj["url"]) {
      obj["address"] = obj["url"]
      delete obj["url"]
    }
    if (obj["geo"] != undefined) {
      obj["latitude"] = obj["geo"]["latitude"]
      obj["longitude"] = obj["geo"]["longitude"]
      delete obj["geo"]
    }
    return obj
  }

}

