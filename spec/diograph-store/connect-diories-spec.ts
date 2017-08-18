import { DiographApi } from "../../app/lib/diograph-api"
import { DiographStore } from "../../app/diograph-store"
import { Diory } from "../../app/models/diory"
import { Connection } from "../../app/models/connection"

describe("DiographStore .connectDiories()", () => {

  let diory1, diory2

  beforeAll((done) => {
    DiographApi.authToken = "test-token"
    DiographStore.getAllDiories().then(diories => {
      diory1 = diories[0]
      diory2 = diories[1]
      done()
    })
  })

  it("returns ConnectionObject when success", (done) => {
    DiographStore.connectDiories(diory1.id, diory2.id).then(connectionObject => {
      expect(connectionObject.fromDiory).toEqual(jasmine.any(Diory));
      expect(connectionObject.toDiory).toEqual(jasmine.any(Diory));
      expect(connectionObject.connection).toEqual(jasmine.any(Connection));
      expect(connectionObject.connection.fromDioryId + '').toBe(diory1.id);
      expect(connectionObject.connection.toDioryId + '').toBe(diory2.id);
      done();
    });
  });

  it("throws an error if less than two parameters are given", (done) => {
    try {
      DiographStore.connectDiories(undefined, undefined).then(() => {
        done.fail("No error was raised");
      })
    }
    catch(err) {
      expect(err).toBe("DiographStore.connectDiories() requires two parameters");
      done();
    }
  })

});
