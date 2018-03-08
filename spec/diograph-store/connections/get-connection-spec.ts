import { DiographStore } from "../../../app/diograph-store"
import { Diory } from "../../../app/models/diory"
import { Connection } from "../../../app/models/connection"

describe("DiographStore .get('connections')", () => {

  beforeEach(() => {
    DiographStore.setAuthToken("df548369-d0a2-4ca5-b28a-dd4fb14c1f08")
  })

  it("returns Connection when success", (done) => {
    DiographStore.getConnection("1", "651").then(connection => {
      // FIXME: Depends on having certain kind of data in database
      expect(connection).toEqual(jasmine.any(Connection));
      expect(connection.id).toBe("877");
      done();
    });
  });

  it("returns null when not found", (done) => {
    DiographStore.getConnection("123", "345").then(connection => {
      expect(connection).toBe(null);
      done();
    });
  });

  it("throws an error if no two ids is given", (done) => {
    try {
      DiographStore.getConnection("1", undefined).then(() => {
        done.fail("No error was raised");
      })
    }
    catch(err) {
      expect(err).toBe("Required two ids not given to DiographStore.getConnection()");
      done();
    }
  })

});
