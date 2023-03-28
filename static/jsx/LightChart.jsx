/**
 * Description:  This page displays a chart of light readings that are fetched from a database on the back end.
 * The data is visualized using the Chart.js library, and the chart is rendered using a React component called LightData.
 * 
 * Language: JavaScript (JSX)
 * Frameworks: React, Chart.js
 * Libraries: React Bootstrap
 * Databases: Back-end database
 * Components: LightData, LightChart
 */


// LightData component renders the chart of light readings
const LightData = (props) => {
    const sensorData = props.sensorData;
    const chartRef = React.createRef();

    React.useEffect(() => {
        if (sensorData) {
            const sensorIds = Object.keys(sensorData);
            
            const datasets = sensorIds.map((sensorId) => {
                const readings = sensorData[sensorId];

                return {
                    label: `Sensor ${sensorId}`,
                    data: readings.map((reading) => ({
                        x: new Date(reading.created_at),
                        y: reading.illuminance,
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


// LightChart component renders the chart of light readings
const LightChart = () => {
    const [sensorData, setSensorData] = React.useState(null);

    React.useEffect(() => {
        fetch("/light-readings.json")
            .then((response) => response.json())
            .then((data) => {
                setSensorData(data);
            });
    }, []);

    return (
        <React.Fragment>
            <h2>Light Readings</h2>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <LightData sensorData={sensorData} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
