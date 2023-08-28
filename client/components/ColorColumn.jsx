import React, { useState, useEffect, useRef } from "react";
import hexPopulator from "../hexPopulator";

const ColorColumn = () => {
  const [colorArray, setColorArray] = useState([
    "#F4EBEB",
    "",
    "",
    "",
    "#272CB0",
    "",
    "",
    "",
    "#220202",
  ]);
  const [showHex, SetShowHex] = useState(false);

  useEffect(() => {
    const hexArray = hexPopulator(colorArray[0], colorArray[4], colorArray[8]);
    for (let i = 0; i < colorArray.length; i++) {
      if (colorArray[i] !== hexArray[i]) {
        setColorArray(hexArray);
        break;
      }
    }
  }, [colorArray]);

  // For tracking renders:
  // const renderCount = useRef(1);
  // useEffect(() => {
  //   console.log("Color column render number:", renderCount.current);
  //   renderCount.current += 1;
  // });

  const changeColor = (index, value) => {
    const newColorArray = [...colorArray];
    newColorArray[index] = value.toUpperCase();
    setColorArray(newColorArray);
  };

  const generateInputs = () => {
    const inputs = [];
    for (let i = 0; i < colorArray.length; i++) {
      inputs.push(
        <>
          {showHex && <label className="hex-code">{colorArray[i]}</label>}
          <input
            type="color"
            onChange={(e) => changeColor(i, e.target.value)}
            value={colorArray[i]}
          />
        </>
      );
    }
    return inputs;
  };

  return (
    <div className="color-column">
      <div className="hex-input-container">
        {generateInputs()}
        <button onClick={() => SetShowHex(!showHex)}>Show hex</button>
      </div>
    </div>
  );
};

export default ColorColumn;
