import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "1.0.0",
    title: "API Post Service - Social Network",
    description:
      "Microservice dedicated to managing post of a social network posts.",
  },
  host: "localhost:4010",
  basePath: "/api/post",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: ["Post"],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      RequestBodyPost: {
        mensaje:
          "Duis ex lectus, sollicitudin quis sollicitudin in, euismod a neque. Etiam ullamcorper vel erat ac pharetra. Maecenas volutpat a urna eu pellentesque. Nullam sit amet feugiat leo. Curabitur at felis sed lectus vulputate malesuada rhoncus efficitur risus.",
      },      
      Post: {
        id: 5,
        mensaje:
          "Proin id pellentesque magna. Vestibulum in eleifend nisl, ac eleifend est. Phasellus rutrum fermentum libero, viverra dapibus ligula porta pellentesque. Vestibulum a ultricies nulla. Ut mauris libero, dignissim non enim id, suscipit venenatis augue. Morbi et neque risus. Proin faucibus efficitur lectus non vestibulum. Cras malesuada ex vel nunc sollicitudin, eget feugiat ante pellentesque. Donec nec elit nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam arcu risus, laoreet porttitor sem vitae, tincidunt fringilla magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam porttitor, massa eu efficitur cursus, diam ex vehicula tellus, ut imperdiet lectus magna sed lacus. Suspendisse in lacus volutpat, malesuada ante ut, blandit risus.",
        usuario: 5,
        createdAt: "2025-05-21T14:30:21.415Z",
        updatedAt: "2025-05-21T14:30:21.415Z",
      },
      OkPost: {
        data: {
            $ref: '#/components/schemas/Post'
        }
      },
      OkPosts: {
        data: [
            {$ref: '#/components/schemas/Post'}
          ]
      },
      Unauthorized: {
        error:  "The access token is missing or invalid.",
      },
      NotFound: {
        error: "Post No Encontrado"
      },
      Forbidden: {
        error: "Sin acceso, no eres el propietario del Post",
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

const outputFile = "./post.swagger.json";
const endpointsFiles = ["./src/routes/post.route.ts"];

swaggerAutogen({ openapi: "3.1.1" })(outputFile, endpointsFiles, doc);
