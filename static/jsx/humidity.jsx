
const GenerateHumidityButtons = () => {
    const [humidityIds, setHumidityIds] = React.useState([]);

    React.useEffect(() => {
        const url = '/humidity.json';
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setHumidityIds(data);
            });
    }, []);

    const handleHumidityClick = (humidityId) => {
        console.log(humidityId);
        const url = `/humidity/${humidityId}.json`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const sensor_humidity = data.humidity;
                const sensor_pressure = data.pressure;
                const sensor_temperature = data.temperature;
                const sensor_battery = data.battery;
                const humidityDataElement = document.getElementById('humidity-data');
                if (humidityDataElement) {
                    humidityDataElement.innerHTML = `Humidity: ${sensor_humidity}%, Pressure: ${sensor_pressure}, Temperature: ${sensor_temperature}°F, Battery: ${sensor_battery}%`;
                }
            });
    };


    return (
        <div id="humidity-ids">
            {humidityIds.map((humidityID) => (
                <button
                    key={`humidity-${humidityID}`}
                    id={`sensor=${humidityID}-button`}
                    onClick={() => handleHumidityClick(humidityID)}
                >
                    {humidityID}
                </button>
            ))}
        </div>
    );
};



ReactDOM.render(<GenerateHumidityButtons />, document.getElementById('humidity-ids'));