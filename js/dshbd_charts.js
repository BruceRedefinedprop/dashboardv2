/*
dshbd_charts.js use Google Charts api to build bar and lines charts for the dashboard tab.

This module generate three charts 

+ revenue, expense and NOI (net operating income) line chart that defined financial
  result for the property calculated in dshbd_metrics.js.   NOI is revenue - expenses.
  
+ cash-on-cash bar chart that takes result calculated in dshbd_metrics.js and displays the
  results.  Cash-on-cash = (NOI - debt service) / (building cost + improvements)

+ terminal value bar chart that does the same thing, using terminal value calculation of
  NOI / terminal cap rate.  The terminal cap rate is defined on building tab.
  
All charts dynamically update as inputs on various tabs are changed.

*/

// load google charts and callback. 
google.charts.load('current', { 'packages': ['corechart'] });

//callback for revenue chart
google.charts.setOnLoadCallback(drawRevChart);

// callback for cash on cash chart
google.charts.setOnLoadCallback(drawCoCChart);

// callback for terminal value chart
google.charts.setOnLoadCallback(drawValueChart);


// set up headers of for Revenue line chart.  Year is on X axis and
// Rent, NOI and expenses are separte Y axis lines.

rentChartHeader = ['Year', 'Rent', 'NOI', 'Expenses'];

//  build an array that is used by google charts to draw the chart.
function rentChartArrayBuilder(header) {
  var chartData = [];
  chartData.push(header);
  for (i = 0; i < modelyears.length; i++) {
    var arrayRow = [];
    arrayRow[0] = modelyears[i].startDate;
    arrayRow[1] = modelRent[i];
    arrayRow[2] = modelNOI[i];
    arrayRow[3] = modelExpenses[i];
    chartData.push(arrayRow);

  }
  return chartData;
}

// build an array header and array used google charts to build cash-on-cash bar chart.

cashChartHeader =['Year','Cash-on-Cash %']

function cashArrayBuilder(header) {
  var chartData = [];
  chartData.push(header);
  for (i = 0; i < modelyears.length; i++) {
    var arrayRow = [];
    arrayRow[0] = modelyears[i].startDate;
    arrayRow[1] = modelCashonCash[i];
    chartData.push(arrayRow);
  }
  return chartData;
}


 // Using Google Chart recommended template code, draw the Revenue line chart.


function drawRevChart() {
  var rentChartArray = rentChartArrayBuilder(rentChartHeader);
  var data = google.visualization.arrayToDataTable(rentChartArray);

  var options = {
    title: 'Revenue and Expenses',
    curveType: 'function',
    legend: { position: 'bottom' },
    width: 800,
    height: 600
  };

  var chart = new google.visualization.LineChart(document.getElementById('rentChart'));

  chart.draw(data, options);
}

 

// draw the Cash-on-cash bar chart.


function drawCoCChart() {
  var cashChartArray = cashArrayBuilder(cashChartHeader);
  var data = google.visualization.arrayToDataTable(cashChartArray);

  var view = new google.visualization.DataView(data);

  var options = {
    title: "Cash-on-Cash Return %",
    width: 600,
    height: 400,
    bar: { groupWidth: "95%" },
    legend: { position: "none" },
  };
  var chart = new google.visualization.ColumnChart(document.getElementById("cashChart"));
  chart.draw(view, options);
}


//set up the bar chart header (x & y axis ) and data array for
// temrinal value bar chart.



ValChartHeader = ['Year', 'Est.Value'];


function ValueArrayBuilder(header) {
  var chartData = [];
  chartData.push(header);
  for (i = 0; i < modelyears.length; i++) {
    var arrayRow = [];
    arrayRow[0] = modelyears[i].startDate;
    arrayRow[1] = terminalVal[i];
    chartData.push(arrayRow);
  }
  return chartData;
}

//draw the terminal value bar chart.

function drawValueChart() {
  var ValChartArray = ValueArrayBuilder(ValChartHeader);
  var data = google.visualization.arrayToDataTable(ValChartArray);

  var options = {
    title: 'Terminal Value $',
    curveType: 'none',
    legend: { position: 'bottom' },
    width: 800,
    height: 600
  };

  var chart = new google.visualization.LineChart(document.getElementById('valChart'));

  chart.draw(data, options);
}
