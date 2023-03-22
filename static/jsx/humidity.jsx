const HumidityButton = (props) => {
    return (
        <React.Fragment>
            <div>
                <button
                    key={`humidity-${props.id}`}
                    id={`sensor=${props.id}-button`}
                    onClick={() => props.onClick(props.id)}
                >
                    {props.id}
                </button>
            </div>
        </React.Fragment>
    );
};


    function Humidity() {
        const [humidityIds, setHumidityIds] = React.useState([]);
        const [humidityData, setHumidityData] = React.useState(null);

        React.useEffect(() => {
            const url = '/humidity.json';
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    setHumidityIds(data);
                    // console.log(data);
                });
        }, []);

        const handleHumidityClick = (humidityId) => {
            // console.log(humidityId);
            const url = `/humidity/${humidityId}.json`;
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    setHumidityData(data);
                    // console.log(data);

                });
        };

        return (
            <React.Fragment>
                <h2> Humidity Sensor Data</h2>
                <div id="humidity-ids">
                    {humidityIds.map((humidityID) => (
                        <HumidityButton id={humidityID} onClick={handleHumidityClick} />
                ))}
                </div>
                    <div>
                        <h4>Current Humidity Sensor Readings</h4>
                        {humidityData && <div id="humidity-data">
                            Humidity:{humidityData.humidity}%;
                            Pressure:{humidityData.pressure};
                            Temperature: {humidityData.temperature}°F;
                            Battery: {humidityData.battery}%;
                        </div>}
                    </div>
            </React.Fragment>
        );
    };
