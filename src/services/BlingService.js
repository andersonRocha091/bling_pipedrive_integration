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
    var xml = xmlBuilder.create(revenue).end({ pretty: true });
    return xml;
  }
}

module.exports = BlingService;
