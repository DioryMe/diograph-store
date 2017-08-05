import { JsonApiDataStore } from "jsonapi-datastore"
import { Diory } from "./models/diory"
import { Connection } from "./models/connection"
import { DiographApi } from "./lib/diograph-api"

// Better error message for Unhandled Promise rejections
process.on('unhandledRejection', function(reason, p) {
    console.log("Unhandled Rejection, reason: ", reason);
});

export class DiographStore {

  public static setAuthToken(token) {
    DiographApi.authToken = token
    this.datastore = new JsonApiDataStore();
  }

  private static datastore = new JsonApiDataStore()

  static getDiory(id): Promise<Diory> {
    if (id === undefined) { throw "No id was given for DiographStore.get()" }
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

  static createConnection(obj): Promise<Connection> {
    if (obj === undefined) { throw "No object was given for DiographStore.createConnection()" }
    if (!(obj.fromDiory instanceof Diory) || !(obj.toDiory instanceof Diory)) {
      throw "From-diory or to-diory missing from object given to DiographStore.createConnection()"
    }
    let requestObject = {
      "from-diory-id": obj.fromDiory.id,
      "to-diory-id": obj.toDiory.id
    }
    return DiographApi.create(requestObject, "connections").then(response => {
      this.datastore.sync(response)
      return new Connection(this.datastore.find("connections", response.data.id))
    })
  }

}

