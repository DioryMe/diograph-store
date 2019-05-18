
export class Diory {

  public id: string;
  public name: string;
  public url: string;
  public type: string;
  public background: string;
  public date: string;
  public geo: any;
  public connectedDiories = [];

  constructor(data, addConnectedDiories=true) {
    // If attribute is null, change it to undefined
    for (var attrname in data) { if (data[attrname] == null) { data[attrname] = undefined } }
    for (var attrname in data.geo) { if (data.geo[attrname] == null) { data.geo[attrname] = undefined } }
    if (data === undefined) { data = {} };
    this.id = data.id;
    this.name = data.name;
    this.url = data.address;
    this.type = data["diory-type"];
    this.background = data.background;
    this.date = data.date;
    this.geo = data.geo || {};
    if (data["connected-diories"] && addConnectedDiories) {
      this.addConnectedDiories(data)
    }
  }

  private addConnectedDiories(dioryData) {
    dioryData["connected-diories"].forEach((connectedDioryData) => {
      if (connectedDioryData.id !== dioryData.id) {
        let connectedDiory = new Diory(connectedDioryData, false)
        this.connectedDiories.push(connectedDiory)
      }
    })
  }

}
