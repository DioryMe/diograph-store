import { Connection } from "../../app/models/connection"

describe("Connection spec", () => {

  it("can be created", () => {
    let connection = new Connection({"from-diory-id": "123", "to-diory-id": "345"})
    expect(connection.fromDioryId).toEqual("123")
    expect(connection.toDioryId).toEqual("345")
  })

})
