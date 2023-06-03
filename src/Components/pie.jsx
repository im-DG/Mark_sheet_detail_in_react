
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ data }) => {
const chartContainer = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      // Calculate number of students in each grade range
      const gradeRanges = {
        '0-2': 0,
        '2-4': 0,
        '4-6': 0,
        '6-8': 0,
        '8-10': 0,
      };
      data.forEach(({ exam_grade, rating_grade }) => {
        const final_grade = 0.6 * exam_grade + 0.4 * rating_grade;
        if (final_grade >= 0 && final_grade < 2) {
          gradeRanges['0-2']++;
        } else if (final_grade >= 2 && final_grade < 4) {
          gradeRanges['2-4']++;
        } else if (final_grade >= 4 && final_grade < 6) {
          gradeRanges['4-6']++;
        } else if (final_grade >= 6 && final_grade < 8) {
          gradeRanges['6-8']++;
        } else if (final_grade >= 8 && final_grade <= 10) {
          gradeRanges['8-10']++;
        }
      });

      // Create data for the pie chart
      const chartData = {
        labels: Object.keys(gradeRanges),
        datasets: [
          {
            data: Object.values(gradeRanges),
            backgroundColor: [
              'red',
              'yellowgreen',
              'lightgreen',
              'yellow',
              'green',
            ],
            borderWidth: 1,
          },
        ],
      };
 
      const chartConfig = {
        type: 'pie',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      };

      const pieChart = new Chart(chartContainer.current, chartConfig);
      return () => pieChart.destroy();
    }
  }, [data]);

  return (
    <div className='chart-container' style={{ height: '400px' }}>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default PieChart;