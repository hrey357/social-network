import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "1.0.0",
    title: "API Like Service - Social Network",
    description:
      "Microservice dedicated to managing likes of a social network posts.",
  },
  host: "localhost:4000",
  basePath: "/api/like",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: ["Likes"],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      Unauthorized: {
        error:  "The access token is missing or invalid.",
      },
      OkGetLikes: {
        data: [
          {
            mensaje: 3,
            count: "1",
          },
          {
            mensaje: 5,
            count: "1",
          },
          {
            mensaje: 4,
            count: "1",
          },
          {
            mensaje: 2,
            count: "1",
          },
          {
            mensaje: 1,
            count: "1",
          },
        ],
      },
      OkToggleLike: {
        data: {
          mensaje: 2,
          usuario: 1,
          id: 6,
          updatedAt: "2025-05-21T14:22:33.668Z",
          createdAt: "2025-05-21T14:22:33.668Z",
        },
      },
      DeleteToggleLike: {
        data: "Like Eliminado",
      },
      BadRequest: {
        errors: [
          {
            type: "field",
            value: "xdc",
            msg: "ID no válido, debe ser numerico",
            path: "id",
            location: "params",
          },
        ],
      },
    },
  },
};

const outputFile = "./like.swagger.json";
const endpointsFiles = ["./src/routes/like.route.ts"];

swaggerAutogen({ openapi: "3.1.1" })(outputFile, endpointsFiles, doc);
