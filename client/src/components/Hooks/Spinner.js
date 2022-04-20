import React, { useState } from 'react';
import { css } from "@emotion/react";
import { BarLoader } from 'react-spinners';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Spinner = () => {
    let [color, setColor] = useState("#09A0FF");
    return (
        <div style={{ width: '100%', color: 'red' , margin:'auto'}} >
             <BarLoader color={color} width={'100%'} css={override} size={120} />
        </div>
    );
};

export default Spinner;