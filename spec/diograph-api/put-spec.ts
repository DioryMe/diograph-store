import { DiographApi } from "../../app/lib/diograph-api"
import * as ErrorHandler from "../../app/lib/error-handler"

describe("Diograph API .update()", () => {
   var dioryId;

  beforeEach((done) => {
    DiographApi.authToken = "test-token"
    DiographApi.create({"name": "Old name"}).then((res) => {
      dioryId = res.data.id
      done()
    })
  })

  it("updates a 'New diory'", (done) => {
    let data = {"name": "New name"}
    DiographApi.update(dioryId, data).then(res => {
      expect(res.data.attributes.name).toEqual("New name");
      done();
    }, (e) => { ErrorHandler.logAndFailTest(e); done();})
  })

  it("returns error if invalid type is given", (done) => {
    let data = {"name": "New name"}
    try {
      DiographApi.update(dioryId, data, "invalid type")
    }
    catch(err) {
      expect(err).toBe("Invalid type for DiographApi.update()");
      done();
    }
  })

})
