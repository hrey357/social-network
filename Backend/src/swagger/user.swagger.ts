import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "1.0.0",
    title: "API User Service - Social Network",
    description:
      "Microservice dedicated to managing user of a social network posts.",
  },
  host: "localhost:4020",
  basePath: "/api/user",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: ["User"],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      RequestBodyLogin: {
        email: "juan.perez@gmail.com",
        password: "User753**",
      },
      RequestBodyRegister: {
        firstname: "Nombre",
        lastname: "Apellido",
        alias: "Apodo",
        email: "nombre.apellido@gmail.com",
        dateofbirth: "1973-01-18",
        password: "User753**",
      },
      User: {
        id: 1,
        firstname: "Juan",
        lastname: "Perez",
        email: "juan.perez@gmail.com",
        role: "User"
      },
      Perfil: {
        id: 6,
        firstname: "Nombre",
        lastname: "Apellido",
        alias: "Apodo",
        email: "nombre.apellido@gmail.com",
        dateofbirth: "1973-01-18",
      },
      OkLogin: {
        data: {
          $ref: "#/components/schemas/User",
        },
      },
      OkPerfil: {
        data: {
          $ref: "#/components/schemas/Perfil",
        },
      },
      OkRegister: {
        data: {
          $ref: "#/components/schemas/User",
        },
      },
      OkGetUsers: {
        data: [{ $ref: "#/components/schemas/User" }],
      },
      Unauthorized: {
        error:  "The access token is missing or invalid.",
      },
      NotFound: {
        error: "Post No Encontrado",
      },
      Forbidden: {
        error: "Sin acceso, no eres el propietario del Post",
      },
      BadRequest: {
        errors: [
          {
            type: "field",
            msg: "La propiedad password debe ser enviada",
            path: "password",
            location: "body",
          },
          {
            type: "field",
            msg: "El password no puede ir vacio",
            path: "password",
            location: "body",
          },
        ],
      },
    },
  },
};

const outputFile = "./user.swagger.json";
const endpointsFiles = ["./src/routes/user.route.ts"];

swaggerAutogen({ openapi: "3.1.1" })(outputFile, endpointsFiles, doc);
