import { Diory } from "../../app/models/diory"

describe("Diory spec", () => {

  it("can be created", () => {
    let diory = new Diory({"name": "New diory"})
    expect(diory.name).toEqual("New diory")
  })

})
