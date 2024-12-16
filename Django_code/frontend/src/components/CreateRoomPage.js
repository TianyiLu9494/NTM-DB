import React, { Component } from "react";
import DataTable from "./Table_species"

export default class CreateRoomPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div><DataTable /></div>;
  }
}
