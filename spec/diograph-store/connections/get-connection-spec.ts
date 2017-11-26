import { DiographStore } from "../../../app/diograph-store"
import { Diory } from "../../../app/models/diory"
import { Connection } from "../../../app/models/connection"

describe("DiographStore .get('connections')", () => {

  beforeEach(() => {
    DiographStore.setAuthToken("df548369-d0a2-4ca5-b28a-dd4fb14c1f08")
  })

  it("returns Connection when success", (done) => {
    DiographStore.getConnection("1", "2").then(connection => {
      expect(connection).toEqual(jasmine.any(Connection));
      expect(connection.id).toBe("1");
      done();
    });
  });

});
