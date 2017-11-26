
export class Connection {

  public id: string;
  public fromDioryId: string;
  public toDioryId: string;

  constructor(data) {
    if (data === undefined) { data = {} };
    this.id = data["id"];
    this.fromDioryId = data["from-diory-id"];
    this.toDioryId = data["to-diory-id"];
  }

}
