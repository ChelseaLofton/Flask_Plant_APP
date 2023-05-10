/**
 * Description: Humidity component renders humidity sensor buttons and displays live sensor readings in a modal
 * 
 * Language: JavaScript (JSX)
 * Frameworks: React
 * Libraries: React Bootstrap
 * APIS: Home Assistant
 * Components: HumidityModal, HumidityButton, Humidity
 */



// HumidityModal component displays live sensor readings in a modal
// const HumidityModal = (props) => {
//     const { humidityData, showModal, selectedHumidityId, handleClose } = props;
//     const displayName = getNameForId(selectedHumidityId);

//     return (
//         <div
//             className={`modal fade ${showModal ? "show" : ""}`}
//             tabIndex="-1"
//             aria-hidden={!showModal}
//             style={{ display: showModal ? "block" : "none" }}
//         >
//             <div class="modal-dialog modal-sm">
//                 <div className="modal-content">
//                     <div className="modal-header">
//                         <h2 className="modal-title">{displayName} Atmospheric Humidity</h2>

//                         <button type="button" className="btn-close" onClick={handleClose}></button>
//                     </div>
//                     <div className="modal-body">
//                         {humidityData && (
//                             <div id="plant-sensor-data">
//                                 <ul>
//                                     <li>Humidity: {humidityData.humidity}%</li>
//                                     <li>Pressure: {humidityData.pressure}</li>
//                                     <li>Temperature: {humidityData.temperature}°F</li>
//                                     <li>Battery: {humidityData.battery}%</li>
//                                 </ul>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };


// HumidityButton component renders individual humidity sensor buttons
// const HumidityButton = (props) => {
//     const displayName = getNameForId(props.id);
//     return (
//         <button
//             key={`humidity-${props.id}`}
//             id={`sensor=${props.id}-button`}
//             className="humidity-button"
//             onClick={() => props.onClick(props.id)}
//         >
//             {displayName}
//         </button>
//     );
// };

function getNameForId(id) {
    switch (id) {
        case 'livingroom':
            return 'Living Room';
        case 'propagation':
            return 'Propagation Tent';
        // add more cases for other ids as needed
        default:
            return id;
    }
}


function Humidity() {
    const [humidityIds, setHumidityIds] = React.useState([]);
    const [humidityData, setHumidityData] = React.useState({});
    const [showModal, setShowModal] = React.useState(false);
    const [selectedHumidityId, setSelectedHumidityId] = React.useState(null);

    // Fetch humidity sensor IDs and data from API
    React.useEffect(() => {
        const url = "/humidity.json";
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setHumidityIds(data);
                const humidityDataPromises = data.map((humidityId) => {
                    const humidityDataUrl = `/humidity/${humidityId}.json`;
                    return fetch(humidityDataUrl)
                        .then((response) => response.json())
                        .then((data) => ({ [humidityId]: data }));
                });
                Promise.all(humidityDataPromises).then((sensorData) => {
                    const mergedSensorData = Object.assign({}, ...sensorData);
                    setHumidityData(mergedSensorData);
                    setSelectedHumidityId(data[0]);
                });
            });
    }, []);

    // Handle click event on a humidity sensor button
    // const handleHumidityClick = (humidityId) => {
    //     const url = `/humidity/${humidityId}.json`;
    //     // console.log(humidityId);
    //     fetch(url)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setHumidityData(data);
    //             setSelectedHumidityId(humidityId);
    //             setShowModal(true);
    //         });
    // };

    // // Handle closing the modal 
    // const handleClose = () => {
    //     setShowModal(false);
    // };

    return (
        <React.Fragment>
            {humidityIds.map((humidityId) => (
                <div key={humidityId} className="humidity-item">
                    <h2>{getNameForId(humidityId)} Atmospheric Humidity</h2>
                    {humidityData[humidityId] && (
                        <ul>
                            <li>Humidity: {humidityData[humidityId].humidity}%</li>
                            <li>Pressure: {humidityData[humidityId].pressure}</li>
                            <li>Temperature: {humidityData[humidityId].temperature}°F</li>
                            <li>Battery: {humidityData[humidityId].battery}%</li>
                        </ul>
                    )}
                </div>
            ))}
        </React.Fragment>
    );
}





