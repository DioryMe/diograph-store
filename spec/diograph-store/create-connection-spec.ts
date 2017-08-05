import { DiographApi } from "../../app/lib/diograph-api"
import { DiographStore } from "../../app/diograph-store"
import { Diory } from "../../app/models/diory"
import { Connection } from "../../app/models/connection"

describe("DiographStore .createConnection()", () => {

  let diory1, diory2

  beforeAll((done) => {
    DiographApi.authToken = "test-token"
    DiographStore.getAllDiories().then(diories => {
      diory1 = diories[0]
      diory2 = diories[1]
      done()
    })
  })

  it("returns Connection when success", (done) => {
    let obj = {
      "from-diory": diory1,
      "to-diory": diory2
    }
    DiographStore.createConnection(obj).then(connection => {
      expect(connection).toEqual(jasmine.any(Connection));
      expect(connection["from-diory"].id).toBe(obj["from-diory"].id);
      expect(connection["to-diory"].id).toBe(obj["to-diory"].id);
      done();
    });
  });

  it("throws an error if object is not given", (done) => {
    try {
      DiographStore.createConnection(undefined).then(() => {
        done.fail("No error was raised");
      })
    }
    catch(err) {
      expect(err).toBe("No object was given for DiographStore.createConnection()");
      done();
    }
  })

  it("throws an error if object doesn't have both from-diory-id and to-diory-id", (done) => {
    try {
      DiographStore.createConnection({"from-diory-id": 123}).then(() => {
        done.fail("No error was raised");
      })
    }
    catch(err) {
      expect(err).toBe("From-diory-id or to-diory-id missing from object given to DiographStore.createConnection()");
      done();
    }
  })

});