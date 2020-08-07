const assert = require("assert");
const api = require("../Api");

let app = {};
const apiToken = "65e2b65ba5cd1c7be5e84d7dcbd215a64b3b3d99";
let pipeDriveUrl = `https://api.pipedrive.com/v1/deals?status=all_not_deleted&start=0&api_token=${apiToken}`;
// const MOCK_DEAL_WEBHOOK_UPDATE = {
//   value: 235,
//   description: "1st revenue from test",
// };

const MOCK_DEAL_LIST = {
  success: true,
  data: [
    {
      id: 1,
      creator_user_id: {
        id: 11659859,
        name: "Anderson Rocha",
        email: "andersonecomp09.1@gmail.com",
        has_pic: 0,
        pic_hash: null,
        active_flag: true,
        value: 11659859,
      },
      user_id: {
        id: 11659859,
        name: "Anderson Rocha",
        email: "andersonecomp09.1@gmail.com",
        has_pic: 0,
        pic_hash: null,
        active_flag: true,
        value: 11659859,
      },
      person_id: {
        active_flag: true,
        name: "Italo Silva",
        email: [
          {
            value: "",
            primary: true,
          },
        ],
        phone: [
          {
            value: "",
            primary: true,
          },
        ],
        value: 1,
      },
      org_id: {
        name: "Otto Tech",
        people_count: 1,
        owner_id: 11659859,
        address: null,
        active_flag: true,
        cc_email: "andersons@pipedrivemail.com",
        value: 1,
      },
      stage_id: 1,
      title: "Italo Silva deal",
      value: 500,
      currency: "USD",
      add_time: "2020-08-06 23:21:09",
      update_time: "2020-08-06 23:26:03",
      stage_change_time: "2020-08-06 23:25:41",
      active: true,
      deleted: false,
      status: "open",
      probability: null,
      next_activity_date: null,
      next_activity_time: null,
      next_activity_id: null,
      last_activity_id: null,
      last_activity_date: null,
      lost_reason: null,
      visible_to: "3",
      close_time: null,
      pipeline_id: 1,
      won_time: null,
      first_won_time: null,
      lost_time: null,
      products_count: 1,
      files_count: 0,
      notes_count: 0,
      followers_count: 1,
      email_messages_count: 0,
      activities_count: 0,
      done_activities_count: 0,
      undone_activities_count: 0,
      participants_count: 1,
      expected_close_date: null,
      last_incoming_mail_time: null,
      last_outgoing_mail_time: null,
      label: null,
      stage_order_nr: 0,
      person_name: "Italo Silva",
      org_name: "Otto Tech",
      next_activity_subject: null,
      next_activity_type: null,
      next_activity_duration: null,
      next_activity_note: null,
      formatted_value: "US$500",
      weighted_value: 500,
      formatted_weighted_value: "US$500",
      weighted_value_currency: "USD",
      rotten_time: null,
      owner_name: "Anderson Rocha",
      cc_email: "andersons+deal1@pipedrivemail.com",
      org_hidden: false,
      person_hidden: false,
    },
  ],
  additional_data: {
    pagination: {
      start: 0,
      limit: 100,
      more_items_in_collection: false,
    },
  },
  related_objects: {
    user: {
      "11659859": {
        id: 11659859,
        name: "Anderson Rocha",
        email: "andersonecomp09.1@gmail.com",
        has_pic: 0,
        pic_hash: null,
        active_flag: true,
      },
    },
    organization: {
      "1": {
        id: 1,
        name: "Otto Tech",
        people_count: 1,
        owner_id: 11659859,
        address: null,
        active_flag: true,
        cc_email: "andersons@pipedrivemail.com",
      },
    },
    person: {
      "1": {
        active_flag: true,
        id: 1,
        name: "Italo Silva",
        email: [
          {
            value: "",
            primary: true,
          },
        ],
        phone: [
          {
            value: "",
            primary: true,
          },
        ],
      },
    },
  },
};

// const MOCK_HERO_INITIAL = {
//   nome: "Gavião arqueiro",
//   poder: "mira",
// };
// const TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkxleEx1dGhvciIsImlkIjoxLCJpYXQiOjE1OTEzMTgxNDR9.10qS7Bt-tt0KR3aogMPdoAGl_dd-3KPuR0TA0DyvqY8";
// let MOCK_ID = "";
// const headers = {
//   Authorization: TOKEN,
// };

describe("Api Test Suit", function () {
  it("Must return true", () => {
    assert.deepEqual(true, true);
  });

  it("Cadastrar POST - /Revenues", async () => {
    const result = await app.inject({
      method: "POST",
      url: "/revenues",
      payload: MOCK_DEAL_WEBHOOK_UPDATE,
      // headers,
    });
    const statusCode = result.statusCode;
    const { message, _id } = JSON.parse(result.payload);
    assert.ok(statusCode === 200);
    assert.notStrictEqual(_id, undefined);
    assert.deepEqual(message, "Revenue inserted successfully");
  });

  // this.beforeAll(async () => {
  //   app = await api;
  //   const result = await app.inject({
  //     method: "POST",
  //     url: "/heroes",
  //     headers,
  //     payload: JSON.stringify(MOCK_HERO_INITIAL),
  //   });
  //   const { _id } = JSON.parse(result.payload);
  //   MOCK_ID = _id;
  // });
  // it("Heroes /heroes list", async () => {
  //   const result = await app.inject({
  //     method: "GET",
  //     url: "/heroes?skip=0&limit=10",
  //     headers,
  //   });
  //   const dados = JSON.parse(result.payload);
  //   const statusCode = result.statusCode;
  //   assert.deepEqual(statusCode, 200);
  //   assert.ok(Array.isArray(dados));
  // });
  // it("List /heroes - must return only 3 records", async () => {
  //   const LIMIT_SIZE = 3;
  //   const result = await app.inject({
  //     method: "GET",
  //     url: `/heroes?skip=0&limit=${LIMIT_SIZE}`,
  //     headers,
  //   });
  //   const dados = JSON.parse(result.payload);
  //   const statusCode = result.statusCode;
  //   assert.deepEqual(statusCode, 200);
  //   assert.ok(dados.length === LIMIT_SIZE);
  // });
  // it("List /heroes - must return error when limit is invalid", async () => {
  //   const LIMIT_SIZE = "AEEE";
  //   const result = await app.inject({
  //     method: "GET",
  //     url: `/heroes?skip=0&limit=${LIMIT_SIZE}`,
  //     headers,
  //   });
  //   const erroResult = {
  //     statusCode: 400,
  //     error: "Bad Request",
  //     message: '"limit" must be a number',
  //     validation: { source: "query", keys: ["limit"] },
  //   };
  //   assert.deepEqual(result.statusCode, 400);
  //   assert.deepEqual(result.payload, JSON.stringify(erroResult));
  // });
  // it("List /heroes - must filter by name", async () => {
  //   const LIMIT_SIZE = 1000;
  //   const NAME = "Batman";
  //   const result = await app.inject({
  //     method: "GET",
  //     url: `/heroes?skip=0&limit=${LIMIT_SIZE}&name=${NAME}`,
  //     headers,
  //   });
  //   const dados = JSON.parse(result.payload);
  //   const statusCode = result.statusCode;
  //   assert.deepEqual(statusCode, 200);
  //   assert.ok(dados[0].nome === NAME);
  // });
  // it("Cadastrar POST - /Heroes", async () => {
  //   const result = await app.inject({
  //     method: "POST",
  //     url: "/heroes",
  //     payload: MOCK_HERO_CADASTRAR,
  //     headers,
  //   });
  //   const statusCode = result.statusCode;
  //   const { message, _id } = JSON.parse(result.payload);
  //   assert.ok(statusCode === 200);
  //   assert.notStrictEqual(_id, undefined);
  //   assert.deepEqual(message, "Hero inserted successfully");
  // });
  // it("Update Object Partially /heroes/:id", async () => {
  //   const _id = MOCK_ID;
  //   const expected = {
  //     poder: "super mira",
  //   };
  //   const result = await app.inject({
  //     method: "PATCH",
  //     url: `/heroes/${_id}`,
  //     headers,
  //     payload: JSON.stringify(expected),
  //   });
  //   const statusCode = result.statusCode;
  //   const dados = JSON.parse(result.payload);
  //   assert.ok(statusCode === 200);
  //   assert.deepEqual(dados.message, "Hero updated successfully");
  // });
  // it("Update Object Partially /heroes/:id - incorrect id not update", async () => {
  //   const _id = `5ed71b39f5b82cecc4b7e197`;
  //   const updatedAttribute = {
  //     poder: "super mira",
  //   };
  //   const result = await app.inject({
  //     method: "PATCH",
  //     url: `/heroes/${_id}`,
  //     headers,
  //     payload: JSON.stringify(updatedAttribute),
  //   });
  //   const expected = {
  //     statusCode: 412,
  //     error: "Precondition Failed",
  //     message: "Cant update hero",
  //   };
  //   const statusCode = result.statusCode;
  //   const dados = JSON.parse(result.payload);
  //   assert.ok(statusCode === 412);
  //   assert.deepEqual(expected, dados);
  // });
  // it("Delete DELETE /heroes/:id", async () => {
  //   const _id = MOCK_ID;
  //   const result = await app.inject({
  //     method: "DELETE",
  //     url: `/heroes/${_id}`,
  //     headers,
  //   });
  //   const statusCode = result.statusCode;
  //   const dados = JSON.parse(result.payload);
  //   assert.ok(statusCode === 200);
  //   assert.deepEqual(dados.message, "Hero removed successfully");
  // });
  // it("Delete DELETE /heroes/:id - invalid id", async () => {
  //   const _id = `5ed71b39f5b82cecc4b7e197`;
  //   const result = await app.inject({
  //     method: "DELETE",
  //     url: `/heroes/${_id}`,
  //     headers,
  //   });
  //   const expected = {
  //     statusCode: 412,
  //     error: "Precondition Failed",
  //     message: "Id Not Found",
  //   };
  //   const statusCode = result.statusCode;
  //   const dados = JSON.parse(result.payload);
  //   assert.ok(statusCode === 412);
  //   assert.deepEqual(expected, dados);
  // });
  // it("Delete DELETE /heroes/:id - do not remove data it causes excepection", async () => {
  //   const _id = `ID_INVALIDO`;
  //   const result = await app.inject({
  //     method: "DELETE",
  //     url: `/heroes/${_id}`,
  //     headers,
  //   });
  //   const expected = {
  //     error: "Internal Server Error",
  //     message: "An internal server error occurred",
  //     statusCode: 500,
  //   };
  //   const dados = JSON.parse(result.payload);
  //   assert.deepEqual(expected, dados);
  // });
});
