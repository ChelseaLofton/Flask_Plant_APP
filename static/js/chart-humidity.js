fetch('/humidity-readings.json')
    .then((response) => response.json())
    .then((responseJson) => {

        console.log(responseJson);

        const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const livingroomData = responseJson.filter((reading) => reading.humidity_sensor_id === 'livingroom' && new Date(reading.created_at) >= last24Hours);
        const propagationData = responseJson.filter((reading) => reading.humidity_sensor_id === 'propagation' && new Date(reading.created_at) >= last24Hours);

        console.log(last24Hours);
        console.log('Living Room:', livingroomData);
        console.log('Propagation:', propagationData);

        const livingroomReadings = livingroomData.map((reading) => ({
            x: reading.created_at,
            y: reading.humidity,
        }));

        const propagationReadings = propagationData.map((reading) => ({
            x: reading.created_at,
            y: reading.humidity,
        }));

        console.log('Living Room Readings:', livingroomReadings);
        console.log('Propagation Readings:', propagationReadings);

        const data = {
            datasets: [
                {
                    label: 'Living Room',
                    data: livingroomReadings,
                    borderColor: 'yellow',
                    backgroundColor: 'rgba(255, 255, 0, 0.2)',
                },
                {
                    label: 'Propagation',
                    data: propagationReadings,
                    borderColor: 'green',
                    backgroundColor: 'rgba(0, 255, 0, 0.2)',
                },
            ],
        };

        new Chart(document.querySelector('#humidity-chart'), {
            type: 'line',
            data: data,
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day',
                            displayFormats: {
                                hour: 'HH:mm',
                                day: 'MMM D'
                            }
                        }
                    }
                }
            }
        });
    });
