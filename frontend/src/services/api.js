import { ROLE_MANAGER } from "../const";
import { get, post, patch, remove } from "./request";

class api {
  constructor(host, mapsAPIKey) {
    this.host = `${host}/api`;
    this.mapsAPIKey = mapsAPIKey;
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
    let response;
    if (body.type === ROLE_MANAGER) {
      // Creates a property manager
      response = await post({
        url: `${this.host}/agent`,
        body,
      });
    } else {
      response = await post({
        // Creates a property inspector
        url: `${this.host}/inspector`,
        body,
      });
    }
    return response.data;
  }

  async getAllProperties(param) {
    const response = await get({
      url: `${this.host}/estates/all?open=true&${param}`,
    });
    return response.data;
  }

  async getAllAgentProperties(agentId) {
    const response = await get({
      url: `${this.host}/agent/${agentId}/estates`,
    });
    return response.data;
  }

  async getAllInspectorProperties(inspectorId, param) {
    const response = await get({
      url: `${this.host}/inspector/${inspectorId}/estates/all?open=true&${param}`,
    });
    return response.data;
  }

  async getProperty(agentId, estateId) {
    const response = await get({
      url: `${this.host}/agent/${agentId}/estates/${estateId}`,
    });
    return response.data;
  }

  async getPropertyPublic(estateId) {
    const response = await get({
      url: `${this.host}/estates/${estateId}`,
    });
    return response.data;
  }

  async getInspectorProperty(inspectorId, estateId) {
    const response = await get({
      url: `${this.host}/inspector/${inspectorId}/estates/${estateId}`,
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

  async getHistory(inspectorId) {
    const response = await get({
      url: `${this.host}/inspector/${inspectorId}/history`,
    });
    return response.data;
  }

  async sendEmail(agentId, body) {
    const response = await post({
      url: `${this.host}/agent/${agentId}/enquiries`,
      body,
    });
    return response.data;
  }

  async getInspectionTimes(agentId, estateId) {
    const response = await get({
      url: `${this.host}/agent/${agentId}/estates/${estateId}/inspections`,
    });
    return response.data;
  }

  async addInspectionTimes(agentId, estateId, body) {
    const response = await post({
      url: `${this.host}/agent/${agentId}/estates/${estateId}/inspections`,
      body,
    });
    return response.data;
  }

  async removeInspectionTimes(agentId, estateId, inspectionId) {
    const response = await remove({
      url: `${this.host}/agent/${agentId}/estates/${estateId}/inspections/${inspectionId}`,
    });
    return response.data;
  }

  async getUser(agentId) {
    const response = await get({
      url: `${this.host}/agent/${agentId}`,
    });
    return response.data;
  }

  async updateUserProfile(inspectorId, body) {
    const response = await patch({
      url: `${this.host}/inspector/${inspectorId}/profile`,
      body,
    });
    return response.data;
  }

  setToken(token) {
    this.token = token;
  }

  getMapsKey() {
    return this.mapsAPIKey;
  }
}

const API = new api(
  process.env.REACT_APP_API_URL,
  process.env.REACT_APP_MAPS_API_KEY
);

export default API;
