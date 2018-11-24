import { DiographApi } from "../../../app/lib/diograph-api"
import * as ErrorHandler from "../../../app/lib/error-handler"

describe("Diograph API .get('connections')", () => {

  beforeEach(() => {
    DiographApi.authToken = "testtoken"
  })

  it("returns a connection", (done) => {
    DiographApi.get(["5", "6"], "connections").then(res => {
      expect(res.data[0].type).toEqual("connections");
      expect(res.data[0].id).toEqual("5");
      done();
    }, (e) => { ErrorHandler.logAndFailTest(e); done();})
  })

  it("returns empty array if connection with the given ids is not found", (done) => {
    DiographApi.get(["5", "99999999"], "connections").then((res) => {
      expect(res.data).toEqual([])
      done();
    }, (e) => { ErrorHandler.logAndFailTest(e); done();})
  })

  it("throws an error if id is not an array", (done) => {
    try {
      DiographApi.get("1234", "connections").then(() => {
        done.fail("No error was raised");
      })
    }
    catch(err) {
      expect(err).toBe("Id should be an array in DiographApi.get('connections')");
      done();
    }
  })

})
