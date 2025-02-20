import "dotenv/config";
import { app } from "./views/routes/routes";

let PORT = 3000;

// run express application on port 3000
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
  console.log(`Host: http://localhost:${PORT}`);
  console.log(`Date/Time: ${new Date().toLocaleString()}`);
});
