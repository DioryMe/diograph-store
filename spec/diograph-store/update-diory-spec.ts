import { DiographApi } from "../../app/lib/diograph-api"
import { DiographStore } from "../../app/diograph-store"
import { Diory } from "../../app/models/diory"

describe("DiographStore .updateDiory()", () => {

  beforeEach(() => {
    DiographStore.setAuthToken("df548369-d0a2-4ca5-b28a-dd4fb14c1f08")
  })

  it("returns updated diory when success", (done) => {
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
      }
    });
  });

  it("throws an error if id is not given", (done) => {
    try {
      DiographStore.updateDiory(undefined, undefined).then(() => {
        done.fail("No error was raised");
      })
    }
    catch(err) {
      expect(err).toBe("Invalid diory id given for DiographStore.updateDiory()");
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
