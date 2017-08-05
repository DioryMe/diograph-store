import { DiographStore } from "../../app/diograph-store"
import { Diory } from "../../app/models/diory"

describe("DiographStore .createDiory()", () => {

  beforeEach(() => {
    DiographStore.setAuthToken("test-token")
  })

  it("returns Diory when success", (done) => {
    let obj = {
      name: "Created diory"
    }
    DiographStore.createDiory(obj).then(diory => {
      expect(diory).toEqual(jasmine.any(Diory));
      expect(diory.name).toBe(obj.name);
      done();
    });
  });

  it("throws an error if object is not given", (done) => {
    try {
      DiographStore.createDiory(undefined).then(() => {
        done.fail("No error was raised");
      })
    }
    catch(err) {
      expect(err).toBe("No object was given for DiographStore.createDiory()");
      done();
    }
  })

});