/**
 * Description:  This page displays a chart of atmospheric humidity readings that are fetched from a database on the back end.
 * The data is visualized using the Chart.js library, and the chart is rendered using a React component called HumidityData.
 * 
 * Language: JavaScript (JSX)
 * Frameworks: React, Chart.js
 * Libraries: React Bootstrap
 * Databases: Back-end database
 * Components: HumidityData, HumidityChart
 */


// HumidityData component renders the chart of atmospheric humidity readings
const HumidityData = (props) => {
    const sensorData = props.sensorData;
    const chartRef = React.createRef();

    React.useEffect(() => {
        if (sensorData) {
            const sensorIds = Object.keys(sensorData);
            // console.log(sensorIds);

            const datasets = sensorIds.map((sensorId, index) => {
                const readings = sensorData[sensorId];
                const label = sensorId === 'livingroom' ? 'Living Room' : 'Propagation';
                const borderColor = `hsl(${index * (360 / sensorIds.length)}, 100%, 50%)`;
                const backgroundColor = `hsla(${index * (360 / sensorIds.length)}, 100%, 50%, 0.2)`;
                

                return {
                    label: label,
                    data: readings.map((reading) => ({
                        x: new Date(reading.created_at),
                        y: reading.humidity,
                    })),
                    borderColor: borderColor,
                    backgroundColor: backgroundColor,
                    pointStyle: 'circle', 
                };
            });

            const data = { datasets };

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
                    plugins: {
                        legend: {
                            position: "right",
                            align: "start",
                            labels: {
                                usePointStyle: true,
                                pointStyle: "circle",
                            },
                        },
                    },
                    layout: {
                        padding: {
                            right: 10, // adjust as needed
                        },
                    },
                },
            };


            const chartCanvas = chartRef.current;
            const chart = new Chart(chartCanvas, chartConfig);

            return () => {
                chart.destroy();
            };
        }
    }, [sensorData]);

    return <canvas ref={chartRef} />;
};


// HumidityChart component renders the chart of atmospheric humidity readings
const HumidityChart = () => {
    const [sensorData, setSensorData] = React.useState(null);

    React.useEffect(() => {
        fetch("/humidity-readings.json")
            .then((response) => response.json())
            .then((data) => {
                setSensorData(data)
            });
    }, []);

    return (
        <React.Fragment>
            <div className="text-center">
                <h2>Atmospheric Humidity Data by Location</h2>
                <p>This chart is showing atmospheric humidity readings for two different locations from the last 24 hours, taken in 5 minute intervals.</p>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <HumidityData sensorData={sensorData} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
