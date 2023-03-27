

function App() {
    return (
        <div>
            <Plant />
            <Outlets />
            <PlantData />
            <Humidity />
            <Sensor />
            <ChartCarousel />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));



function ChartCarousel() {
    return (
        <div id="chartCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <MoistureChart />
                </div>
                <div className="carousel-item">
                    <HumidityChart />
                </div>
                <div className="carousel-item">
                    <LightChart />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#chartCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#chartCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}