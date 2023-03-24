const MoistureData = (props) => {
    const sensorData = props.sensorData;
    const chartRef = React.createRef();

    React.useEffect(() => {
        if (sensorData) {
            const sensorIds = Object.keys(sensorData);

            // console.log(sensorIds)
            
            const datasets = sensorIds.map((sensorId) => {
                const readings = sensorData[sensorId];
                // console.log(sensorIds)
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

            const chartCanvas = chartRef.current;
            const chart = new Chart(chartCanvas, chartConfig);

            return () => {
                chart.destroy();
            };
        }
    }, [sensorData]);

    return <canvas ref={chartRef} />;
};

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
            <h2>Soil Moisture</h2>
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
