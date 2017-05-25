import { DioryApi } from "../app/lib/diory-api"

describe("Diory api", () => {

  beforeEach(() => {
    DioryApi.authToken = "test-token"
  })

  it("returns diories", (done) => {
    DioryApi.get("5691", "diories").then(res => {
      expect(res.data.type).toEqual("diories");
      expect(res.data.id).toEqual("5691");
      done();
    })
  })

  it("returns connections", (done) => {
    DioryApi.get("9982", "connections").then(res => {
      expect(res.data.type).toEqual("connections");
      expect(res.data.id).toEqual("9982");
      done();
    })
  })

  it("returns error", (done) => {
    DioryApi.get("invalid id", "connections").catch(err => {
      expect(err.errors[0].status).toBe("400");
      done();
    })
  })

  it("returns another error", (done) => {
    DioryApi.get("99999999", "connections").catch(err => {
      expect(err.errors[0].status).toBe("404");
      done();
    })
  })

  it("throws 'Authentication token not given' if no authToken given", done => {
    DioryApi.authToken = undefined
    try {
      DioryApi.get("5690", "diories")
    }
    catch(err) {
      expect(err).toBe("Authentication token not given.")
      done()
    }
  })

})