google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawRevChart);

// draw cash on cash chart
google.charts.setOnLoadCallback(drawCoCChart);

// draw terminal value chart
google.charts.setOnLoadCallback(drawValueChart);


// Build line of Rent, NOI, Expenses

rentChartHeader = ['Year', 'Rent', 'NOI', 'Expenses'];


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

// new chart 


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


//new chart  value



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
