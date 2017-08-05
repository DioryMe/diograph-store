import { JsonApiDataStore } from "jsonapi-datastore"
import { Diory } from "./models/diory"
import { DiographApi } from "./lib/diograph-api"

export class DiographStore {

  public static setAuthToken(token) {
    DiographApi.authToken = token
    this.datastore = new JsonApiDataStore();
  }

  private static datastore = new JsonApiDataStore()

  static get(id): Promise<Diory> {
    if (id === undefined) { throw "No id was given for DiographStore.get()" }
    return DiographApi.get(id).then(response => {
      this.datastore.sync(response)
      return new Diory(this.datastore.find("diories", id))
    })
  }

  static getAll(): Promise<Diory[]> {
    return DiographApi.getAll().then(response => {
      this.datastore.sync(response)
      return this.datastore.findAll("diories").map(diory => {
        return new Diory(diory)
      })
    })
  }

  static createDiory(obj): Promise<Diory> {
    return DiographApi.create(obj).then(response => {
      this.datastore.sync(response)
      return new Diory(this.datastore.find("diories", response.data.id))
    })
  }

}

