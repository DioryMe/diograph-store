import { DiographApi } from "../../app/lib/diograph-api"
import { DiographStore } from "../../app/diograph-store"
import { Diory } from "../../app/models/diory"
import { Connection } from "../../app/models/connection"

describe("DiographStore .createAndConnectDioryStrongly()", () => {
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
    DiographStore.createAndConnectDioryStrongly(obj, diory1.id).then(connectionObject => {
      expect(connectionObject.fromDiory).toEqual(jasmine.any(Diory));
      expect(connectionObject.toDiory).toEqual(jasmine.any(Diory));
      expect(connectionObject.connection).toEqual(jasmine.any(Connection));

      expect(connectionObject.connection.fromDioryId + '').toBe(diory1.id);
      expect(connectionObject.connection.toDioryId + '').toBe(connectionObject.toDiory.id);

      expect(connectionObject.toDiory.name + '').toBe(obj.name);

      expect(connectionObject.fromDiory.connectedDiories[0].id).toEqual(connectionObject.toDiory.id)
      // expect(connectionObject.toDiory.connectedDiories[0].id).toEqual(connectionObject.fromDiory.id)
      done();
    });
  });

  it("throws an error if first parameter is something else than an object", (done) => {
    try {
      DiographStore.createAndConnectDioryStrongly("this should be an {}", 123).then(() => {
        done.fail("No error was raised");
      })
    }
    catch(err) {
      expect(err).toBe("Data given for DiographStore.createAndConnectDiory() wasn't an object");
      done();
    }
  })

  it("throws an error if less than two parameters are given", (done) => {
    try {
      DiographStore.createAndConnectDioryStrongly({}, undefined).then(() => {
        done.fail("No error was raised");
      })
    }
    catch(err) {
      expect(err).toBe("DiographStore.createAndConnectDiory() requires two parameters");
      done();
    }
  })

});
