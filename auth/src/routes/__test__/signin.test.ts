import request from "supertest";
import { app } from "../../app";

describe("Signin", () => {
  describe("Success", () => {
    it("should respond with cookie when valid credentials supplied", async () => {
      await request(app)
        .post("/api/users/signup")
        .send({ email: "test@test.com", password: "password" })
        .expect(201);

      const response = await request(app)
        .post("/api/users/signin")
        .send({ email: "test@test.com", password: "password" })
        .expect(200);

      expect(response.get("Set-Cookie")).toBeDefined();
    });
  });

  describe("Failure", () => {
    it("should fail when an email that does not exist is supplied", async () => {
      return request(app)
        .post("/api/users/signin")
        .send({ email: "test@test.com", password: "password" })
        .expect(400);
    });

    it("should fail when an incorrect password is supplied", async () => {
      await request(app)
        .post("/api/users/signup")
        .send({ email: "test@test.com", password: "password" })
        .expect(201);

      await request(app)
        .post("/api/users/signin")
        .send({ email: "test@test.com", password: "1234" })
        .expect(400);
    });

  });
});
