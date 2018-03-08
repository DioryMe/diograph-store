import { Diory } from "../../app/models/diory"
import { DiographStore } from "../../app/diograph-store"

describe("DiographStore .createDioryFromImageFile()", () => {

  it("returns Diory object when success", (done) => {
    DiographStore.createDioryFromImageFile().then(dioryObject => {
      expect(dioryObject).toEqual(jasmine.any(Diory));
      done();
    });
  });

});
