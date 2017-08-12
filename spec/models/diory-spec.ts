import { Diory } from "../../app/models/diory"
import { placeFixture } from "../../fixtures/place-fixture"
import { JsonApiDataStore } from "jsonapi-datastore"

describe("Diory spec", () => {

  it("can be created from custom object", () => {
    let diory = new Diory({"name": "New diory"})
    expect(diory.name).toEqual("New diory")
  })

  it("can be created from fixture", () => {
    let datastore = new JsonApiDataStore();
    datastore.sync(placeFixture)
    let placeFixtureDatastore = datastore.find("diories", placeFixture.data.id)
    let diory = new Diory(placeFixtureDatastore)
    expect(diory.name).toEqual("Uusi paikka")
    expect(diory.connectedDiories.length).toEqual(1)
    expect(diory.connectedDiories[0].id).toEqual("6284")
    expect(diory.connectedDiories[0].name).toEqual("Uusi paikka - 6.8.2017 - 19:45")
    expect(diory.connectedDiories[0].type).toEqual("check-in")
  })

})
