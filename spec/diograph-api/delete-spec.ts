import { DiographApi } from "../../app/lib/diograph-api"
import * as ErrorHandler from "../../app/lib/error-handler"

describe("Diograph API .delete()", () => {
   var dioryId;

  beforeEach((done) => {
    DiographApi.authToken = "test-token"
    DiographApi.create({"name": "Diory to be deleted"}).then((res) => {
      dioryId = res.data.id
      done()
    })
  })

  it("deletes a 'New diory'", (done) => {
    DiographApi.delete(dioryId).then(res => {
      expect(res).toBe(204)
      done();
    }, (e) => { ErrorHandler.logAndFailTest(e); done();})
  })

  it("returns error if invalid type is given", (done) => {
    try {
      DiographApi.delete(dioryId, "invalid type").then(() => {
        done.fail("No error was raised");
      })
    }
    catch(err) {
      expect(err).toBe("Invalid type for DiographApi.delete()");
      done();
    }
  })

})
