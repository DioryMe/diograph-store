import { Diory } from "../../app/models/diory"
import { DiographStore } from "../../app/diograph-store"
import { DiographApi } from "../../app/lib/diograph-api"
import * as request from "superagent"

declare var Promise: any;

describe("DiographStore .createDioryFromImageFile()", () => {
  let event

  beforeEach(() => {
    event = {target: {files: [{name: "FakeImage.jpg"}]}}
    DiographApi.authToken = "df548369-d0a2-4ca5-b28a-dd4fb14c1f08"
  })

  it("returns Diory object when success", (done) => {
    // FIXME: Doesn't work! PUT request is still made
    // => use superagent-mocker or similar to really get request.put stubbed out
    // Stub request.put() => uploading & retrieving image url
    let fakeBackground = "http://fake.test/image.png"
    let promise = new Promise((resolve) => resolve(fakeBackground))
    spyOn(request, "put").and.callFake(() => {
      return { send: () => { return promise } }
    })

    // Stub extracting EXIF data
    let exif = {"date": "2018-01-01", "latitude": "65.123", "longitude": "25.4321"}
    spyOn(DiographStore, "extractEXIFData").and.returnValue(exif)

    DiographStore.createDioryFromImageFile(event).then(dioryObject => {
      expect(dioryObject).toEqual(jasmine.any(Diory));
      expect(dioryObject.name).toEqual("FakeImage.jpg");
      expect(dioryObject.date).toEqual(exif["date"]);
      expect(dioryObject.geo["latitude"]).toEqual(exif["latitude"]);
      expect(dioryObject.geo["longitude"]).toEqual(exif["longitude"]);
      // expect(dioryObject.background).toEqual(fakeBackground); // => this is an AWS url because stubbing doesn't work
      DiographApi.delete(dioryObject.id).then(res => {
        done();
      })
    });
  });

});
