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
        <div>
            <div className="content-container"> 
                    
                <Plant />
                <Toolbox />
            </div>
            
            <ChartCarousel />
        </div>
    );
}
ReactDOM.render(<App />, document.getElementById('root'));


// Renders our carousel of charts
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

//Organizes our components into a tool box
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