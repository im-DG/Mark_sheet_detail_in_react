import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


const BarGraph = ({ data }) => {
  const chartContainer = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      // Calculate required data for the bar graph
      const totalStudents = data.length;
      const passStudents = data.filter(({ exam_grade, rating_grade }) => {
        const final_grade = 0.6 * exam_grade + 0.4 * rating_grade;
        return final_grade >= 4;
      }).length;
      const failStudents = totalStudents - passStudents;
      const marksData = data.map(({ exam_grade, rating_grade }) => {
        return 0.6 * exam_grade + 0.4 * rating_grade;
      });
      const averageMarks = marksData.reduce((acc, curr) => acc + curr, 0) / totalStudents;
      const minimumMarks = Math.min(...marksData);
      const maximumMarks = Math.max(...marksData);

      // Create data for the bar graph
      const chartData = {
        labels: ['Pass', 'Fail', 'Total Students', 'Average Marks', 'Minimum Marks', 'Maximum Marks'],
        datasets: [
          {
            label: 'Bar Graph',
            data: [passStudents, failStudents, totalStudents, averageMarks, minimumMarks, maximumMarks],
            backgroundColor: [
              'green',
              'red',
              'yellow',
              'skyblue',
              'orange',
              'lightgreen',
            ],
            borderWidth: 1,
          },
        ],
      };

      const chartConfig = {
        type: 'bar',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        },
      };

      const barGraph = new Chart(chartContainer.current, chartConfig);
      return () => barGraph.destroy();
    }
  }, [data]);

  return (
    <div className='chart-container' style={{ height: '400px'}}>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default BarGraph;
