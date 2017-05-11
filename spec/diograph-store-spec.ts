import { DiographStore } from "../app/diograph-store"
import { Diory } from "../app/models/diory"

describe("Diory store", () => {

  beforeEach(() => {
    DiographStore.setAuthToken("test-token")
  })

  it("returns Diory when success", (done) => {
    DiographStore.get("5691").then(diory => {
      expect(diory).toEqual(jasmine.any(Diory));
      expect(diory.id).toBe("5691");
      done();
    });
  });

  it("returns 404 - Not found when error", (done) => {
    DiographStore.get("invalid id").catch(err => {
      expect(err.errors[0].title).toBe("Diory not found");
      done();
    });
  });

});