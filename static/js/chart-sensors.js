fetch('/moisture-readings.json')
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson);
        const sensorData = responseJson.data;
        
        // Group the sensor data by day and hour
        const groupedData = sensorData.reduce((accumulator, current) => {
            const timestamp = new Date(current.created_at);
            const day = timestamp.toLocaleDateString();
            const hour = timestamp.getHours();
            if (!accumulator[day]) {
                accumulator[day] = {};
            }
            if (!accumulator[day][hour]) {
                accumulator[day][hour] = [];
            }
            accumulator[day][hour].push(current.moisture);
            return accumulator;
        }, {});

        // Create an array of labels for the x-axis
        const labels = [];
        for (let i = 0; i < 24; i++) {
            labels.push(`${i}:00`);
        }

        // Create an array of datasets for the chart
        const datasets = [];
        for (const day in groupedData) {
            const data = [];
            for (let i = 0; i < 24; i++) {
                const hourData = groupedData[day][i] || [];
                const average = hourData.reduce((accumulator, current) => accumulator + current, 0) / hourData.length;
                data.push(average);
            }
            datasets.push({
                label: day,
                data: data,
                borderColor: 'blue',
                fill: false,
            });
        }

        // Render the chart
        new Chart(document.querySelector('#line-time2'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets,
            },
            options: {
                scales: {
                    y: {
                        min: 0,
                        max: 100,
                    },
                },
            },
        });
    });
