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
                };
            });

            const data = { datasets };

            const chartConfig = {
                type: 'line',
                data: data,
                options: {
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'day',
                                displayFormats: {
                                    hour: 'HH:mm',
                                    day: 'MMM D',
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
            <h2>Location Humidity Data</h2>
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
