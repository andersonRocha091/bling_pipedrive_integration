const axios = require("axios");

class PipedriveService {
  constructor({ start, limit, status, db }) {
    (this.start = start),
      (this.limit = limit),
      (this.status = status),
      (this.db = db);
  }

  getAllPipeDriveWonDeals() {
    let page = this.start;
    let res = this.getDeals(page, this.limit, this.status);
    while (res.hasMoreWonDeals) {
      res = this.getDeals(page, this.limit, this.status);
      page++;
    }
  }

  async getDeals(page, limit, status) {
    const {
      data,
      additional_data: { more_itens_in_collection },
    } = await axios.get(
      `${process.env.PIPEDRIVE_API_URL}?status=${status}&start=${page}&limit=${limit}&api_token=${process.env.PIPEDRIVE_TOKEN}`
    );
    let promises = [];
    data.forEach((deal) => {
      promises.push(this.insertNewRevenue({ ...deal }));
    });
    result = await Promise.all(promises);
    return { more_itens_in_collection, result };
  }

  insertNewRevenue({ id, title, value, update_time, status }) {
    let wonDate = new Date(update_time);
    const filter = { pipedriveId: id };
    let revenue = {
      pipedriveId: id,
      description: title,
      value,
      status,
      year: wonDate.getFullYear(),
      month: wonDate.getMonth() + 1,
      day: wonDate.getDate(),
    };
    return this.db.findOneAndUpdate(filter, revenue, {
      new: true,
      upsert: true,
      rawResult: true,
    });
  }
}

module.exports = PipedriveService;
