import { Diory } from "../../app/models/diory"
import { DiographStore } from "../../app/diograph-store"
import { DiographApi } from "../../app/lib/diograph-api"

describe("DiographStore .createDioryFromImageFile()", () => {

  beforeEach((done) => {
    DiographApi.authToken = "df548369-d0a2-4ca5-b28a-dd4fb14c1f08"
  })

  it("returns Diory object when success", (done) => {
    DiographStore.createDioryFromImageFile({}).then(dioryObject => {
      expect(dioryObject).toEqual(jasmine.any(Diory));
      done();
    });
  });

});
