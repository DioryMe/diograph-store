import { DioryApi } from "../app/lib/diory-api"

describe("Diograph API", () => {

  beforeEach(() => {
    DioryApi.authToken = "test-token"
  })

  describe(".get()", () => {

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

    it("returns one error more", (done) => {
      try {
        DioryApi.get("1234", "invalid type")
      }
      catch(err) {
        expect(err).toBe("Invalid type for DioryApi.get()");
        done();
      }
    })

  })

  describe(".getAll()", () => {

  })

  describe("Authentication token", () => {

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

    it("throws 'Authentication token invalid' if something else than string as token", done => {
      DioryApi.authToken = {}
      try {
        DioryApi.get("5690", "diories")
      }
      catch(err) {
        expect(err).toBe("Authentication token is invalid.")
        done()
      }
    })

  })

})