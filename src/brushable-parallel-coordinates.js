import React, { useEffect, useRef } from "react";
// import { Runtime, Inspector } from "@observablehq/runtime";
// import { Runtime, Inspector } from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import { Runtime, Inspector } from "./res/embed_runtime.js";
// import define from "https://api.observablehq.com/@d3/brushable-parallel-coordinates.js?v=3";
import define from "./res/embed_brushable-parallel-coordinates.js";
// import "@observablehq/inspector/dist/inspector.css";
import "./res/embed_inspector.css";

const BrushableParallelCoordinatesEmbed = () => {
  const containerRef = useRef();

  useEffect(() => {
    if (containerRef.current) {
      new Runtime().module(define, name => {
        if (name === "viewof selection") {
          return new Inspector(containerRef.current);
        }
      });
    }
  }, [containerRef]);

  return (
    <>
      <div ref={containerRef}></div>
      {/* <p>
        Credit:{" "}
        <a href="https://observablehq.com/@d3/brushable-parallel-coordinates">
          Brushable Parallel Coordinates by D3
        </a>
      </p> */}
    </>
  );
};

export default BrushableParallelCoordinatesEmbed;
