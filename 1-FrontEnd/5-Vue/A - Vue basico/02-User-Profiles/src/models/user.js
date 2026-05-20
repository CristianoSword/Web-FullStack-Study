// Classe Modelo de Usuário para padronizar dados vindos da API
export class UserProfile {
  constructor(apiData) {
    this.id = apiData.login.uuid;
    this.name = `${apiData.name.first} ${apiData.name.last}`;
    this.email = apiData.email;
    this.picture = apiData.picture.large;
    this.location = `${apiData.location.city}, ${apiData.location.country}`;
    this.phone = apiData.phone;
    this.nat = apiData.nat;
  }
}
