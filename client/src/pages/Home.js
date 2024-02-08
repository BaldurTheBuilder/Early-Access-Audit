import React from "react";

import profilePicture from "../assets/profilePicture.jpg";

export default function Home() {
  return (
    <div className="container">
      <div className="col-md-5 m-5 mb-10 float-end">
        <h4>Home</h4>
        <p>
          Welcome to Early Access Audit. Simply enter the name of a video game or its steam application ID number and press enter to view statistics for the game.
        </p>
      </div>
      <div className="col-md-5 mt-5 float-start">
        <embed src={profilePicture} className="mw-5 img-fluid"></embed>
      </div>
    </div>
  );
}
