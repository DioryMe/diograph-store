import { DiographApi } from "../../app/lib/diograph-api"
import * as ErrorHandler from "../../app/lib/error-handler"

describe("Diograph API .get()", () => {

  beforeEach(() => {
    DiographApi.authToken = "test-token"
  })

  it("returns a diory if type is diories", (done) => {
    DiographApi.get("5691", "diories").then(res => {
      expect(res.data.type).toEqual("diories");
      expect(res.data.id).toEqual("5691");
      done();
    }, (e) => { ErrorHandler.logAndFailTest(e); done();})
  })

  it("returns a diory even though type is not given", (done) => {
    DiographApi.get("5691").then(res => {
      expect(res.data.type).toEqual("diories");
      expect(res.data.id).toEqual("5691");
      done();
    }, (e) => { ErrorHandler.logAndFailTest(e); done();})
  })

  it("returns a connection if type is connections", (done) => {
    DiographApi.get("9982", "connections").then(res => {
      expect(res.data.type).toEqual("connections");
      expect(res.data.id).toEqual("9982");
      done();
    }, (e) => { ErrorHandler.logAndFailTest(e); done();})
  })

  it("returns an 400 error if id is invalid", (done) => {
    DiographApi.get("invalid id", "connections").catch(err => {
      expect(err.errors[0].status).toBe("400");
      done();
    }, (e) => { ErrorHandler.logAndFailTest(e); done();})
  })

  it("returns an 404 error if diory with the given id is not found", (done) => {
    DiographApi.get("99999999", "connections").catch(err => {
      expect(err.errors[0].status).toBe("404");
      done();
    }, (e) => { ErrorHandler.logAndFailTest(e); done();})
  })

  it("throws an error if type is invalid", (done) => {
    try {
      DiographApi.get("1234", "invalid type")
    }
    catch(err) {
      expect(err).toBe("Invalid type for DiographApi.get()");
      done();
    }
  })

  it("throws an error if id is not given", (done) => {
    try {
      DiographApi.get(undefined);
    }
    catch(err) {
      expect(err).toBe("No id was given for DiographApi.get()");
      done();
    }
  })

})
