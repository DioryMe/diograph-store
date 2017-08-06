import { DiographStore } from "../../app/diograph-store"
import { Diory } from "../../app/models/diory"

describe("DiographStore .get()", () => {

  beforeEach(() => {
    DiographStore.setAuthToken("test-token")
  })

  it("returns Diory when success", (done) => {
    DiographStore.getDiory("5691").then(diory => {
      expect(diory).toEqual(jasmine.any(Diory));
      expect(diory.id).toBe("5691");
      done();
    });
  });

  it("returns 404 - Not found when error", (done) => {
    DiographStore.getDiory("invalid id").catch(err => {
      expect(err.response.body.errors[0].title).toBe("Diory not found");
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