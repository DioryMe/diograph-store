
// create diory with geo stuff
// => pelkkä diograph-store? (ei api:a, koska toimii niin geneerisesti? vai just toisinpäin?)
// update => not yet needed


import { DiographStore } from "../../app/diograph-store"
import { Diory } from "../../app/models/diory"

describe("DiographStore with geo attribute", () => {

  beforeEach(() => {
    DiographStore.setAuthToken("test-token")
  })

  it("returns Diory when success", (done) => {
    let obj = {
      "name": "Geo diory",
      "diory-type": "place",
      "geo": {
        "type": "GeoCircle",
        "latitude": "23.989414",
        "longitude": "61.470926",
        "geoRadius": "50"
      }
    }
    DiographStore.createDiory(obj).then(diory => {
      expect(diory).toEqual(jasmine.any(Diory));
      expect(diory.name).toBe(obj.name);
      expect(diory["diory-type"]).toBe(obj["diory-type"]);
      expect(diory["geo"]["type"]).toBe(obj["geo"]["type"]);
      expect(diory["geo"]["latitude"]).toBe(obj["geo"]["latitude"]);
      expect(diory["geo"]["longitude"]).toBe(obj["geo"]["longitude"]);
      expect(diory["geo"]["geoRadius"]).toBe(obj["geo"]["geoRadius"]);
      done();
    });
  });

});
