/** 
 * Description: This file contains the React components to query the PlantBook API.
 * 
 * Language: JavaScript (JSX)
 * Frameworks: React
 * Libraries: React Bootstrap
 * APIs: Open PlantBook API
 * Components: PlantDataModal, PlantForm, PlantData
 */


// PlantDataModal component displays plant library data in a modal
const PlantDataModal = (props) => {
    const { showModal, handleClose, plantData } = props;
    // console.log(plantData);

    return (
        <div className={`modal fade ${showModal ? "show" : ""}`} tabIndex="-1" aria-hidden={!showModal} style={{ display: showModal ? "block" : "none" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title" style={{ fontWeight: "bold" }}>Open PlantBook Library</h2>


                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        {plantData && (
                            <div id="plantbook-data">
                                <h3>Tolerances and Classifications</h3>
                                <ul style={{ listStyleType: "disc" }}>
                                    <li>Alias: {plantData.alias}</li>
                                    <li>Category: {plantData.category}</li>
                                    <li>Max Light: {plantData.max_light_lux}lux</li>
                                    <li>Min Light: {plantData.min_light_lux}lux</li>
                                    <li>Max Temperature: {plantData.max_temp}°F</li>
                                    <li>Min Temperature: {plantData.min_temp}°F</li>
                                    <li>Max Env. Humidity: {plantData.max_env_humid}%</li>
                                    <li>Min Env. Humidity: {plantData.min_env_humid}%</li>
                                    <li>Max Soil Moisture: {plantData.max_soil_moist}%</li>
                                    <li>Min Soil Moisture = {plantData.min_soil_moist}%</li>
                                    <li>Max Soil EC: {plantData.max_soil_ec}uS/cm</li>
                                    <li>Min Soil EC: {plantData.min_soil_ec}uS/cm</li>
                                </ul>
                                <img src={plantData.image_url} alt={plantData.alias} style={{ height: "200px", width: "200px" }} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


// PlantForm component renders the form to query the PlantBook API
const PlantForm = (props) => {
    const { onSubmit, pid, handleChange } = props;
    // console.log(pid)

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="plant-input">Use a scientific plant name to search Open PlantBook <br />  Examples: <br /> (philodendron erubescens, alocasia macrorrhizos) </label>
            <input
                id="plant-input"
                type="text"
                value={pid}
                onChange={handleChange}
            />
            <button type="submit">Submit</button>
        </form>
    );
};



function PlantData() {
    const [showModal, setShowModal] = React.useState(false);
    const [pid, setPid] = React.useState("");
    const [plantData, setPlantData] = React.useState(null);
    // console.log(plantData);

    // Handle change in input field
    const handleChange = (event) => {
        setPid(event.target.value);
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("/plantbook-query", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pid: pid }),
        });
        const data = await response.json();

        if (data.errors && data.type === "client_error") {
            console.log("API error:", data.errors);
        } else {
            setPlantData(data);
            setShowModal(true);
        }
    };

    // Handle closing modal
    const handleClose = () => {
        setShowModal(false);
    };
    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <PlantForm onSubmit={handleSubmit} pid={pid} handleChange={handleChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <PlantDataModal
                            showModal={showModal}
                            handleClose={handleClose}
                            plantData={plantData}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}



