// import App from "./components/App";
import React from 'react';
import { render } from "react-dom";
import BasicTable from './components/Table_species_new'

console.log('index.js is successful loaded')
const tableDiv = document.getElementById("datatable");
render(<BasicTable />, tableDiv);