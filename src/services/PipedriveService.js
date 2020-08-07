const axios = require("axios");

class PipedriveService {
  constructor({ start, limit, status, db }) {
    (this.start = start),
      (this.limit = limit),
      (this.status = status),
      (this.db = db);
  }

  async getDeals(page, limit, status) {
    const { data, additional_data } = await axios.get(
      `${process.env.PIPEDRIVE_API_URL}?status=${status}&start=${page}&limit=${limit}&api_token=${process.env.PIPEDRIVE_TOKEN}`
    );
  }

  async insertNewRevenue({ id, title, value, update_time, status }) {
    let wonDate = new Date(update_time);
    let revenue = {
      pipedriveId: id,
      description: title,
      value,
      status,
      year: wonDate.getFullYear(),
      month: wonDate.getMonth() + 1,
      day: wonDate.getDate(),
    };
  }
}

module.exports = PipedriveService;
