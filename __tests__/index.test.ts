import express from "express";
const joi = require("joi");
import request from "supertest";
import { expect, test, describe, it } from "@jest/globals";
const usersRoute = require("../src/routes/index");

const app = express();

app.use(express.json());

app.use("/api/users", usersRoute);

app.use("/api/users/:id", usersRoute);

/**
 * Testing get all user endpoint
 */

describe("Integration tests for the users API", () => {
  it("GET /api/users - success - get all users information", async () => {
    const { body, statusCode } = await request(app).get("/api/users");
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          organization: expect.any(String),
          createdAt: expect.any(String),
          products: expect.any(Array),
          marketValue: expect.any(String),
          address: expect.any(String),
          ceo: expect.any(String),
          country: expect.any(String),
          noOfEmployees: expect.any(Number),
          employees: expect.any(Array),
        }),
      ])
    );

    expect(statusCode).toBe(200);
  });

  it("GET /api/users/id - success - get all users information", async () => {
    const { body, statusCode } = await request(app).get("/api/users/71");
    expect(body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        organization: expect.any(String),
        createdAt: expect.any(String),
        products: expect.any(Array),
        marketValue: expect.any(String),
        address: expect.any(String),
        ceo: expect.any(String),
        country: expect.any(String),
        noOfEmployees: expect.any(Number),
        employees: expect.any(Array),
      })
    );

    expect(statusCode).toBe(200);
  });

  it("POST /api/users -success", async () => {
    const { body, statusCode } = await request(app)
      .post("/api/users")
      .send({
        organization: "updated Hq ENGLAND",
        products: ["developers", "pizza", "garri"],
        marketValue: "90%",
        address: "sangotedo",
        ceo: "cn",
        country: "Taiwan",
        noOfEmployees: 2,
        employees: ["james bond", "jackie chan", "Folskyjoe"],
      });
    expect(statusCode).toBe(201);
    expect(body).toStrictEqual(
      expect.objectContaining({
        id: expect.any(Number),
        organization: expect.any(String),
        createdAt: expect.any(String),
        products: expect.any(Array),
        marketValue: expect.any(String),
        address: expect.any(String),
        ceo: expect.any(String),
        country: expect.any(String),
        noOfEmployees: expect.any(Number),
        employees: expect.any(Array),
      })
    );
  });

  it("PUT /api/users/id - Success - Successfully updated user", async () => {
    const { body, statusCode } = await request(app)
      .put("/api/users/1")
      .send({
        organization: "updated Hq ENGLAND Brazil",
        products: ["developers", "pizza", "garri", "fish"],
        marketValue: "90%",
        address: "sangotedo",
        ceo: "cn",
        country: "Taiwan",
        noOfEmployees: 2,
        employees: ["james bond", "jackie chan", "Folskyjoe", "latest member"],
      });

    expect(statusCode).toBe(200);
    expect(body).toEqual({
      updUser: {
        id: 1,
        organization: "updated Hq ENGLAND Brazil",
        createdAt: "2022-03-29T20:20:38.717Z",
        updatedAt: expect.any(Date),
        products: ["developers", "pizza", "garri", "fish"],
        marketValue: "90%",
        address: "sangotedo",
        ceo: "cn",
        country: "Taiwan",
        noOfEmployees: 2,
        employees: [
          "james bond",
          "jackie chan",
          "Folskyjoe",
          "latest member",
          "another stuff",
        ],
      },
    });
  });

  it("DELETE /api/users/id - failure when user is not found", async () => {
    const { body, statusCode } = await request(app).delete("/api/users/109")
    expect(statusCode).toBe(404);
    expect(body).toEqual({
        message: "User Not Found"
    });
  });
  it("DELETE /api/users/id - Success - Successfully deleted user", async () => {
    const { body, statusCode } = await request(app)
      .delete("/api/users/71")

    expect(statusCode).toBe(200);
    expect(body).toEqual({
      message: "User 71 removed",
    });
  });
});
