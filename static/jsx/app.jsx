
function App () {
    return (
        <div>

            <Plant />
            <Humidity />
            <Sensor  />
            <Outlets />

        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
