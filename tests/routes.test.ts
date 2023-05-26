import request from "supertest";
import app from "../server";


describe("Income Endpoints", () => {
  let userToken: any;

  beforeAll(async () => {
    await request(app).post("/api/register").send({
      username: "test_user3",
      email: "test3@test.com",
      password: "testpass3",
    });

    const user = await request(app).post("/api/authenticate").send({
      email: "test3@test.com",
      password: "testpass3",
    });

    userToken = user.body.userdata.token;
  });

  it("should show all income entries", async () => {
    const res = await request(app)
      .get("/api/incomes")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);

    expect(res.body).toHaveProperty("incomes");
  });

  it("should show an income entry", async () => {
    const res = await request(app)
      .get("/api/incomes/3")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);

    expect(res.body).toHaveProperty("income");
  });

  it("should create a new income entry", async () => {
    const res = await request(app)
      .post("/api/incomes")
      .send({
        name: "Sold cabbages",
        value: 800000,
        user_email: "test3@test.com",
      })
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(201);

    expect(res.body).toHaveProperty("income");
  });

  it("should update an income entry", async () => {
    const res = await request(app)
      .put("/api/incomes/1")
      .send({
        name: "Sold mangoes",
        value: 1250000,
      })
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);

    expect(res.body).toHaveProperty("income");
  });

  it("should delete an income entry", async () => {
    const res = await request(app)
      .del("/api/incomes/3")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(204);
  });
});

describe("Expense Endpoints", () => {
  let userToken: any;

  beforeAll(async () => {
    const user = await request(app).post("/api/authenticate").send({
      email: "test3@test.com",
      password: "testpass3",
    });

    userToken = user.body.userdata.token;
  });

  it("should show all expense entries", async () => {
    const res = await request(app)
      .get("/api/expenses")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);

    expect(res.body).toHaveProperty("expenses");
  });

  it("should show an expense entry", async () => {
    const res = await request(app)
      .get("/api/expenses/2")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);

    expect(res.body).toHaveProperty("expense");
  });

  it("should create a new expense entry", async () => {
    const res = await request(app)
      .post("/api/expenses")
      .send({
        name: "Bought 10 tons of fertilizers",
        value: 1000000000,
        user_email: "test3@test.com",
      })
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(201);

    expect(res.body).toHaveProperty("expense");
  });

  it("should update an expense entry", async () => {
    const res = await request(app)
      .put("/api/expenses/1")
      .send({
        name: "Bought Lamboghinis",
        value: 45000000000,
      })
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);

    expect(res.body).toHaveProperty("expense");
  });

  it("should delete an expense entry", async () => {
    const res = await request(app)
      .del("/api/expenses/3")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(204);
  });
});

describe("Vital User Endpoints", () => {
  it("should create a new user entry", async () => {
    const res = await request(app).post("/api/register").send({
      username: "test_user",
      email: "test@test.com",
      password: "testpass",
    });

    expect(res.statusCode).toEqual(201);

    expect(res.body).toHaveProperty("user");
  });

  it("should authenticate user", async () => {
    await request(app).post("/api/register").send({
      username: "test_user2",
      email: "test2@test.com",
      password: "testpass2",
    });

    const res = await request(app).post("/api/authenticate").send({
      email: "test2@test.com",
      password: "testpass2",
    });

    console.log(res.body);

    expect(res.statusCode).toEqual(200);

    expect(res.body).toHaveProperty("userdata");
  });
});

describe("Income-User Endpoints", () => {
  let userToken: any;
  let email: any;
  let id: any;

  beforeAll(async () => {
    const user = await request(app).post("/api/authenticate").send({
      email: "test3@test.com",
      password: "testpass3",
    });

    userToken = user.body.userdata.token;
    email = user.body.userdata.user.email;
    id = user.body.userdata.user.id;
  });

  it("should create a new income entry for the authenticated user", async () => {
    const res = await request(app)
      .post(`/api/${email}/incomes`)
      .send({
        name: "Sold cabbages",
        value: 800000,
        user_email: `${email}`,
      })
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(201);

    expect(res.body).toHaveProperty("income");
  });

  it("should get all income entries for the authenticated user", async () => {
    const res = await request(app)
      .get(`/api/${email}/incomes`)
      .send({
        name: "Sol",
      })
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);

    expect(res.body).toHaveProperty("income");
  });

  it("should get income entry by name or phrase for the authenticated user", async () => {
    const res = await request(app)
      .get(`/api/${email}/search_incomes`)
      .send({
        name: "Sol",
      })
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);

    expect(res.body).toHaveProperty("income");
  });

  it("should update an income entry for the authenticated user", async () => {
    await request(app)
      .post(`/api/${email}/incomes`)
      .send({
        name: "Sold red pepper",
        value: 800000,
        user_email: `${email}`,
      })
      .set("Authorization", `Bearer ${userToken}`);

      const user_incomes = await request(app)
      .get(`/api/${email}/search_incomes`)
      .send({
        name: "Sold red pepper",
      })
      .set("Authorization", `Bearer ${userToken}`);
    
    const _id = user_incomes.body.income[0].id;

    const res = await request(app)
      .put(`/api/${email}/${_id}/incomes/`)
      .send({
        name: "Sold green pepper",
        value: 1250000,
      })
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);

    expect(res.body).toHaveProperty("income");
  });

  it("should delete an income entry for the authenticated user", async () => {
    await request(app)
      .post(`/api/${email}/incomes`)
      .send({
        name: "Sold kale",
        value: 800000,
        user_email: `${email}`,
      })
      .set("Authorization", `Bearer ${userToken}`);

    const user_incomes = await request(app)
      .get(`/api/${email}/search_incomes`)
      .send({
        name: "Sold kale",
      })
      .set("Authorization", `Bearer ${userToken}`);

    const _id = user_incomes.body.income[0].id;


    const res = await request(app)
      .del(`/api/${email}/${_id}/incomes`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(204);
  });
});

describe("Expense-User Endpoints", () => {
  let userToken: any;
  let email: any;
  let id: any;

  beforeAll(async () => {
    const user = await request(app).post("/api/authenticate").send({
      email: "test3@test.com",
      password: "testpass3",
    });

    userToken = user.body.userdata.token;
    email = user.body.userdata.user.email;
    id = user.body.userdata.user.id;
  });

  it("should create a new expense entry for the authenticated user", async () => {
    const res = await request(app)
      .post(`/api/${email}/expenses`)
      .send({
        name: "Buy cabbages",
        value: 800000,
        user_email: `${email}`,
      })
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(201);

    expect(res.body).toHaveProperty("expense");
  });

  it("should get all expense entries for the authenticated user", async () => {
    const res = await request(app)
      .get(`/api/${email}/expenses`)      
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);

    expect(res.body).toHaveProperty("expense");
  });

  it("should get expense entry by name or phrase for the authenticated user", async () => {
    const res = await request(app)
      .get(`/api/${email}/search_expenses`)
      .send({
        name: "Buy",
      })
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);

    expect(res.body).toHaveProperty("expense");
  });

  it("should update an expense entry for the authenticated user", async () => {
    await request(app)
      .post(`/api/${email}/expenses`)
      .send({
        name: "Buy cabbages",
        value: 800000,
        user_email: `${email}`,
      })
      .set("Authorization", `Bearer ${userToken}`);

    const user_expenses = await request(app)
    .get(`/api/${email}/search_expenses`)
    .send({
      name: "Buy cabbages",
    })
    .set("Authorization", `Bearer ${userToken}`);
    
    const _id = user_expenses.body.expense[0].id;

    const res = await request(app)
      .put(`/api/${email}/${_id}/expenses/`)
      .send({
        name: "Buy mangoes",
        value: 1250000,
      })
      .set("Authorization", `Bearer ${userToken}`);



    expect(res.statusCode).toEqual(200);

    expect(res.body).toHaveProperty("expense");
  });

  it("should delete an expense entry for the authenticated user", async () => {
    await request(app)
      .post(`/api/${email}/expenses`)
      .send({
        name: "Buy apples",
        value: 800000,
        user_email: `${email}`,
      })
      .set("Authorization", `Bearer ${userToken}`);

    const user_expenses = await request(app)
    .get(`/api/${email}/search_expenses`)
    .send({
      name: "Buy apples",
    })
    .set("Authorization", `Bearer ${userToken}`);
    
    const _id = user_expenses.body.expense[0].id;

    const res = await request(app)
      .del(`/api/${email}/${_id}/expenses`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(204);
  });
});

describe("General Enpoints and General User Endpoints", () => {
  let userToken: any;
  let email: any;
  let id: any;

  beforeAll(async () => {
    await request(app).post("/api/register").send({
      username: "test_user4",
      email: "test4@test.com",
      password: "testpass4",
    });

    const user = await request(app).post("/api/authenticate").send({
      email: "test4@test.com",
      password: "testpass4",
    });

    userToken = user.body.userdata.token;
    email = user.body.userdata.user.email;
    id = user.body.userdata.user.id;
  });

  it("should show the root", async () => {
    const res = await request(app).get("/api/");

    expect(res.body).toHaveProperty("root");
  });

  // it("should get user by ID", async () => {
  //   const res = await request(app)
  //     .get(`/api/${id}/user`)
  //     .set("Authorization", `Bearer ${userToken}`);

  //   expect(res.statusCode).toBe(200);

  //   expect(res.body).toHaveProperty("user");
  // });

  it("should get user by Email", async () => {
    const res = await request(app)
      .get(`/api/${email}/user`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);

    expect(res.body).toHaveProperty("user");
  });


  it("should update username", async () => {
    const res = await request(app)
      .put(`/api/${email}/${id}/edit`)
      .send({
        username: "Carlos",
      })
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);

    expect(res.body).toHaveProperty("profile");
  });

  it("should change user password", async () => {
    const res = await request(app)
      .put(`/api/${email}/${id}/change_password`)
      .send({
        password: "W-rizz",
      })
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);

    expect(res.body).toHaveProperty("profile");
  });

  it("should logout JWT User", async () => {
    const res = await request(app)
      .get(`/api/${email}/logout`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);

    expect(res.body).toHaveProperty("message");

    expect(res.text).toMatch("Logout successful")
  });

  it("should delete user account for the authenticated user", async () => {    
    const res = await request(app)
      .del(`/api/${email}/deleteAccount`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);   

    expect(res.body).toHaveProperty("message");

    expect(res.text).toMatch("User has been deleted");

  });
});