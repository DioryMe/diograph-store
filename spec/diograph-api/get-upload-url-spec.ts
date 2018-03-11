import { DiographApi } from "../../app/lib/diograph-api"
import * as ErrorHandler from "../../app/lib/error-handler"

describe("Diograph API .getUploadUrl()", () => {

  beforeEach(() => {
    DiographApi.authToken = "df548369-d0a2-4ca5-b28a-dd4fb14c1f08"
  })

  it("returns an url", (done) => {
    DiographApi.getUploadUrls().then(urls => {
      expect(urls["upload-url"]).toEqual(jasmine.any(String));
      expect(urls["upload-url"]).toMatch(/^http(s)?:\/\//);
      expect(urls["public-url"]).toEqual(jasmine.any(String));
      expect(urls["public-url"]).toMatch(/^http(s)?:\/\//);
      done();
    }, (e) => { ErrorHandler.logAndFailTest(e); done();})
  })

})
