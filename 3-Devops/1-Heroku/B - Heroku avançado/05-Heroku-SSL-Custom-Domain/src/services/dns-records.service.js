export class DnsRecordsService {
  constructor({ records }) {
    this.records = records;
  }

  buildSummary() {
    return {
      records: this.records.records,
      note: "Point the public hostname to the Heroku DNS target before ACM can issue a certificate."
    };
  }
}
