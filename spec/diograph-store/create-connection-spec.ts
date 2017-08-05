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
      fromDiory: diory1,
      toDiory: diory2
    }
    DiographStore.createConnection(obj).then(connection => {
      expect(connection).toEqual(jasmine.any(Connection));
      expect(connection.fromDioryId + '').toBe(obj.fromDiory.id);
      expect(connection.toDioryId + '').toBe(obj.toDiory.id);
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
      expect(err).toBe("From-diory or to-diory missing from object given to DiographStore.createConnection()");
      done();
    }
  })

});
