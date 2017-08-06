import { DiographStore } from "../../app/diograph-store"
import { DiographApi } from "../../app/lib/diograph-api"
import { Diory } from "../../app/models/diory"
import * as ErrorHandler from "../../app/lib/error-handler"

describe("DiographStore .getAll()", () => {

  beforeEach(() => {
    DiographStore.setAuthToken("test-token")
  })

  it("returns array of Diories if no type is given", (done) => {
    DiographStore.getAllDiories().then(diories => {
      expect(diories).toEqual(jasmine.any(Array));
      expect(diories[0]).toEqual(jasmine.any(Diory));
      done();
    });
  });


  describe("when diory type is given", () => {
    var diory

    beforeEach((done) => {
      DiographStore.setAuthToken("test-token")
      let obj = {
        "name": "New place",
        "diory-type": "place"
      }
      DiographStore.createDiory(obj).then((createdDiory) => {
        diory = createdDiory
        done()
      })
    })

    afterEach((done) => {
      DiographApi.delete(diory.id).then(res => {
        done();
      })
    })

    it("returns given type of diories", (done) => {
      DiographStore.getAllDiories("place").then(diories => {
        expect(diories[0].type).toEqual("place");
        expect(diories[diories.length - 1].type).toEqual("place");
        done();
      }, (e) => { ErrorHandler.logAndFailTest(e); done();})
    })
  })

});
