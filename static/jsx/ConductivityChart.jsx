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
const ConductivityData = (props) => {
    const { sensorData } = props;
    const chartRef = React.createRef();

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
                        y: reading.conductivity,
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




// LightChart component renders the chart of light readings
const ConductivityChart = () => {
    const [sensorData, setSensorData] = React.useState(null);

    React.useEffect(() => {
        fetch("/conductivity-readings.json")
            .then((response) => response.json())
            .then((data) => {
                setSensorData(data);
                console.log(data);
            });
    }, []);

    return (
        <React.Fragment>
            <div id="conductivity-chart-container">
            <div className="text-center">
                <h2>Conductivity Readings</h2>
                <p>Conductivity readings to read available nutrients in soil, taken in 5 minute intervals. <
                    br /> Click the sides of the charts to view more!</p>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        {sensorData && (
                        <ConductivityData 
                        sensorData={sensorData.conductivity_readings} 
                        plantIds={sensorData.plant_ids} />
                        )}
                    </div>
                </div>
            </div>
            </div>
        </React.Fragment>
    );
};


