
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

    // ADDRESS
    let url = data.address
    // Convert UUID in address field to /dataobjects url
    if (data.address && data.address.indexOf('http') != 0) {
      url = process.env.DIOGRAPH_SERVER_HOST + '/dataobjects/' + data.address
    }
    // Convert Dropbox public url to /dataobjects url
    if (data.address && data.address.indexOf('https://dl.dropboxusercontent.com/u/11140007/media/') == 0) {
      url = data.address.replace('https://dl.dropboxusercontent.com/u/11140007/media/', 'http://localhost/static/')
    }

    // BACKGROUND
    let background = data.background
    // Convert UUID in background field to /dataobjects url
    if (data.background && data.background.indexOf('http') != 0) {
      background = process.env.DIOGRAPH_SERVER_HOST + '/dataobjects/' + data.background
    }
    // Convert Dropbox public url to /dataobjects url
    if (data.background && data.background.indexOf('https://dl.dropboxusercontent.com/u/11140007/media/') == 0) {
      background = data.background.replace('https://dl.dropboxusercontent.com/u/11140007/media/', 'http://localhost/static/')
    }

    this.id = data.id;
    this.name = data.name;
    this.url = url;
    this.type = data["diory-type"];
    this.background = background;
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
