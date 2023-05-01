import React, { useState } from 'react';
import BarChart from './BarChart';

const App = () => {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);

  const addData = () => {
    setData([...data, Math.floor(Math.random() * 100)]);
  };

  return (
    <div>
      <h1>D3.js Bar Chart with React</h1>
      <BarChart data={data} width={600} height={400} />
      <button onClick={addData}>Add Data</button>
    </div>
  );
};

export default App;
