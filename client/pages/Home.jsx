import React, { useState, useEffect } from "react";
// import ColorColumn from '../components/ColorColumn';
import ColorContainer from "../components/ColorContainer";

const Home = () => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div className="home-page">
      <h2>Color Picker</h2>
      {showInfo && (
        <>
          <p>
            Click "Add Column" to produce a new color column, add as many as you
            like
          </p>
          <p>
            Adjust the middle color to adjust the hue, and then adjust the first
            and last squares to be the lightest and darkest version of the color
            you'd like to use. The rest of the boxes will automatically update
            to reflect regular intervals of saturation and brightness between
            the first, middle, and last colors selected.
          </p>
          <p>
            Click "Show hex" on a color to show the hex codes for a column to
            make copying them easier
          </p>
        </>
      )}
      <button onClick={() => setShowInfo(!showInfo)}>
        How to use this page
      </button>
      <ColorContainer />
    </div>
  );
};

export default Home;
