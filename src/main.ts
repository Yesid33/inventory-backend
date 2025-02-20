import "dotenv/config";
import { createExpressServer } from "routing-controllers";

let PORT = 3000;
const corsOptions = {
  origin: "*", // Permitir cualquier origen
  optionsSuccessStatus: 200,
};

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
  cors: corsOptions,
  routePrefix: "/bp",
});

// run express application on port 3000
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
  console.log(`Host: http://localhost:${PORT}`);
  console.log(`Date/Time: ${new Date().toLocaleString()}`);
});
