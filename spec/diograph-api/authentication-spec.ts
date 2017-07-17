import { DiographApi } from "../../app/lib/diograph-api"

describe("Diograph API authentication token", () => {

  it("throws 'Authentication token not given' if no authToken given", done => {
    DiographApi.authToken = undefined
    try {
      DiographApi.get("5690", "diories")
    }
    catch(err) {
      expect(err).toBe("Authentication token not given.")
      done()
    }
  })

  it("throws 'Authentication token invalid' if something else than string as token", done => {
    DiographApi.authToken = {}
    try {
      DiographApi.get("5690", "diories")
    }
    catch(err) {
      expect(err).toBe("Authentication token is invalid.")
      done()
    }
  })

})
