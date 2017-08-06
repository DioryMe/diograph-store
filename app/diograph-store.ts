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

  static getAllDiories(): Promise<Diory[]> {
    return DiographApi.getAll().then(response => {
      this.datastore.sync(response)
      return this.datastore.findAll("diories").map(diory => {
        return new Diory(diory)
      })
    })
  }

  static createDiory(obj): Promise<Diory> {
    if (obj === undefined) { throw "No object was given for DiographStore.createDiory()" }
    return DiographApi.create(obj).then(response => {
      this.datastore.sync(response)
      return new Diory(this.datastore.find("diories", response.data.id))
    })
  }

  static connectDiories(fromDioryId, toDioryId): Promise<ConnectionObject> {
    let fromDiory, toDiory
    if (fromDioryId === undefined || toDioryId === undefined) { throw "DiographStore.connectDiories() requires two parameters" }
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
    return this.createDiory(obj).then(createdDiory => {
      return this.connectDiories(fromDioryId, createdDiory.id).then(connectionObject => {
        return connectionObject;
      })
    })
  }

}

