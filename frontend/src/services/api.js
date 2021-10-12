import { get, post, patch } from "./request";

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
      url: `${this.host}/agent`,
      body,
    });
  }

  async getAllProperties(agentId) {
    return get({
      url: `${this.host}/agent/${agentId}/estates`,
    });
  }

  async getProperty(agentId, estateId) {
    return get({
      url: `${this.host}/agent/${agentId}/estates/${estateId}`,
    });
  }

  async addProperty(agentId, body) {
    return post({
      url: `${this.host}/agent/${agentId}/estates`,
      body: {
        agent_id: agentId,
        ...body,
      },
    });
  }

  async editProperty(agentId, estateId, updatedState) {
    return patch({
      url: `${this.host}/agent/${agentId}/estates/${estateId}`,
      body: updatedState,
    });
  }

  async closeProperty(agentId, estateId) {
    return this.editProperty(agentId, estateId, { open: false });
  }

  async openProperty(agentId, estateId) {
    return this.editProperty(agentId, estateId, { open: true });
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
