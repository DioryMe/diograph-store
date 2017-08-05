import { DiographApi } from "../../app/lib/diograph-api"
import * as ErrorHandler from "../../app/lib/error-handler"

describe("Diograph API .create()", () => {

  beforeEach(() => {
    DiographApi.authToken = "test-token"
  })

  it("creates a 'New diory'", (done) => {
    let data = {"name": "New diory"}
    DiographApi.create(data, "diories").then(res => {
      expect(res.data.type).toEqual("diories");
      expect(res.data.attributes.name).toEqual("New diory");
      done();
    }, (e) => { ErrorHandler.logAndFailTest(e); done();})
  })

  it("creates a 'New diory' even though type is not given", (done) => {
    let data = {"name": "New diory"}
    DiographApi.create(data).then(res => {
      expect(res.data.type).toEqual("diories");
      expect(res.data.attributes.name).toEqual("New diory");
      done();
    }, (e) => { ErrorHandler.logAndFailTest(e); done();})
  })

  it("returns error if invalid type is given", (done) => {
    try {
      DiographApi.create({}, "invalid type").then(() => {
        done.fail("No error was raised");
      })
    }
    catch(err) {
      expect(err).toBe("Invalid type for DiographApi.create()");
      done();
    }
  })

})
