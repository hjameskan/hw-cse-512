import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BrushableParallelCoordinates = ({ data, width = 960, height = 400, margin = { top: 30, right: 10, bottom: 10, left: 10 } }) => {
  const ref = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    console.log('data');
    console.log(data);

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const dimensions = Object.keys(data[0]).filter(d => d !== 'name');
    const x = d3.scalePoint().domain(dimensions).range([margin.left, width - margin.right]);
    const y = {};
    dimensions.forEach(dim => {
      y[dim] = d3.scaleLinear()
        .domain(d3.extent(data, d => d[dim]))
        .range([height - margin.bottom, margin.top]);
    });

    const path = d => d3.line()(dimensions.map(p => [x(p), y[p](d[p])]));

    const foreground = svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-opacity", 0.5)
      .selectAll("path")
      .data(data)
      .join("path")
      .attr("d", path);

    const yAxis = g => g.selectAll("g")
      .data(dimensions)
      .join("g")
      .attr("transform", d => `translate(${x(d)},0)`)
      .each(function(d) { d3.select(this).call(d3.axisLeft(y[d])); })
      .call(g => g.append("text")
        .attr("y", -9)
        .attr("text-anchor", "middle")
        .attr("font-size", 10)
        .attr("font-weight", "bold")
        .text(d => d));

    svg.append("g")
      .call(yAxis);

    const brush = d3.brushY()
      .extent([[-margin.left, 0], [x.step(), height - margin.bottom]])
      .on("start brush end", brushed);

    const gBrush = svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .selectAll("g")
      .data(dimensions)
      .join("g")
      .attr("transform", d => `translate(${x(d)},0)`)
      .each(function(d) { d3.select(this).call(brush.extent([[-margin.left, y[d].range()[1]], [x.step(), y[d].range()[0]]])); })
      .call(brush);

    function brushed({selection}, dimension) {
      if (!selection) return;
      const e = d3.brushSelection(this);
    //   const [y0, y1] = e.map(d => y[dimension].invert(d));
      const [y0, y1] = e.map(d => y[dimension].invert(y[dimension].domain()[1] - d));
    //   const [y0, y1] = e.map(d => d3.event.sourceEvent.shiftKey ? y[dimension].invert(y[dimension].domain()[1] - d) : y[dimension].invert(d));
      foreground.classed("hidden", d => d[dimension] < y0 || d[dimension] > y1);
    }
  }, [data, width, height, margin]);

  return <svg ref={ref} width={width} height={height}></svg>;
};

export default BrushableParallelCoordinates;
