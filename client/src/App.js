import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const App = () => {
  const [place, setPlace] = useState("");
  const [image, setImage] = useState("https://via.placeholder.com/200");

  const handleSubmit = async () => {
    const response = await fetch("/api/placeImages", {
      method: "POST",
      body: JSON.stringify({ place }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();
    console.log(res);

    setImage(res.imageUrl);
  };

  const handleChange = (e) => {
    setPlace(e.target.value);
  };

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>
      <div className="App-intro">
        <input
          name="place"
          placeholder="Enter a place"
          value={place}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        <img src={image} alt="selected place" />
      </div>
    </div>
  );
};

export default App;
