
function App () {
    return (
        <div>

            <Humidity />
            <Plant />
            <Sensor  />
            <Outlets />

        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
