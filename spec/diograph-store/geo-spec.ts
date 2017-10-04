import { DiographApi } from "../../app/lib/diograph-api"
import { DiographStore } from "../../app/diograph-store"
import { Diory } from "../../app/models/diory"

describe("DiographStore with geo attribute", () => {

  beforeEach(() => {
    DiographStore.setAuthToken("df548369-d0a2-4ca5-b28a-dd4fb14c1f08")
  })

  it("Diory with geo attribute can be created", (done) => {
    let geo = {
      "type": "GeoCircle",
      "latitude": "23.989414",
      "longitude": "61.470926",
      "geoRadius": "50"
    }
    let obj = {
      "name": "Geo diory",
      "diory-type": "place",
      "geo": geo
    }
    DiographStore.createDiory(obj).then(diory => {
      expect(diory).toEqual(jasmine.any(Diory));
      expect(diory.name).toBe(obj.name);
      expect(diory.type).toBe(obj["diory-type"]);
      expect(diory["geo"]["type"]).toBe(geo["type"]);
      expect(diory["geo"]["latitude"]).toBe(geo["latitude"]);
      expect(diory["geo"]["longitude"]).toBe(geo["longitude"]);
      expect(diory["geo"]["geoRadius"]).toBe(geo["geoRadius"]);
      DiographApi.delete(diory.id).then(res => {
        done();
      })
    });
  });

});
