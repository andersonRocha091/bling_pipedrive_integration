const assert = require("assert");

const BlingService = require("../services/BlingService");

const MOCK_XML_REVENUE_CREATE = `<?xml version="1.0"?>
<contareceber>
  <valor>200</valor>
  <ocorrencia>
    <ocorrenciaTipo>U</ocorrenciaTipo>
  </ocorrencia>
  <cliente>
    <nome>Sergio Fernandes</nome>
  </cliente>
</contareceber>`;

describe("Testing bling integration routines", function () {
  this.beforeAll(() => {
    blingService = new BlingService();
  });

  it("Generating xml to be sent in a request", () => {
    const xmlString = blingService.createXml(200, "U", "Sergio Fernandes");
    assert.equal(xmlString, MOCK_XML_REVENUE_CREATE);
  });
});
