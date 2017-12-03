import { JsonApiDataStore } from "jsonapi-datastore"
import { Diory } from "./models/diory"
import { Connection } from "./models/connection"
import { DiographApi } from "./lib/diograph-api"

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
      return new Diory(this.datastore.find("diories", id))
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
      return new Connection(this.datastore.find("connections", response.data[0].id))
    })
  }

  static deleteConnection(fromDioryId, toDioryId): Promise<any> {
    if (fromDioryId === undefined || toDioryId === undefined) { throw "Required two ids not given to DiographStore.deleteConnection()" }
    return this.getConnection(fromDioryId, toDioryId).then(connection => {
      return DiographApi.delete(connection.id, "connections").then(response => {
        // let connectionDatastoreModel = this.datastore.find("connections", connection.id)
        // this.datastore.destroy(connectionDatastoreModel)
        return null
      })
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

