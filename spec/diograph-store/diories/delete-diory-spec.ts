import { DiographApi } from "../../../app/lib/diograph-api"
import { DiographStore } from "../../../app/diograph-store"
import { Diory } from "../../../app/models/diory"

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
    DiographStore.deleteDiory(diory.id).then(deletedDiory => {
      expect(deletedDiory).toBe(null);
      done()
    });
  });

  it("removes deleted diory from jsonapi-datastore => getAllDiories returns correct value", (done) => {
    DiographStore.getAllDiories().then(initialAllDiories => {
      let initialAllDioriesCount = initialAllDiories.length
      DiographStore.deleteDiory(diory.id).then(res => {
        DiographStore.getAllDiories().then(finalAllDiories => {
          expect(finalAllDiories.length).toEqual(initialAllDioriesCount - 1)
          done()
        })
      });
    });
  });

});
