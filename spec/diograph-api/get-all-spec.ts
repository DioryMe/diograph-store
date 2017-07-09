import { DiographApi } from "../../app/lib/diograph-api"

describe("Diograph API", () => {

  beforeEach(() => {
    DiographApi.authToken = "test-token"
  })

  describe(".getAll()", () => {

    it("returns diories", (done) => {
      DiographApi.getAll("diories").then(res => {
        expect(res.data).toEqual(jasmine.any(Array));
        expect(res.data[0].type).toEqual("diories");
        done();
      })
    })

    it("returns one error more", (done) => {
      try {
        DiographApi.getAll("invalid type")
      }
      catch(err) {
        expect(err).toBe("Invalid type for DiographApi.getAll()");
        done();
      }
    })

  })

})
