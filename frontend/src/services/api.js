import { get, post, patch } from "./request";

class api {
  constructor(host) {
    this.host = `${host}/api`;
    this.token = null;
  }

  async login(body) {
    const response = await post({
      url: `${this.host}/agent/login`,
      body,
    });
    return response.data;
  }

  async register(body) {
    const response = await post({
      url: `${this.host}/agent`,
      body,
    });
    return response.data;
  }

  async getAllProperties(agentId) {
    const response = await get({
      url: `${this.host}/agent/${agentId}/estates`,
    });
    return response.data;
  }

  async getProperty(agentId, estateId) {
    const response = await get({
      url: `${this.host}/agent/${agentId}/estates/${estateId}`,
    });
    return response.data;
  }

  async addProperty(agentId, body) {
    const response = await post({
      url: `${this.host}/agent/${agentId}/estates`,
      body: {
        ...body,
        open: true,
      },
    });
    return response.data;
  }

  async editProperty(agentId, estateId, updatedState) {
    const response = await patch({
      url: `${this.host}/agent/${agentId}/estates/${estateId}`,
      body: updatedState,
    });
    return response.data;
  }

  async closeProperty(agentId, estateId) {
    const response = await this.editProperty(agentId, estateId, {
      open: false,
    });
    return response.data;
  }

  async openProperty(agentId, estateId) {
    const response = await this.editProperty(agentId, estateId, { open: true });
    return response.data;
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
