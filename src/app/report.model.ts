export class Report {
    id?: string;
    witnessInfo: string;
    monsterInfo: string;
    status: boolean;
    location: string;
    extra: string;
    date: Date;
  
    constructor(
      witnessInfo: string,
      monsterInfo: string,
      location: string,
      extra: string
    ) {
      // Assign the provided values
      this.witnessInfo = witnessInfo;
      this.monsterInfo = monsterInfo;
      this.location = location;
      this.extra = extra;
      this.status = false;
      // Assign the ID based on the counter approach by calling generateUniqueId
      // this.id = this.generateRandomKey(9);
      this.date = new Date();
    }
}

  