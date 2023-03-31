/**
 * Description: This file contains several React components that are used to display a dashboard for monitoring plant health. 
 * The main App component renders the Plant and Toolbox components, as well as a ChartCarousel component that displays line charts for 
 * soil moisture, humidity, and light levels. The ChartCarousel component uses the Chart.js library to render the charts, and the carousel 
 * functionality is provided by the Bootstrap framework. The Toolbox component contains several sub-components that display information 
 * about the plant library, plant sensors, humidity data, and the state of the outlets controlling the environment.
 * 
 * Language: JavaScript (JSX)
 * Frameworks: React, Bootstrap, Chart.js
 * Components: App, ChartCarousel, MoistureChart, HumidityChart, LightChart, Toolbox, PlantData, Sensor, Humidity, Outlets
 */


// Main App component
function App() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-8 col-md-12">
                    <div className="row">
                        <div className="col-12">
                            <Plant />
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-8 mx-auto">
                    <Toolbox />
                </div>
            </div>
            <div className="row">
                <div className="col-10 mx-auto">
                    <ChartCarousel />
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));



// Renders our carousel of charts
function ChartCarousel() {
    return (
        <div id="chartCarousel" className="carousel carousel-dark slide" data-bs-ride="false" data-bs-interval="false">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <MoistureChart />
                </div>
                <div className="carousel-item">
                    <HumidityChart />
                </div>
                <div className="carousel-item">
                    <ConductivityChart />
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



//Organizes our components into a tool box
function Toolbox() {
    return (
        <div className="toolbox-container">
            <div className="toolbox-group">
                <h2>Plant Sensors</h2>
                <Sensor />
            </div>
            <div className="toolbox-group">
                <h2>  Humidity Data</h2>
                <Humidity />
            </div>
            <div className="toolbox-group">
                <h2>Outlet States</h2>
                <Outlets />
            </div>
            <div className="toolbox-group">
                <h2>Plant Library</h2>
                <PlantData />
            </div>
        </div>
    );
}