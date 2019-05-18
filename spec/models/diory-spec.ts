import { Diory } from "../../app/models/diory"
import { placeFixture } from "../../fixtures/place-fixture"
import { JsonApiDataStore } from "jsonapi-datastore"

describe("Diory spec", () => {

  it("can be created from custom object", () => {
    let diory = new Diory({"name": "New diory"})
    expect(diory.name).toEqual("New diory")
  })

  it("doesnt crash when geo attributes not defined", () => {
    let diory = new Diory({ "name": "New diory"})
    expect(diory.name).toEqual("New diory")
    expect(diory.geo.latitude).toEqual(undefined)
  })

  describe("from fixture", () => {
    let diory, datastore, placeFixtureDatastore

    beforeEach(() => {
      datastore = new JsonApiDataStore();
      datastore.sync(placeFixture)
      placeFixtureDatastore = datastore.find("diories", placeFixture.data.id)
      diory = new Diory(placeFixtureDatastore)
    })

    it("can be created from fixture", () => {
      expect(diory.name).toEqual("Mämmisuo")
      expect(diory.connectedDiories.length).toEqual(2)
      expect(diory.connectedDiories[0].id).toEqual("6")
      expect(diory.connectedDiories[0].name).toEqual("Mämmisuo - 30.9.2017 - 14:11")
      expect(diory.connectedDiories[0].type).toEqual("check-in")
    })

    it("has geo attributes", () => {
      expect(diory.geo.latitude).toEqual("23.989414")
      expect(diory.geo.longitude).toEqual("61.470926")
    })

    it("has undefined if value is null", () => {
      expect(diory.date).toEqual(undefined)
    })
  })
})
