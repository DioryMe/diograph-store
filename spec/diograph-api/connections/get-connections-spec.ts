import { DiographApi } from "../../../app/lib/diograph-api"
import * as ErrorHandler from "../../../app/lib/error-handler"

describe("Diograph API .get('connections')", () => {

  beforeEach(() => {
    DiographApi.authToken = "df548369-d0a2-4ca5-b28a-dd4fb14c1f08"
  })

  it("returns a connection", (done) => {
    DiographApi.get(["1", "2"], "connections").then(res => {
      expect(res.data.type).toEqual("connections");
      expect(res.data.id).toEqual("1");
      done();
    }, (e) => { ErrorHandler.logAndFailTest(e); done();})
  })

})
