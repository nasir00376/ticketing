import request from "supertest";
import { app } from "../../app";

describe("Signup", () => {
  describe("Success", () => {
    it("should return a 201 on successfull signup", async () => {
      return request(app)
        .post("/api/users/signup")
        .send({ email: "test@test.com", password: "password" })
        .expect(201);
    });

    it("should set a cookie after successfull signup", async () => {
      const response = await request(app)
        .post("/api/users/signup")
        .send({ email: "test@test.com", password: "password" })
        .expect(201);

        expect(response.get('Set-Cookie')).toBeDefined()
    });
  });

  describe("Failure", () => {
    it("should return a 422 with an invalid email", async () => {
      return request(app)
        .post("/api/users/signup")
        .send({ email: "abc", password: "password" })
        .expect(422);
    });

    it("should return a 422 with an invalid password", async () => {
      return request(app)
        .post("/api/users/signup")
        .send({ email: "test@test.com", password: "1" })
        .expect(422);
    });

    it("should return a 422 with missing email and password", async () => {
      return request(app).post("/api/users/signup").send({}).expect(422);
    });

    it("should disallow duplicate emails", async () => {
      await request(app)
        .post("/api/users/signup")
        .send({ email: "test@test.com", password: "password" })
        .expect(201);

      await request(app)
        .post("/api/users/signup")
        .send({ email: "test@test.com", password: "password" })
        .expect(400);
    });
  });
});
