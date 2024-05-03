const Influx = require('influx');

const influxdb_instance = new Influx.InfluxDB({
    host: 'localhost',
    port: 8086,
    database: "demo_metrics",
    username: "admin",
    password: "123qweasd",
    schema: [
        {
            measurement: 'sample',
            fields: {
                random_workflow: Influx.FieldType.STRING,
                random_status: Influx.FieldType.STRING,
                current_date: Influx.FieldType.STRING
            },
            tags: [
                'random_workflow',
                'random_status',
                'current_date'
            ]
        }
    ]
});

// function writePoints(random_number) {
    function writePoints(random_workflow, random_status, current_date) {
    influxdb_instance.writePoints([
        {
            measurement: 'sample',
            tags: {
                random_workflow: random_workflow,
                random_status: random_status,
                current_date: current_date
            },
            fields: {
                random_workflow: random_workflow,
                random_status: random_status,
                current_date: current_date
            }
        }
    ]);
}

module.exports = {influxdb_instance, writePoints};