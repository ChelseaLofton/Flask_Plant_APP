const SensorButton = (props) => {
    console.log(props);
    return (
        <React.Fragment>
            <div>
                <button
                    key={`sensor-${props.id}`}
                    id={`sensors=${props.id}-button`}
                    onClick={() => props.onClick(props.id)}
                >
                    Sensor {props.id}
                </button>
            </div>
        </React.Fragment>
    );
};

function Sensor() {
    const [sensorIds, setSensorIds] = React.useState([]);
            const [sensorData, setSensorData] = React.useState(null);

    React.useEffect(() => {
        const url = '/sensors.json';
            fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setSensorIds(data);
            });
    }, []);

    const handleSensorClick = (sensorId) => {
                console.log(sensorId);
            const url = `/sensors/${sensorId}.json`;
            fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setSensorData(data);
            });
    };


            return (
            <React.Fragment>
                <h2> Sensor Data</h2>
                <div id="sensor-ids">
                    {sensorIds.map((sensorID) => (
                        <SensorButton id={sensorID} onClick={handleSensorClick} />
                    ))}
                </div>
                        <div>
                            <h4>Current Sensor Readings</h4>
                            {sensorData && <div id="sensor-data">
                                Conductivity: {sensorData.conductivity};
                                Illuminance: {sensorData.illuminance} lux;
                                Moisture: {sensorData.moisture}%;
                                Temperature: {sensorData.temperature} °F;
                                Battery: {sensorData.battery}%;
                            </div>}
                        </div>
        </React.Fragment>
            );
};













//function GenerateSensorButtons() {
//     const [sensorIds, setSensorIds] = React.useState([]);
//     const [sensorData, setSensorData] = React.useState(null);
//     const [chartData, setChartData] = React.useState(null);
//     const chartRef = React.useRef(null);

//     React.useEffect(() => {
//         const url = '/sensors.json';
//         fetch(url)
//             .then((response) => response.json())
//             .then((data) => {
//                 setSensorIds(data);
//             });
//     }, []);

//     const handleSensorClick = (sensorId) => {
//         console.log(sensorId);
//         const url = `/sensors/${sensorId}.json`;
//         fetch(url)
//             .then((response) => response.json())
//             .then((data) => {
//                 const sensorData = data.sensor_data;
//                 const readingsData = data.moisture_readings;

//                 console.log(readingsData)

//                 setSensorData(sensorData);
//                 setChartData(readingsData)
//             });
//     };


//     return (
//         <React.Fragment>
//             <h2> Sensor Data</h2>
//             <div id="sensor-ids">
//                 {sensorIds.map((sensorID) => (
//                     <button
//                         key={`sensor-${sensorID}`}
//                         id={`sensors=${sensorID}-button`}
//                         onClick={() => handleSensorClick(sensorID)}
//                     >
//                         Sensor {sensorID}
//                     </button>
//                 ))}
//             </div>
//             <div>
//                 <h4>Current Sensor Readings</h4>
//                 {sensorData && <div id="sensor-data">
//                     Battery: {sensorData.battery}%;
//                     Conductivity: {sensorData.conductivity};
//                     Illuminance: {sensorData.illuminance} lux;
//                     Moisture: {sensorData.moisture}%;
//                     Temperature: {sensorData.temperature} °F;
//                 </div>}
//             </div>
//             <div>
//                 <h4>Soil Moisture Chart</h4>
//                 {chartData && (
//                     <div>
//                         <Chart
//                             ref={chartRef}
//                             data={{
//                                 labels: chartData.map(entry => entry.created_at),
//                                 datasets: [
//                                     {
//                                         label: 'Soil Moisture',
//                                         data: chartData.map(entry => entry.moisture),
//                                         borderColor: 'rgba(75, 192, 192, 1)',
//                                         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                                         borderWidth: 2,
//                                     },
//                                 ],
//                             }}
//                             options={{
//                                 scales: {
//                                     x: {
//                                         title: {
//                                             display: true,
//                                             text: 'Time',
//                                         },
//                                     },
//                                     y: {
//                                         title: {
//                                             display: true,
//                                             text: 'Percentage',
//                                         },
//                                         min: 0,
//                                         max: 100,
//                                     },
//                                 },
//                             }}
//                         />
//                     </div>
//                 )}
//             </div>
//         </React.Fragment>
//     );
// };
