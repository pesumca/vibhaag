import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Vibhaag API",
      version: "1.0.0",
      description: "Vibhaag backend API documentation",
    },
    servers: [
      { url: "http://localhost:4000", description: "Local API" },
      { url: "http://api.vibhaag.localhost", description: "Caddy proxy" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.ts"],
});
