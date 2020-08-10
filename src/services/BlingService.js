const axios = require("axios");
const xmlBuilder = require("xmlbuilder");

class BlingService {
  constructor() {}

  createXml(value, type = "U", name) {
    let revenue = {
      contareceber: {
        valor: value,
        ocorrencia: {
          ocorrenciaTipo: type,
        },
        cliente: {
          nome: name.length > 120 ? name.substring(0, 119) : name,
        },
      },
    };
    var xml = xmlBuilder.create(revenue).end();
    return xml;
  }

  sendRergisterRevenueRequest(xml) {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams();
      params.append("xml", xml);
      axios({
        method: "post",
        url: `${process.env.BLING_API_URL}?apikey=${process.env.BLING_API_TOKEN}`,
        data: params,
      })
        .then((response) => {
          resolve({ status: response.status, result: response.data });
        })
        .catch((error) => {
          resolve({
            status: error.response.status,
            result: error.response.data,
          });
        });
    });
  }
}

module.exports = BlingService;
