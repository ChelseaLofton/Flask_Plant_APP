/**
 * Description:  This page displays a chart of soil moisture readings that are fetched from a database on the back end.
 * The data is visualized using the Chart.js library.
 * 
 * Language: JavaScript (JSX)
 * Frameworks: React, Chart.js
 * Libraries: React Bootstrap
 * Databases: Back-end database
 * Components: MoistureData, MoistureChart
 */


// MoistureData component renders the chart of soil moisture sensor readings
const MoistureData = (props) => {
    const { sensorData } = props;
    const chartRef = React.createRef();

    // Create a chart when there is moisture data 
    React.useEffect(() => {
        if (sensorData) {
            const sensorIds = Object.keys(sensorData);
            const plantIds = props.plantIds;
            const datasets = sensorIds.map((sensorId) => {
                const readings = sensorData[sensorId];
                const plantId = plantIds[sensorId];

                return {
                    label: plantId ? ` ${plantId}` : `Sensor ${sensorId}`,
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
                type: 'line',
                data: data,
                options: {
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'hour',
                                tooltipFormat: 'MMM d, h a',
                                displayFormats: {
                                    hour: 'MMM d, h a'
                                },
                            },
                            ticks: {
                                source: 'data'
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            position: 'bottom',
                            align: 'start',
                            labels: {
                                usePointStyle: true,
                                pointStyle: 'circle',
                            },
                        },
                    },

                    layout: {
                        padding: {
                            right: 10,
                            bottom: 50
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
    }, [sensorData, props.plantIds]);

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
            <div id="moisture-chart-container">
            <div className="text-center">
                <h2>Soil Moisture</h2>
                <p>Soil moisture readings taken in 5 minute intervals.<
                    br />Click the sides of the charts to view more!</p>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col">
                        {sensorData && (
                            <MoistureData
                                sensorData={sensorData.moisture_readings}
                                plantIds={sensorData.plant_ids}
                            />
                        )}
                    </div>
                </div>
            </div>
            </div>
        </React.Fragment>
    );
};
