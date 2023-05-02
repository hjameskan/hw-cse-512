import React, {useRef, useEffect} from "react";
// import {Runtime, Inspector} from "@observablehq/runtime";
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import notebook from "@d3/parallel-coordinates";

function ParallelCoordinates() {
  const chartRef = useRef();

  useEffect(() => {
    const runtime = new Runtime();
    runtime.module(notebook, name => {
      if (name === "chart") return new Inspector(chartRef.current);
    });
    return () => runtime.dispose();
  }, []);

  return (
    <>
      <div ref={chartRef} />
      <p>Credit: <a href="https://observablehq.com/@d3/parallel-coordinates">Parallel Coordinates by D3</a></p>
    </>
  );
}

export default ParallelCoordinates;