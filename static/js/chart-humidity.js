fetch('/humidity-readings.json')
    .then((response) => response.json())
    .then((responseJson) => {

        console.log(responseJson);

        const livingroomData = responseJson.filter((reading) => reading.humidity_sensor_id === 'livingroom');
        const propagationData = responseJson.filter((reading) => reading.humidity_sensor_id === 'propagation');

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

        new Chart(document.querySelector('#line-time'), {
            type: 'line',
            data: data,
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'hour',
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
