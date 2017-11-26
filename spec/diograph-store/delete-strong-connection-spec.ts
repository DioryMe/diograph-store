import { DiographApi } from "../../app/lib/diograph-api"
import { DiographStore } from "../../app/diograph-store"
import { Diory } from "../../app/models/diory"
import { Connection } from "../../app/models/connection"

// Promise.all() requires this to work
declare var Promise: any;

describe("DiographStore .deleteStrongConnection()", () => {
  let fromDiory, toDiory, connection

  beforeEach((done) => {
    DiographApi.authToken = "df548369-d0a2-4ca5-b28a-dd4fb14c1f08"
    let fromDioryObj = { name: "FromDiory" }
    let toDioryObj = { name: "ToDiory" }
    DiographStore.createDiory(fromDioryObj).then((diory) => {
      fromDiory = diory
      DiographStore.createAndConnectDioryStrongly(toDioryObj, diory.id).then((connectionObject) => {
        toDiory = connectionObject.toDiory
        connection = connectionObject.connection
        done()
      })
    })
  })

  it("returns Diory when success", (done) => {
    expect(fromDiory.connectedDiories.length).toEqual(1)
    expect(toDiory.connectedDiories.length).toEqual(1)

    DiographStore.deleteStrongConnection(fromDiory.id, toDiory.id).then(deleteObject => {
      expect(deleteObject.fromDiory).toEqual(jasmine.any(Diory));
      expect(deleteObject.toDiory).toEqual(jasmine.any(Diory));
      expect(deleteObject.connection).toEqual(null);
      expect(deleteObject.reversedConnection).toEqual(null);

      expect(deleteObject.fromDiory.connectedDiories.length).toEqual(0)
      expect(deleteObject.toDiory.connectedDiories.length).toEqual(0)

      let fromDioryPromise = DiographStore.deleteDiory(fromDiory.id)
      let toDioryPromise = DiographStore.deleteDiory(toDiory.id)

      Promise.all([fromDioryPromise, toDioryPromise]).then(() => {
        done();
      })
    });
  });

  it("throws an error if first parameter is something else than an object", (done) => {
    try {
      DiographStore.deleteStrongConnection("this should be an {}", {}).then(() => {
        done.fail("No error was raised");
      })
    }
    catch(err) {
      expect(err).toBe("Data given for DiographStore.deleteStrongConnection() wasn't an object");
      done();
    }
  })

  it("throws an error if less than two parameters are given", (done) => {
    try {
      DiographStore.deleteStrongConnection({}, undefined).then(() => {
        done.fail("No error was raised");
      })
    }
    catch(err) {
      expect(err).toBe("DiographStore.deleteStrongConnection() requires two parameters");
      done();
    }
  })

});
