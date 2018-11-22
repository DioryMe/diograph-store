import * as request from "superagent"

export class DiographApi {

  public static authToken

  private static getAuthToken() {
    if (typeof this.authToken === "string") {
      return this.authToken
    } else if (!this.authToken || this.authToken === "") {
      throw "Authentication token not given."
    } else {
      throw "Authentication token is invalid."
    }
  }

  static get(id, type="diories") {
    if (type !== "diories" && type !== "connections") { throw "Invalid type for DiographApi.get()" }
    if (id === undefined) { throw "No id was given for DiographApi.get()" }
    let endpoint = process.env.DIOGRAPH_SERVER_HOST + "/" + type + "/" + id
    let query = {}
    if (type == "connections") {
      if (!(id instanceof Array)) { throw "Id should be an array in DiographApi.get('connections')" }
      endpoint = process.env.DIOGRAPH_SERVER_HOST + "/" + type + "/"
      query = { filter: { "from-diory-id": id[0], "to-diory-id": id[1]}}
    }
    return this.getFromEndpoint(endpoint, query)
  }

  static getAll(type=undefined) {
    if (type && ["place", "check-in"].indexOf(type) < 0) { throw "Invalid type for DiographApi.getAll()" }
    let endpoint = process.env.DIOGRAPH_SERVER_HOST + "/" + "diories"
    let query = type ? { filter: { diory_type: type }, include: "connected-diories,connections" } : undefined
    return this.getFromEndpoint(endpoint, query)
  }

  static create(data={}, type="diories") {
    if (!(data instanceof Object)) { throw "Data given for DiographApi.create() wasn't an object"}
    if (type !== "diories" && type !== "connections") { throw "Invalid type for DiographApi.create()" }
    let endpoint = process.env.DIOGRAPH_SERVER_HOST + "/" + type
    let jsonApiData = this.hashToJsonApi(data, type);
    return this.postToEndpoint(endpoint, jsonApiData)
  }

  static update(id, data={}, type="diories") {
    if (id === undefined) { throw "No id was given for DiographApi.update()" }
    if (!(data instanceof Object)) { throw "Data given for DiographApi.update() wasn't an object"}
    if (type !== "diories") { throw "Invalid type for DiographApi.update()" }
    let endpoint = process.env.DIOGRAPH_SERVER_HOST + "/" + type + "/" + id
    let jsonApiData = this.hashToJsonApi(data, type, id);
    return this.putToEndpoint(endpoint, jsonApiData)
  }

  static delete(id, type="diories") {
    if (id === undefined) { throw "No id was given for DiographApi.delete()" }
    if (type !== "diories" && type !== "connections") { throw "Invalid type for DiographApi.delete()" }
    let endpoint = process.env.DIOGRAPH_SERVER_HOST + "/" + type + "/" + id
    return this.deleteToEndpoint(endpoint)
  }

  private static getFromEndpoint(endpoint, query={}) {
    var promise = request
      .get(endpoint)
      .query(query)
      .set("Accept", "application/vnd.api+json")
      .set("Authorization", this.getAuthToken())

    return promise.then((res, err) => {
      return res.body
    }, err => { throw err })
  }

  private static postToEndpoint(endpoint, data) {
    var promise = request
      .post(endpoint)
      .send(data)
      .set("Accept", "application/vnd.api+json")
      .set("Content-Type", "application/vnd.api+json")
      .set("Authorization", this.getAuthToken())

    return promise.then((res, err) => {
      return res.body
    }, err => { throw err })
  }

  private static putToEndpoint(endpoint, data) {
    var promise = request
      .put(endpoint)
      .send(data)
      .set("Accept", "application/vnd.api+json")
      .set("Content-Type", "application/vnd.api+json")
      .set("Authorization", this.getAuthToken())

    return promise.then((res, err) => {
      return res.body
    }, err => { throw err })
  }

  private static deleteToEndpoint(endpoint) {
    var promise = request
      .delete(endpoint)
      .set("Accept", "application/vnd.api+json")
      .set("Authorization", this.getAuthToken())

    return promise.then((res, err) => {
      return res.body
    }, err => { throw err })
  }

  private static hashToJsonApi(obj, type, id=undefined) {
    let jsonApiData = {
      "data": {
        "type": type,
        "attributes": obj
      }
    }
    if (id) {
      jsonApiData["data"]["id"] = id
    }
    return jsonApiData
  }

}

