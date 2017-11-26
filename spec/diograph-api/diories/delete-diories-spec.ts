import { DiographApi } from "../../../app/lib/diograph-api"
import * as ErrorHandler from "../../../app/lib/error-handler"

describe("Diograph API .delete()", () => {
   var dioryId;

  beforeEach((done) => {
    DiographApi.authToken = "df548369-d0a2-4ca5-b28a-dd4fb14c1f08"
    DiographApi.create({"name": "Diory to be deleted"}).then((res) => {
      dioryId = res.data.id
      done()
    })
  })

  it("deletes a 'New diory'", (done) => {
    DiographApi.delete(dioryId).then(res => {
      expect(res).toEqual({})
      done();
    }, (e) => { ErrorHandler.logAndFailTest(e); done();})
  })

  describe("errors", () => {

    afterEach((done) => {
      DiographApi.delete(dioryId).then(res => {
        done();
      })
    })

    it("throws an error if id is not given", (done) => {
      try {
        DiographApi.delete(undefined).then(() => {
          done.fail("No error was raised");
        })
      }
      catch(err) {
        expect(err).toBe("No id was given for DiographApi.delete()");
        done();
      }
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

})
