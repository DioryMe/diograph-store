import { DiographApi } from "../../../app/lib/diograph-api"
import * as ErrorHandler from "../../../app/lib/error-handler"

describe("Diograph API .update()", () => {
   var dioryId;

  beforeEach((done) => {
    DiographApi.authToken = "df548369-d0a2-4ca5-b28a-dd4fb14c1f08"
    DiographApi.create({"name": "Old name"}).then((res) => {
      dioryId = res.data.id
      done()
    })
  })

  afterEach((done) => {
    DiographApi.delete(dioryId).then(res => {
      done();
    })
  })

  it("updates a 'New diory'", (done) => {
    let data = {"name": "New name"}
    DiographApi.update(dioryId, data).then(res => {
      expect(res.data.attributes.name).toEqual("New name");
      done();
    }, (e) => { ErrorHandler.logAndFailTest(e); done();})
  })

  it("throws an error if id is not given", (done) => {
    try {
      DiographApi.update(undefined, undefined, undefined).then(() => {
        done.fail("No error was raised");
      })
    }
    catch(err) {
      expect(err).toBe("No id was given for DiographApi.update()");
      done();
    }
  })

  it("throws an error if second parameter is something else than an object", (done) => {
    try {
      DiographApi.update(123, "this should be an {}", "diories").then(() => {
        done.fail("No error was raised");
      })
    }
    catch(err) {
      expect(err).toBe("Data given for DiographApi.update() wasn't an object");
      done();
    }
  })

  it("returns error if invalid type is given", (done) => {
    let data = {"name": "New name"}
    try {
      DiographApi.update(dioryId, data, "invalid type").then(() => {
        done.fail("No error was raised");
      })
    }
    catch(err) {
      expect(err).toBe("Invalid type for DiographApi.update()");
      done();
    }
  })
})
