export class GeoRules {
  constructor({ allowedCountries, blockedCountries }) {
    this.allowedCountries = allowedCountries;
    this.blockedCountries = blockedCountries;
  }

  static from(raw) {
    return new GeoRules(raw);
  }
}
