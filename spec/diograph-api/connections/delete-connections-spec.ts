import { DiographApi } from "../../../app/lib/diograph-api"
import { DiographStore } from "../../../app/diograph-store"
import * as ErrorHandler from "../../../app/lib/error-handler"

describe("Diograph API .delete('connection')", () => {
  let connectionId

  beforeAll((done) => {
    DiographApi.authToken = "testtoken"
    DiographStore.getAllDiories().then(diories => {
      let diory1 = diories[0]
      let diory2 = diories[1]
      let data = {"from-diory-id": diory1.id, "to-diory-id": diory2.id}
      DiographApi.create(data, "connections").then(res => {
        connectionId = res.data.id
        done()
      })
    })
  })

  it("delete new connection", (done) => {
    DiographApi.delete(connectionId, "connections").then(deleteRes => {
      expect(deleteRes).toEqual({})
      done();
    }, (e) => { ErrorHandler.logAndFailTest(e); done();})
  })

})
