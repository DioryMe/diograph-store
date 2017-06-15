import { DiographApi } from "../app/lib/diograph-api"

describe("Diograph API", () => {

  beforeEach(() => {
    DiographApi.authToken = "test-token"
  })

  describe(".get()", () => {

    it("returns diories", (done) => {
      DiographApi.get("5691", "diories").then(res => {
        expect(res.data.type).toEqual("diories");
        expect(res.data.id).toEqual("5691");
        done();
      })
    })

    it("returns connections", (done) => {
      DiographApi.get("9982", "connections").then(res => {
        expect(res.data.type).toEqual("connections");
        expect(res.data.id).toEqual("9982");
        done();
      })
    })

    it("returns error", (done) => {
      DiographApi.get("invalid id", "connections").catch(err => {
        expect(err.errors[0].status).toBe("400");
        done();
      })
    })

    it("returns another error", (done) => {
      DiographApi.get("99999999", "connections").catch(err => {
        expect(err.errors[0].status).toBe("404");
        done();
      })
    })

    it("returns one error more", (done) => {
      try {
        DiographApi.get("1234", "invalid type")
      }
      catch(err) {
        expect(err).toBe("Invalid type for DiographApi.get()");
        done();
      }
    })

  })

  describe(".getAll()", () => {

  })

  describe("Authentication token", () => {

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

})