const GenerateHumidityButtons = () => {
    const [humidityIds, setHumidityIds] = React.useState([]);
    const [humidityData, setHumidityData] = React.useState(null);

    React.useEffect(() => {
        const url = '/humidity.json';
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setHumidityIds(data);
                console.log(data);
            });
    }, []);

    const handleHumidityClick = (humidityId) => {
        console.log(humidityId);
        const url = `/humidity/${humidityId}.json`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setHumidityData(data);

            });
    };

    return (
        <React.Fragment>
            <h2> Humidity Sensor Data</h2>
            <div id="humidity-ids">
                {humidityIds.map((humidityID) => (
                    <div>
                        <button
                            key={`humidity-${humidityID}`}
                            id={`sensor=${humidityID}-button`}
                            onClick={() => handleHumidityClick(humidityID)}
                        >
                            {humidityID}
                        </button>
                    </div>
                ))}
            </div>
            <div>
                <h2>Current Humidity Sensor Readings</h2>
                {humidityData && <div id="humidity-data">
                    Humidity: {humidityData.humidity}
                    Pressure: {humidityData.pressure}
                    Temperature: {humidityData.temperature}
                    Battery: {humidityData.battery}
                </div>}
            </div>
        </React.Fragment>
    );
};
