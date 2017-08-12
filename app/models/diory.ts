
export class Diory {

  public id: string;
  public name: string;
  public url: string;
  public type: string;
  public background: string;
  public date: string;
  public connectedDiories = [];

  constructor(data) {
    if (data === undefined) { data = {} };
    this.id = data.id;
    this.name = data.name;
    this.url = data.address;
    this.type = data["diory-type"];
    this.background = data.background;
    this.date = data.date;
    if (data["connected-diories"]) {
      this.addConnectedDiories(data["connected-diories"])
    }
  }

  private addConnectedDiories(connectedDioriesData) {
    connectedDioriesData.forEach((connectedDioryData) => {
      let connectedDiory = new Diory(connectedDioryData)
      this.connectedDiories.push(connectedDiory)
    })
  }

}
