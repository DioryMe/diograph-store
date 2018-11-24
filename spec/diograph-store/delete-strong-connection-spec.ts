import { DiographApi } from "../../app/lib/diograph-api"
import { DiographStore } from "../../app/diograph-store"
import { Diory } from "../../app/models/diory"
import { Connection } from "../../app/models/connection"

// Promise.all() requires this to work
declare var Promise: any;

describe("DiographStore .deleteStrongConnection()", () => {
  let fromDiory, toDiory, connection

  beforeEach(done => {
    DiographApi.authToken = "testtoken"
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

  afterEach(done => {
    // Clean up the created diories
    let fromDioryPromise = DiographStore.deleteDiory(fromDiory.id)
    let toDioryPromise = DiographStore.deleteDiory(toDiory.id)
    Promise.all([fromDioryPromise, toDioryPromise]).then(() => {
      done();
    })
  })

  it("returns null when success", (done) => {
    DiographStore.deleteStrongConnection(fromDiory.id, toDiory.id).then(response => {
      expect(response).toEqual(null)
      done()
    });
  });

  it("throws an error if less than two parameters are given", (done) => {
    try {
      DiographStore.deleteStrongConnection(123, undefined).then(() => {
        done.fail("No error was raised");
      })
    }
    catch(err) {
      expect(err).toBe("Required two ids not given to DiographStore.deleteStrongConnection()");
      done();
    }
  })

});
