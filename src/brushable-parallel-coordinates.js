import * as d3 from "d3";
// import { Runtime, Inspector } from "@observablehq/runtime";
import { Runtime, Inspector } from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import React from "react";
import ReactDOM from "react-dom";
import notebook from "./brushable-parallel-coordinates-notebook";

class BrushableParallelCoordinates extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    const runtime = new Runtime();
    const main = runtime.module(notebook, (name) => {
      if (name === "chart") {
        return new Inspector(this.chartRef.current);
      }
    });
    this.setState({ main });
  }

  componentWillUnmount() {
    this.state.main.dispose();
  }

  render() {
    return <div ref={this.chartRef} />;
  }
}

export default BrushableParallelCoordinates;
