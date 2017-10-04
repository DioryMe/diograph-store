import { DiographApi } from "../../../app/lib/diograph-api"
import * as ErrorHandler from "../../../app/lib/error-handler"

describe("Diograph API .getAll()", () => {

  beforeEach(() => {
    DiographApi.authToken = "df548369-d0a2-4ca5-b28a-dd4fb14c1f08"
  })

  it("returns diories", (done) => {
    DiographApi.getAll().then(res => {
      expect(res.data).toEqual(jasmine.any(Array));
      expect(res.data[0].type).toEqual("diories");
      done();
    }, (e) => { ErrorHandler.logAndFailTest(e); done();})
  })

  describe("when diory type is given", () => {
    var dioryId

    beforeEach((done) => {
      DiographApi.authToken = "df548369-d0a2-4ca5-b28a-dd4fb14c1f08"
      DiographApi.create({"name": "New place", "diory-type": "place"}).then((res) => {
        dioryId = res.data.id
        done()
      })
    })

    afterEach((done) => {
      DiographApi.delete(dioryId).then(res => {
        done();
      })
    })

    it("returns given type of diories", (done) => {
      DiographApi.getAll("place").then(res => {
        expect(res.data.length).toBeTruthy();
        expect(res.data[0].attributes["diory-type"]).toEqual("place");
        expect(res.data[res.data.length - 1].attributes["diory-type"]).toEqual("place");
        done();
      }, (e) => { ErrorHandler.logAndFailTest(e); done();})
    })

    it("returns error if invalid type is given", (done) => {
      try {
        DiographApi.getAll("invalid type").then(() => {
          done.fail("No error was raised");
        })
      }
      catch(err) {
        expect(err).toBe("Invalid type for DiographApi.getAll()");
        done();
      }
    })
  })

})
