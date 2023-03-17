// get the data from the server
fetch('/moisture-readings.json')
    .then(response => response.json())
    .then(data => {
        // group the data by sensor ID
        const groupedData = groupDataBySensorId(data);
        // create a chart for each sensor
        Object.entries(groupedData).forEach(([sensorId, readings]) => {
            createChart(sensorId, readings);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// function to group the data by sensor ID
function groupDataBySensorId(data) {
    const groupedData = {};
    data.forEach(reading => {
        const sensorId = reading.sensor_id;
        if (!groupedData[sensorId]) {
            groupedData[sensorId] = [];
        }
        groupedData[sensorId].push(reading);
    });
    return groupedData;
}

// function to create a chart for a given sensor
function createChart(sensorId, data) {
    const labels = [];
    const values = [];
    data.forEach(reading => {
        const date = new Date(reading.created_at);
        const label = `${date.getDate()}/${date.getMonth() + 1}`;
        const value = reading.moisture;
        labels.push(label);
        values.push(value);
    });
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: `Sensor ${sensorId}`,
                data: values,
                borderColor: randomColor(),
                fill: false
            }
        ]
    };
    const chartOptions = {
        title: {
            display: true,
            text: `Moisture Readings for Sensor ${sensorId}`
        },
        scales: {
            xAxes: [{
                type: 'category',
                labels: labels
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };
    const chartConfig = {
        type: 'line',
        data: chartData,
        options: chartOptions
    };
    const chartCanvas = document.createElement('canvas');
    document.body.appendChild(chartCanvas);
    new Chart(chartCanvas, chartConfig);
}
