import React from 'react';
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({courseNames,dataSet,labelData}) => {

    function getRandomNumbers(){
        return Math.floor(Math.random()*256);
    }
    let backgroundColor = [];
    for(let i = 0;i<dataSet?.length;i++){
        backgroundColor = [...backgroundColor,`rgb(${getRandomNumbers()},${getRandomNumbers()},${getRandomNumbers()})`];
    }
  const data = {
    labels: [...courseNames],
    datasets: [
      {
        label: labelData,
        data: [...dataSet],
        backgroundColor:backgroundColor
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 13, 
          },
          color: '#F1F2FF', 
        },
      },
    },
  };
  return <Pie data={data} options={options}/>;
};

export default PieChart;
