import { DiographApi } from "../../../app/lib/diograph-api"
import { DiographStore } from "../../../app/diograph-store"
import * as ErrorHandler from "../../../app/lib/error-handler"

describe("Diograph API .delete('connection')", () => {
  let connectionId

  beforeAll((done) => {
    DiographApi.authToken = "df548369-d0a2-4ca5-b28a-dd4fb14c1f08"
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

  fit("delete new connection", (done) => {
    DiographApi.delete(connectionId, "connections").then(deleteRes => {
      expect(deleteRes.status).toEqual(204)
      done();
    }, (e) => { ErrorHandler.logAndFailTest(e); done();})
  })

})
