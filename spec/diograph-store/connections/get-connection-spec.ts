import { DiographStore } from "../../../app/diograph-store"
import { Diory } from "../../../app/models/diory"
import { Connection } from "../../../app/models/connection"

describe("DiographStore .get('connections')", () => {

  beforeEach(() => {
    DiographStore.setAuthToken("testtoken")
  })

  it("returns Connection when success", (done) => {
    DiographStore.getConnection("5", "6").then(connection => {
      expect(connection).toEqual(jasmine.any(Connection));
      expect(connection.id).toBe("5");
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
