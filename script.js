

//=================CRIMES TABLE==================

const table = document.getElementById('table1');

let json = []; // for all the data
let years = []; // for years data
let countries = []; // for countries data

// Push every year to array---------------

for (let y = 0; y < table.rows[1].cells.length - 2; y++) {
    years[y] = table.rows[1].cells[y + 2].innerHTML;
}

// Push every country to array ----------

for (let c = 0; c < table.rows.length - 2; c++) {
    countries[c] = table.rows[c + 2].cells[1].innerHTML.replace(/\W/gi, '');
}

// push data from year 2002 to each -----------------
for (let d = 0; d < table.rows.length - 2; d++) {
    let tableRow = table.rows[d + 2];
    let rowData = [];
    for (let k = 0; k < table.rows[2].cells.length - 2; k++) {
        rowData.push(tableRow.cells[k + 2].innerHTML);
    }
    json.push(rowData);
}

// API from Toast UI chart 

const container = document.getElementById('Crimes_et_d.C3.A9lits_enregistr.C3.A9s_par_les_services_de_police');
const data = {
    categories: years,
    series: []
};

// pass all the data

for (let i = 0; i < countries.length; i++) {
    let countryData = {};
    countryData.name = countries[i];
    countryData.data = json[i]
    data.series.push(countryData);
}

const options = {
    chart: {
        width: 950,
        height: 550,
        title: 'Crimes in Europe'
    },
    yAxis: {
        title: 'Number of Crimes in thousands',
    },
    xAxis: {
        title: 'Year',
        pointOnColumn: true,
        dateFormat: 'MM',
        tickInterval: 'auto'
    },
    series: {
        showDot: false,
        zoomable: true
    },
    tooltip: {
        suffix: 'thousands'
    }

};
const theme = {
    series: {
        colors: [
            '#83b14e', '#458a3f', '#295ba0', '#2a4175', '#289399',
            '#289399', '#617178', '#8a9a9a', '#516f7d', '#dddddd'
        ]
    }
};


const chart = tui.chart.lineChart(container, data, options);


// ===============HOMICIDE TABLE=========================

const homicideTable = document.getElementById('table2');

let homicideCountries = [];
let homicideJSON = [];


// get countries from table

for (let y = 0; y < homicideTable.rows.length - 1; y++) {
    homicideCountries[y] = homicideTable.rows[y + 1].cells[1].innerHTML;
}

// get homicide data

for (let d = 0; d < homicideTable.rows[1].cells.length - 2; d++) {
    let rowData = [];
    for (k = 0; k < homicideTable.rows.length - 1; k++) {
        let tableRow = homicideTable.rows[k + 1];
        rowData.push(tableRow.cells[d + 2].innerHTML);
    }
    homicideJSON.push(rowData);
}
// Homicide chart API from TOAST UI chart.

var homicideContainer = document.getElementById('Homicides');
var homicideData = {
    categories: homicideCountries,
    series: [
        {
            name: '2007-09',
            data: homicideJSON[0]
        },
        {
            name: '2010-12',
            data: homicideJSON[1]
        }
    ]
};
var homicideOptions = {
    chart: {
        width: 900,
        height: 2000,
        title: 'Homicides in Euroupe',
        format: '1,000'
    },
    yAxis: {
        title: 'Countries'
    },
    xAxis: {
        title: 'Number of Cases(per 100,000 inhabitants)',
        min: 0,
        max: 400,
        suffix: ''
    },
    series: {
        showLabel: true
    }
};
var theme1 = {
    series: {
        colors: [
            '#83b14e', '#458a3f', '#295ba0', '#2a4175', '#289399',
            '#289399', '#617178', '#8a9a9a', '#516f7d', '#dddddd'
        ]
    }
};

tui.chart.barChart(homicideContainer, homicideData, homicideOptions);


// ================LIVE CHART==============

const xData = [];
const yData = [];

fetch('https://canvasjs.com/services/data/datapoints.php')
    .then(response => response.json()
        .then(data => { // data is an array
            data.forEach((element) => {
                xData.push(element[0]);
                yData.push(element[1]);
            })
            updateData(); // add and update xData and yData into chartJS
            updateChart();
        }))

// fetch new data every second then push 1 pair (out of 10) into datasets.
const updateChart = () => {
    fetch('https://canvasjs.com/services/data/datapoints.php')
        .then(response => response.json()
            .then(data => {
                yData.push(data[5][1]); // 5 can be changed to any number within 0-9
                xData.push(xData.length);
                updateData(); // add and update xData and yData into chartJS
                setTimeout(function () { updateChart() }, 1000);
            }))
}

// every second a new array of data is fetched, new data is added and updated
const updateData = () => {
    chartJS.data.labels = xData;
    chartJS.data.datasets[0].data = yData;
    chartJS.update();
}

// Insert <canvas> into DOM

document.getElementById('firstHeading').insertAdjacentHTML('beforeend', "<canvas id='myChart'></canvas>");

// Chart.js line chart API

var ctx = document.getElementById('myChart').getContext('2d');
var chartJS = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: [],
        datasets: [{
            label: 'Crimes Statistics In Europe',
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'transparent',
            data: []
        }]
    },
    // Configuration options go here
    options: {}
});
// ==================END======================

