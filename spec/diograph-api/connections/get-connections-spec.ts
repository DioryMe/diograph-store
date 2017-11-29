import { DiographApi } from "../../../app/lib/diograph-api"
import * as ErrorHandler from "../../../app/lib/error-handler"

describe("Diograph API .get('connections')", () => {

  beforeEach(() => {
    DiographApi.authToken = "df548369-d0a2-4ca5-b28a-dd4fb14c1f08"
  })

  fit("returns a connection", (done) => {
    DiographApi.get(["5", "6"], "connections").then(res => {
      console.log(res)
      expect(res.data[0].type).toEqual("connections");
      expect(res.data[0].id).toEqual("5");
      done();
    }, (e) => { ErrorHandler.logAndFailTest(e); done();})
  })

})
