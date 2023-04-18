import React, { useState , SetStateAction } from 'react'
import './table.css'

interface TableState {

    inputText: string;

}

const Table = () => {

    const [inputText, setState] = useState("");
    
    let onchangeInput = (inputData: string) => {

        setState(inputData);
    }

    return (
    <div>
    <h1>This is Table</h1>
    <input onChange={event => onchangeInput(event.target.value)}></input>
    <h3>{inputText}</h3>
    </div>

    );
  };
  


export default Table;