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

  private static baseUrl = "http://diory-server.herokuapp.com/v1/"

  static get(id, type="diories") {
    if (type !== "diories" && type !== "connections") { throw "Invalid type for DiographApi.get()" }
    if (id === undefined) { throw "No id was given for DiographApi.get()" }
    let endpoint = this.baseUrl + type + "/" + id
    return this.getFromEndpoint(endpoint)
  }

  static getAll(type=undefined) {
    if (type && ["place", "check-in"].indexOf(type) < 0) { throw "Invalid type for DiographApi.getAll()" }
    let endpoint = this.baseUrl + "diories"
    let query = type ? { filter: { diory_type: type }} : undefined
    return this.getFromEndpoint(endpoint, query)
  }

  static create(data={}, type="diories") {
    if (!(data instanceof Object)) { throw "Data given for DiographApi.create() wasn't an object"}
    if (type !== "diories" && type !== "connections") { throw "Invalid type for DiographApi.create()" }
    let endpoint = this.baseUrl + type
    let jsonApiData = this.hashToJsonApi(data, type);
    return this.postToEndpoint(endpoint, jsonApiData)
  }

  static update(id, data={}, type="diories") {
    if (id === undefined) { throw "No id was given for DiographApi.update()" }
    if (!(data instanceof Object)) { throw "Data given for DiographApi.update() wasn't an object"}
    if (type !== "diories") { throw "Invalid type for DiographApi.update()" }
    let endpoint = this.baseUrl + type + "/" + id
    let jsonApiData = this.hashToJsonApi(data, type, id);
    return this.putToEndpoint(endpoint, jsonApiData)
  }

  static delete(id, type="diories") {
    if (id === undefined) { throw "No id was given for DiographApi.delete()" }
    if (type !== "diories") { throw "Invalid type for DiographApi.delete()" }
    let endpoint = this.baseUrl + type + "/" + id
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
      return res.status
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

