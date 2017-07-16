import { DiographStore } from "../../app/diograph-store"
import { Diory } from "../../app/models/diory"

describe("DiographStore .getAll()", () => {

  beforeEach(() => {
    DiographStore.setAuthToken("test-token")
  })

  it("returns array of Diories when success", (done) => {
    DiographStore.getAll().then(diories => {
      expect(diories).toEqual(jasmine.any(Array));
      expect(diories[0]).toEqual(jasmine.any(Diory));
      done();
    });
  });

  describe("when diory type is given", () => {

  })
});