import { JsonApiDataStore } from "jsonapi-datastore"
import { Diory } from "./models/diory"
import { DiographApi } from "./lib/diograph-api"

export class DiographStore {

  public static setAuthToken(token) {
    DiographApi.authToken = token
  }

  private static datastore = new JsonApiDataStore()

  static get(id): Promise<Diory> {
    if (id === undefined) { throw "No id was given for DiographStore.get()" }
    return DiographApi.get(id).then(response => {
      this.datastore.sync(response);
      return new Diory(this.datastore.find("diories", id));
    });
  }

  static getAll(): Promise<Diory[]> {
    return new Promise((resolve, reject) => { resolve([new Diory({})]); });
    // return DioryApi.getAll().then(response => {
    //   this.datastore.sync(response);
    //   return new Diory(this.datastore.find("diories", id));
    // });
  }

}

