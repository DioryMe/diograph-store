import { DiographApi } from "../../../app/lib/diograph-api"
import { DiographStore } from "../../../app/diograph-store"
import { Diory } from "../../../app/models/diory"

describe("DiographStore .updateDiory()", () => {

  beforeEach(() => {
    DiographStore.setAuthToken("testtoken")
  })

  it("updates diory with object", (done) => {
    let obj = {
      name: "Created diory"
    }
    DiographStore.createDiory(obj).then(diory => {
      DiographStore.updateDiory(diory.id, {name: "Updated diory"}).then(updatedDiory => {
        expect(updatedDiory).toEqual(jasmine.any(Diory));
        expect(updatedDiory.name).toEqual("Updated diory")
        DiographApi.delete(diory.id).then(res => {
          done();
        })
      })
    });
  });

  it("updates diory with Diory model", (done) => {
    let obj = {name: "Created diory", type: "place"}
    DiographStore.createDiory(obj).then(diory => {
      let id = diory.id.toString()
      diory.name = "Updated diory"
      DiographStore.updateDiory(id, diory).then(updatedDiory => {
        expect(updatedDiory).toEqual(jasmine.any(Diory));
        expect(updatedDiory.name).toEqual("Updated diory")
        DiographApi.delete(id).then(res => {
          done();
        })
      })
    });
  });

  it("throws an error if id is not given", (done) => {
    try {
      DiographStore.updateDiory(undefined, {name: "New name"}).then(() => {
        done.fail("No error was raised");
      })
    }
    catch(err) {
      expect(err).toBe("No id was given for DiographStore.updateDiory()");
      done();
    }
  })

  it("throws an error if object is not given", (done) => {
    try {
      DiographStore.updateDiory("123", undefined).then(() => {
        done.fail("No error was raised");
      })
    }
    catch(err) {
      expect(err).toBe("Data given for DiographStore.updateDiory() wasn't an object");
      done();
    }
  })

});
