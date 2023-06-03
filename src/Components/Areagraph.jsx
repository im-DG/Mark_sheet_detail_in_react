import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const AreaGraph = ({ data }) => {
  const chartContainer = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
     
      const ticketTopics = {};
      data.forEach(({ ticket_topic }) => {
        if (!ticketTopics[ticket_topic]) {
          ticketTopics[ticket_topic] = 1;
        } else {
          ticketTopics[ticket_topic]++;
        }
      });

      // Create data for the area graph
      const chartData = {
        labels: Object.keys(ticketTopics),
        datasets: [
          {
            label: 'Number of Students',
            data: Object.values(ticketTopics),
            fill: true,
           
            backgroundColor:'yellowgreen',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
            
          },
        ],
      };

      const chartConfig = {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Number of Students',
              },
            },
            x: {
              title: {
                display: true,
                text: 'Ticket Topic',
              },
            },
          },
        },
      };

      const areaGraph = new Chart(chartContainer.current, chartConfig);
      return () => areaGraph.destroy();
    }
  }, [data]);

  return (
    <div className='chart-container' style={{ height: '400px' }}>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default AreaGraph;
