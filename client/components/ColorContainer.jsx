import React, { useState, useEffect, useRef } from "react";
import ColorColumn from "./ColorColumn";

const ColorContainer = () => {
  const [colArray, setColArray] = useState([]);

  // For tracking renders
  // const renderCount = useRef(1);
  // useEffect(() => {
  //   console.log('Color container render number:', renderCount.current);
  //   renderCount.current += 1;
  // });

  const addCol = () => {
    setColArray([...colArray, <ColorColumn />]);
  };

  return (
    <div>
      <button onClick={addCol}>Add Column</button>
      <div className="color-container">{colArray}</div>
    </div>
  );
};

export default ColorContainer;
