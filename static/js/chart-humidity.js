fetch('/humidity-readings.json')
    .then((response) => response.json())
    .then((responseJson) => {

        console.log(responseJson);

        const livingroomReadings = responseJson.livingroom.map((reading) => ({
            x: reading.date,
            y: reading.humidity,
        }));

        const propagationReadings = responseJson.propagation.map((reading) => ({
            x: reading.date,
            y: reading.humidity,
        }));

        console.log('Living Room Readings:', livingroomReadings);
        console.log('Propagation Readings:', propagationReadings);


        const data = {
            datasets: [
                {
                    label: 'Living Room',
                    data: [
                        { x: '2023-03-16T12:00:00', y: 50 },
                        { x: '2023-03-16T13:00:00', y: 55 },
                    ],
                    borderColor: 'yellow',
                    backgroundColor: 'rgba(255, 255, 0, 0.2)',
                },
                {
                    label: 'Propagation',
                    data: [
                        { x: '2023-03-16T12:00:00', y: 60 },
                        { x: '2023-03-16T13:00:00', y: 65 },
                    ],
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
                                hour: 'HH:mm'
                            }
                        }
                    }
                }
            }
        });
    });
