import React, { useState, useEffect } from 'react';
import BarChart from './BarChart';
import BrushableParallelCoordinates from './BrushableParallelCoordinates';
import { csvParse as csv } from 'd3-dsv';
import carsCSV from './res/cars.csv';
import BrushableParallelCoordinatesEmbed from './brushable-parallel-coordinates';

const App = () => {
  const [barChartData, setBarChartData] = useState([25, 30, 45, 60, 20, 65, 75]);
  const [carData, setCarData] = useState([]);

  useEffect(() => {
    fetch(carsCSV)
      .then((response) => response.text())
      .then((data) => {
        const parsedData = csv(data);
        parsedData.forEach((d) => {
          d['economy (mpg)'] = +d['economy (mpg)'];
          d['cylinders'] = +d['cylinders'];
          d['displacement (cc)'] = +d['displacement (cc)'];
          d['power (hp)'] = +d['power (hp)'];
          d['weight (lb)'] = +d['weight (lb)'];
          d['0-60 mph (s)'] = +d['0-60 mph (s)'];
          d['year'] = +d['year'];
        });
        setCarData(parsedData);
      });
  }, []);

  const addData = () => {
    setBarChartData([...barChartData, Math.floor(Math.random() * 100)]);
  };

  return (
    <div>
      <h1>D3.js Bar Chart with React</h1>
      <BarChart data={barChartData} width={600} height={400} />
      <button onClick={addData}>Add Data</button>
      <h1>Brushable Parallel Coordinates with React</h1>
      {carData.length > 0 && <BrushableParallelCoordinates data={carData} />}
      <h1>Embedding ObservableHQ Graph with iframe</h1>
      <h2>Cannot remove credits</h2>
      <iframe width="100%" height="925" frameborder="0" src="https://observablehq.com/embed/@d3/brushable-parallel-coordinates?cells=viewof+selection"/>
      
      <h1>Embedding ObservableHQ Graph by Writing React Component</h1>
      <h2>Allows me to remove credits</h2>
      <BrushableParallelCoordinatesEmbed />


    </div>
  );
};

export default App;
