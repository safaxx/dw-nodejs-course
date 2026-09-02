import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line
app.get("/api", (req, res) => {
  const now = new Date();

  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

app.get("/api/:date", (req, res) => {
  const { date } = req.params;

  let dateObj;

  // Check if the input contains only numbers
  if (/^\d+$/.test(date)) {
    dateObj = new Date(Number(date));
  } else {
    dateObj = new Date(date);
  }

   if (isNaN(dateObj.getTime())) {
    return res.json({
      error: "Invalid Date"
    });
  }

  res.json({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString()
  });
});
// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
