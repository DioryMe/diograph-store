import { DiographApi } from "../../../app/lib/diograph-api"
import { DiographStore } from "../../../app/diograph-store"
import { Diory } from "../../../app/models/diory"
import { Connection } from "../../../app/models/connection"

// Promise.all() requires this to work
declare var Promise: any;

describe("DiographStore .deleteDiory()", () => {
  let diory

  beforeEach((done) => {
    DiographApi.authToken = "df548369-d0a2-4ca5-b28a-dd4fb14c1f08"
    let dioryObj = { name: "Created diory" }
    DiographStore.createDiory(dioryObj).then((createdDiory) => {
      diory = createdDiory
      done()
    })
  })

  it("returns Diory when success", (done) => {
    DiographStore.deleteDiory(diory).then(deletedDiory => {
      expect(deletedDiory).toBe(null);
    });
  });

  it("throws an error if first parameter is something else than an object", (done) => {
    try {
      DiographStore.deleteDiory("this should be an {}").then(() => {
        done.fail("No error was raised");
      })
    }
    catch(err) {
      expect(err).toBe("Data given for DiographStore.deleteDiory() wasn't an object");
      done();
    }
  })

});
