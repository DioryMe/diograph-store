import { DiographApi } from "../../../app/lib/diograph-api"
import { DiographStore } from "../../../app/diograph-store"
import * as ErrorHandler from "../../../app/lib/error-handler"

describe("Diograph API .create('connection')", () => {
  let diory1, diory2

  beforeAll((done) => {
    DiographApi.authToken = "df548369-d0a2-4ca5-b28a-dd4fb14c1f08"
    DiographStore.getAllDiories().then(diories => {
      diory1 = diories[0]
      diory2 = diories[1]
      done()
    })
  })

  it("creates new connection", (done) => {
    let data = {"from-diory-id": diory1.id, "to-diory-id": diory2.id}
    DiographApi.create(data, "connections").then(res => {
      expect(res.data.type).toEqual("connections");
      expect(res.data.attributes["from-diory-id"]).toEqual(parseInt(diory1.id));
      expect(res.data.attributes["to-diory-id"]).toEqual(parseInt(diory2.id));
      DiographApi.delete(res.data.id, "connections").then(res => {
        done();
      })
    }, (e) => { ErrorHandler.logAndFailTest(e); done();})
  })

})
