const axios = require("axios");

function getHttpClient() {
  return axios.create({
    baseURL: "https://study.example/api",
    timeout: 3000
  });
}

module.exports = {
  getHttpClient
};
