import * as superagent from "superagent"
var request = superagent.agent()

export class DioryApi {

  public static authToken
  private static getAuthToken() {
    let authToken
    try {
      let diographAuth = require("diograph-authentication")
      authToken = diographAuth.token
    }
    catch(e) {
      authToken = this.authToken
    }

    if (typeof authToken === "string" && authToken !== "") {
      return authToken
    } else {
      throw "Authentication token not given"
    }

  }

  private static baseUrl = "http://diory-server.herokuapp.com/v1/"

  static get(id, type="diories") {

    type = type + "/"

    var promise = request
      .get(this.baseUrl + type + id)
      .set("Accept", "application/vnd.api+json")
      .set("Authorization", this.getAuthToken())

    return promise.then((res, err) => {
      return res.body
    }).catch(err => {
      throw err.response.body
    })

  }

}

