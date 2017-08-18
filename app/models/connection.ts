
export class Connection {

  public fromDioryId: string;
  public toDioryId: string;

  constructor(data) {
    if (data === undefined) { data = {} };
    this.fromDioryId = data["from-diory-id"];
    this.toDioryId = data["to-diory-id"];
  }

}
