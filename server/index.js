const nuro    = require('../scripts/nuro-script');

const Papa    = require('papaparse');
const axios   = require('axios');
const express = require('express')
const fs      = require('fs')
const path    = require('path');
const app     = express()

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../views"));

app.use(express.static('public'))

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')));

app.get('/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  let report;

  fs.readFile('database/nuro-mail-parser.csv', 'utf8', (err, data) => {
    if (err) throw err;
    let results = Papa.parse(data, { header: true });
    let detailedReportURL;

    results.data.forEach(element => {
      if (taskId === element['Task ID']) detailedReport = element['Detailed Report'];    
    });

    let reportToBeParsed = axios.get(detailedReport);

    reportToBeParsed.then(data => {
      report = nuro(data.data);

      res.render('table', {
        report: report
      });
    });
  })
});

app.listen(8080, console.log('listening on server localhost:8080'));