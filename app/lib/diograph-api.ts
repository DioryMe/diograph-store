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

  static getAll(type="diories") {
    if (type !== "diories") { throw "Invalid type for DiographApi.getAll()" }
    let endpoint = this.baseUrl + type
    return this.getFromEndpoint(endpoint)
  }

  static create(data={}, type="diories") {
    if (type !== "diories") { throw "Invalid type for DiographApi.create()" }
    let endpoint = this.baseUrl + type
    return this.postToEndpoint(endpoint, data)
  }

  private static getFromEndpoint(endpoint) {
    var promise = request
      .get(endpoint)
      .set("Accept", "application/vnd.api+json")
      .set("Authorization", this.getAuthToken())

    return promise.then((res, err) => {
      return res.body
    }).catch(err => {
      throw err.response.body
    })
  }

  private static postToEndpoint(endpoint, data) {
    var promise = request
      .post(endpoint)
      .send(data)
      .set("Accept", "application/vnd.api+json")
      .set("Authorization", this.getAuthToken())

    return promise.then((res, err) => {
      return res.body
    }).catch(err => {
      throw err.response.body
    })
  }

}

