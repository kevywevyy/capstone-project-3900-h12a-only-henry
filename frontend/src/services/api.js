import { post } from "./request";

class api {
  constructor(host) {
    this.host = `${host}/api`;
    this.token = null;
  }

  async login(body) {
    return post({
      url: `${this.host}/agent/login`,
      body,
    });
  }

  async register(body) {
    return post({
      url: `${this.host}/agent/register`,
      body,
    });
  }

  async getProperties(agentId) {
    return post({
      url: `${this.host}/agent/${agentId}/estates`,
    });
  }

  async addProperty(agentId, body) {
    return post({
      url: `${this.host}/agent/${agentId}/estates`,
      body,
    });
  }

  async sendEmail(agentId, body) {
    return post({
      url: `${this.host}/agent/${agentId}/enquiries`,
      body,
    });
  }

  setToken(token) {
    this.token = token;
  }
}

const API = new api(process.env.REACT_APP_API_URL);

export default API;
