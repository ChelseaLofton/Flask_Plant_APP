

function App() {
    return (
        <div>
            <div className="content-container">  {/* Add a new flexbox container */}
                <div className="main-content-container">
                    <div id="main-content"></div>
                    
                    <Plant />
                </div>
                <Toolbox />
            </div>
            
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


function Toolbox() {
    return (
        <div className="toolbox-container">
            <div className="toolbox-group">
                <h2>Plant Library</h2>
                <PlantData />
            </div>
            <div className="toolbox-group">
                <h2>Plant Sensors</h2>
                <Sensor />
            </div>
            <div className="toolbox-group">
                <h2>Humidity Data</h2>
                <Humidity />
            </div>
            <div className="toolbox-group">
                <h2>Outlets States</h2>
                <Outlets />
            </div>
        </div>
    );
}