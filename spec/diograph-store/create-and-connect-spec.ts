import { DiographApi } from "../../app/lib/diograph-api"
import { DiographStore } from "../../app/diograph-store"
import { Diory } from "../../app/models/diory"
import { Connection } from "../../app/models/connection"

describe("DiographStore .createDiory()", () => {
  let diory1

  beforeAll((done) => {
    DiographApi.authToken = "test-token"
    DiographStore.getAllDiories().then(diories => {
      diory1 = diories[0]
      done()
    })
  })

  it("returns Diory when success", (done) => {
    let obj = {
      name: "Created diory"
    }
    DiographStore.createAndConnectDiory(obj, diory1.id).then(connectionObject => {
      expect(connectionObject.fromDiory).toEqual(jasmine.any(Diory));
      expect(connectionObject.toDiory).toEqual(jasmine.any(Diory));
      expect(connectionObject.connection).toEqual(jasmine.any(Connection));
      expect(connectionObject.connection.fromDioryId + '').toBe(diory1.id);
      expect(connectionObject.toDiory.name + '').toBe(obj.name);
      done();
    });
  });

});