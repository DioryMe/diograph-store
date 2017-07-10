import { DiographApi } from "../../app/lib/diograph-api"
import * as ErrorHandler from "../../app/lib/error-handler"

describe("Diograph API .getAll()", () => {

  beforeEach(() => {
    DiographApi.authToken = "test-token"
  })

  it("returns diories", (done) => {
    DiographApi.getAll("diories").then(res => {
      expect(res.data).toEqual(jasmine.any(Array));
      expect(res.data[0].type).toEqual("diories");
      done();
    }, (e) => { ErrorHandler.logAndFailTest(e); done();})
  })

  it("returns diories even though type is not given", (done) => {
    DiographApi.getAll().then(res => {
      expect(res.data).toEqual(jasmine.any(Array));
      expect(res.data[0].type).toEqual("diories");
      done();
    }, (e) => { ErrorHandler.logAndFailTest(e); done();})
  })

  it("returns error if invalid type is given", (done) => {
    try {
      DiographApi.getAll("invalid type")
    }
    catch(err) {
      expect(err).toBe("Invalid type for DiographApi.getAll()");
      done();
    }
  })

})
