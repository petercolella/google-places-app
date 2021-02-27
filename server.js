require("dotenv").config();
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const fetch = require("node-fetch");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Send every request to the React app
// Define any API routes before this runs
app.post("/api/placeImages", async (req, res) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${req.body.place}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${process.env.PLACES_API_KEY}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const result = await response.json();
  const photo_reference = result.candidates[0].photos[0].photo_reference;

  const photoResponse = await fetch(
    `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photo_reference}&key=${process.env.PLACES_API_KEY}&maxwidth=400&maxheight=400`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  res.json({ success: true, imageUrl: photoResponse.url });
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
