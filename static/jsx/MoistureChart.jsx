/**
 * Description:  This page displays a chart of soil moisture sensor readings that are fetched from a database on the back end.
 * The data is visualized using the Chart.js library, and the chart is rendered using a React component called MoistureData.
 * 
 * Language: JavaScript (JSX)
 * Frameworks: React, Chart.js
 * Libraries: React Bootstrap
 * Databases: Back-end database
 * Components: MoistureData, MoistureChart
 */


// MoistureData component renders the chart of soil moisture sensor readings
const MoistureData = (props) => {
    const sensorData = props.sensorData;
    const chartRef = React.createRef();

    // Create a chart when there is sensor data 
    React.useEffect(() => {
        if (sensorData) {
            const sensorIds = Object.keys(sensorData);
            
            const datasets = sensorIds.map((sensorId) => {
                const readings = sensorData[sensorId];

                return {
                    label: `Sensor ${sensorId}`,
                    data: readings.map((reading) => ({
                        x: new Date(reading.created_at),
                        y: reading.moisture,
                    })),
                    borderColor: `hsl(${sensorId * (360 / sensorIds.length)}, 100%, 50%)`,
                    backgroundColor: `hsla(${sensorId * (360 / sensorIds.length)}, 100%, 50%, 0.2)`,
                };
            });

            const data = {
                datasets: datasets,
            };

            const chartConfig = {
                type: "line",
                data: data,
                options: {
                    scales: {
                        x: {
                            type: "time",
                            time: {
                                unit: "day",
                                displayFormats: {
                                    hour: "HH:mm",
                                    day: "MMM D",
                                },
                            },
                        },
                    },
                },
            };

            // Create the chart
            const chartCanvas = chartRef.current;
            const chart = new Chart(chartCanvas, chartConfig);

            return () => {
                chart.destroy();
            };
        }
    }, [sensorData]);

    return <canvas ref={chartRef} />;
};


// MoistureChart component renders the chart of soil moisture sensor readings
const MoistureChart = () => {
    const [sensorData, setSensorData] = React.useState(null);

    React.useEffect(() => {
        fetch("/soil-moisture-readings.json")
            .then((response) => response.json())
            .then((data) => {
                setSensorData(data);
            });
    }, []);

    return (
        <React.Fragment>
            <div className="text-center">
                <h2>Soil Moisture</h2>
                <p>This chart shows soil moisture readings for sensors from the last 24 hours, taken in 5 minute intervals.</p>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <MoistureData sensorData={sensorData} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
