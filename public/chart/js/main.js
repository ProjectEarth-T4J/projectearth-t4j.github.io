import DATA from './progressiveLineData.js';

const ctx = document.getElementsByClassName('myChart')[0].getContext('2d');
const chart = new Chart(ctx, drawChart(getData()));

function range (n) {
  return [...Array(n).keys()];
}

function getData() {
  const rawData = DATA.trim().split("\n").map(line => line.split(","));
  const years = rawData.map(row => row[0]).slice(1);
  const labels = rawData[0];
  const COLORS = ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)',
    'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)',
    'rgb(165, 42, 42)', 'rgb(255, 20, 147)', 'rgb(0, 128, 0)'];
  const BCOLORS = ['rgba(255, 99, 132, 0.5)', 'rgba(255, 159, 64, 0.5)', 'rgba(255, 205, 86, 0.5)',
    'rgba(75, 192, 192, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(153, 102, 255, 0.5)', 'rgba(201, 203, 207, 0.5)',
    'rgba(165, 42, 42, 0.5)', 'rgba(255, 20, 147, 0.5)', 'rgba(0, 128, 0, 0.5)'];
  const datasets = range(rawData[0].length).slice(1).map(colIndex => Object.assign(
      {
        label: labels[colIndex],
        borderColor: COLORS[(colIndex-1)%COLORS.length],
        backgroundColor: BCOLORS[(colIndex-1)%COLORS.length],
        fill: false,
        radius : 0,
      }, {
        data: range(rawData.length).slice(1).map(rowIndex => rawData[rowIndex][colIndex]),
      }));
  return {
    years,
    datasets,
  };
}

function getAnimation(dataLength) {
  const totalDuration = 10000;
  const delayBetweenPoints = totalDuration / (dataLength * 5);
  const animation = {
    x: {
      type: 'number',
      from: NaN, // the point is initially skipped
      delay(ctx) {

        if (ctx.type !== 'data' || ctx.xStarted) {
          return 0;
        }
        ctx.xStarted = true;
        if (ctx.index === 1) return 10000;
        return ctx.index * delayBetweenPoints;
      },
    },
  };
  return animation;
}

function drawChart({years, datasets}) {
  const chartConfig = Object.assign({
    type: "line",
    data: {
      labels: years,
      datasets: datasets,
    }
  }, {
    options: {
      interaction: {
        intersect: false,
      },
      scales: {
        x: {
          type: 'linear',
          max: 2005,
          min: 1850,
        },
        y: {
          position: 'right',
          max: 288.75,
          min: 286.75,
        }
      },
      plugins: {
        title: {
          display: true,
          text: '지구온난화 요인별 기여도 분석 (1850 ~ 2005, \u2109)',
          font: {
            size: 20,
          },
          padding: {
            top: 10,
            bottom: 30,
          }
        },
        legend: {
          position: 'bottom',
        },

      }
    }
  });
  chartConfig.options.animation = getAnimation(chartConfig.data.datasets[0].data.length);
  return chartConfig;
}
