import { DiographStore } from "../../../app/diograph-store"
import { DiographApi } from "../../../app/lib/diograph-api"
import { Diory } from "../../../app/models/diory"
import * as ErrorHandler from "../../../app/lib/error-handler"

// Promise.all() requires this to work
declare var Promise: any;

describe("DiographStore .getAllDiories()", () => {

  beforeEach(() => {
    DiographStore.setAuthToken("testtoken")
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
      DiographStore.setAuthToken("testtoken")
      let obj = {
        "name": "New place",
        "diory-type": "place"
      }
      let promise1 = DiographStore.createDiory(obj).then((createdDiory) => {
        diory = createdDiory
      })
      // Adds existing content to the JSONApiDatastore
      let promise2 = DiographStore.getAllDiories()
      Promise.all([promise1, promise2]).then(() => {
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
        expect(diories.every(diory => { return diory.type === "place" })).toBe(true);
        done();
      }, (e) => { ErrorHandler.logAndFailTest(e); done();})
    })
  })

});
