import { JsonApiDataStore } from "jsonapi-datastore"
import { Diory } from "./models/diory"
import { DioryApi } from "./lib/diory-api"

export class DiographStore {

  public static setAuthToken(token) {
    DioryApi.authToken = token
  }

  private static datastore = new JsonApiDataStore()

  static get(id): Promise<Diory> {
    return DioryApi.get(id).then(response => {
      this.datastore.sync(response);
      return new Diory(this.datastore.find("diories", id));
    });
  }

}

