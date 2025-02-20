import { createExpressServer } from "routing-controllers";
import { ProductController } from "../../controllers/ProductControllers";

const corsOptions = {
  origin: "*", // allowed all origin
  optionsSuccessStatus: 200,
};

// creates express app, registers all controller routes and returns you express app instance
export const app = createExpressServer({
  cors: corsOptions,
  routePrefix: "/api",
  controllers: [ProductController], // we specify controllers we want to use
});
