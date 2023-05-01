import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data, width, height }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const xScale = d3
      .scaleBand()
      .domain(data.map((d, i) => i))
      .range([0, width])
      .padding(0.2);

    const yScale = d3.scaleLinear().domain([0, d3.max(data)]).range([height, 0]);

    const xAxis = d3.axisBottom(xScale).ticks(data.length);
    const yAxis = d3.axisLeft(yScale);

    svg
      .select('.x-axis')
      .style('transform', `translateY(${height}px)`)
      .call(xAxis);

    svg.select('.y-axis').call(yAxis);

    const update = svg.selectAll('.bar').data(data);

    update
      .enter()
      .append('rect')
      .classed('bar', true)
      .merge(update)
      .style('fill', 'steelblue')
      .attr('x', (d, i) => xScale(i))
      .attr('width', xScale.bandwidth())
      .transition()
      .duration(300)
      .attr('y', (d) => yScale(d))
      .attr('height', (d) => height - yScale(d));

    update.exit().remove();
  }, [data, width, height]);

  return (
    <svg ref={svgRef} width={width} height={height}>
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
};

export default BarChart;
