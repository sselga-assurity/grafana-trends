const express = require('express');
const app = express();
const port = 8888;

// FIX LATER

const { influxdb_instance, writePoints } = require('./influxdb');

app.get('/', (req, res) => {

    const randomWorkflows = [
        'API Tests',
        'Build Challenge Tests',
        'Business Rule Tests',
        'Daily Runs',
        'E2E Tests',
        'Merged PR Runs',
        'Mobile Channel',
        'Pre-Production Business Rules',
        'Unstable Features',
        'Voice Channel',
        'Web Channel'
    ];

    const randomStatuses = [
        'Passed',
        'Failed',
        'Aborted'
    ];

    const currentDate = new Date();

    const randomWorkflowIndex = Math.floor(Math.random() * randomWorkflows.length);
    const randomStatusIndex = Math.floor(Math.random() * randomStatuses.length);

    const randomWorkflow = randomWorkflows[randomWorkflowIndex];
    const randomStatus = randomStatuses[randomStatusIndex];

    const dataConfig = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const currentDateString = currentDate.toLocaleString('en-US', dataConfig).replace(/\//g, '-');

    res.send('Workflow ' + randomWorkflow + ' ' + randomStatus + ' at ' + currentDateString);

    writePoints(randomWorkflow, randomStatus, currentDateString);

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// goals
// separate the influxdb instance creation
// create functions for writing points
// create unit tests