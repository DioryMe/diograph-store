import { DiographStore } from "../../../app/diograph-store"
import { Diory } from "../../../app/models/diory"

describe("DiographStore .get('diories')", () => {

  beforeEach(() => {
    DiographStore.setAuthToken("testtoken")
  })

  it("returns Diory when success", (done) => {
    DiographStore.getDiory("1").then(diory => {
      expect(diory).toEqual(jasmine.any(Diory));
      expect(diory.id).toBe("1");
      done();
    });
  });

  it("returns null when not found", (done) => {
    DiographStore.getDiory("invalid id").then(diory => {
      expect(diory).toBe(null);
      done();
    });
  });

  it("throws an error if id is not given", (done) => {
    try {
      DiographStore.getDiory(undefined).then(() => {
        done.fail("No error was raised");
      })
    }
    catch(err) {
      expect(err).toBe("No id was given for DiographStore.getDiory()");
      done();
    }
  })

});
