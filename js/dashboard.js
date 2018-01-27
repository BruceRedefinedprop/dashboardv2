/* The Dashboard module main program the updates to index.html to add and change 
   information about a real estate investment including  details:

 ++  about the building size and locaiton
 ++  it's tenants and rent the they pay
 ++  operating expenses
 ++  financing
 
 It also controls the refreshing of all performance metrics and creation of Dashboard 
 graphs that display various performance metrics.
 
 Key funtionality of this module is:
 
 ++  controls for sub-menu
 ++  enables the display various data contexts and initiates the buildng of dashboard graphs
 ++  resets data on web page and the application to it's initial values defined create_data.js.
 ++  when an input field on index.hmtl is changed, jquery is used recognize the change update
     appropriate array and / or object.   This function also redisplays the data in formated text.
 ++  functions to take stored values and display on each context tab
 ++  XMLHttpRequest code to retrieve the value of the US treasury bond.

*/




/* __________________________________________________________________________
  Sub-Menu controls -   the submenu controls the apparence of information on the 
  user's web wapge.   The main application, right now, displays hard coded data and graphical 
  dashboard.  The web page, index.htlm, when loaded builds  the html framework for each section.
  Dashboard.js uses Jquery to load data into the webpage.   
  
  The submenu controls are used to switch between page contexts. The set of tabs for building, tenants,
  expenses and financing control the display of data for each context JQuery controls are used to 
  show and hide each appropriate section of the index.html page.
  
  When dashboard tab is selected, key performance metrics are updated based ony data changes 
  and graphs dynamically created.  The peformance metrics are defined and calcualted using functions from
  dsshbd_metrics.js.  The graphs are generated using functions dskbd_charts.js.
 _______________________________________________________________________________
*/

// displays the building context, hides all others

$('#nav-submenu li.nav-building').click(function() {
    $('#building').css('display', 'block');
    $('#tenant').css('display', 'none');
    $('#expenses').css('display', 'none');
    $('#loan').css('display', 'none');
    $('#dashboard').css('display', 'none');

})


// diplays the tenant context, hides all other.

$('#nav-submenu li.nav-tenants').click(function() {
    $('#building').css('display', 'none');
    $('#tenant').css('display', 'block');
    $('#expenses').css('display', 'none');
    $('#loan').css('display', 'none');
    $('#dashboard').css('display', 'none');
})

// diplays the expenses context, hides all other.

$('#nav-submenu li.nav-expenses').click(function() {
    $('#building').css('display', 'none');
    $('#tenant').css('display', 'none');
    $('#expenses').css('display', 'block');
    $('#loan').css('display', 'none');
    $('#dashboard').css('display', 'none');
})


// diplays the loan context, hides all other.

$('#nav-submenu li.nav-loan').click(function() {
    $('#building').css('display', 'none');
    $('#tenant').css('display', 'none');
    $('#expenses').css('display', 'none');
    $('#loan').css('display', 'block');
    $('#dashboard').css('display', 'none');
})

/*
set up event listenerns for the tab button is clicked.  When the event is fired,  
the selected dashboard context is displayed and hides all others.
rebuild summary data arrays based on user generated changes to the data.
The summary data arrays and functions used to update these arrays are defined in dshbd_metrics.js
finally graphs are generated using frunctions draw... from dshbd_charts.js.
*/

$('#nav-submenu li.nav-dashboard').click(function() {
    $('#building').css('display', 'none');
    $('#tenant').css('display', 'none');
    $('#expenses').css('display', 'none');
    $('#loan').css('display', 'none');
    $('#dashboard').css('display', 'block');
    
    modelyears = buildModelYears(MODEL_YEARS);
    modelRent = buildModelRent();
    modelExpenses = buildModelExpenses();
    modelNOI = buildModelNOI();
    modelCashonCash = buildCoC();
    terminalVal = buildTerminalValue();
    
    drawRevChart();
    drawCoCChart();
    drawValueChart();
});


/*
___________________________________________________
Each of the data on the index.html page (building, tenants, expenses and financing) has
reset buttons that for a particular context restores initial data defined in create_data.js.  
just for that context.  Right now that initial data values are hardcoded, but will mostly likely
become dyanamically loaded from database in future versions of this program and later in the course.
_____________________________________________________
*/

// buildTenantRentTbl(0);

/*  
Resets building data to original state. 
A copy of the hardcode data for the buildng, bldgDiversey (defined in create_data.js)
is created and data reset using setBuildingHtml() defined in this module.  This code can placed
here because function hoisting.  Also, the set button won't be pressed until the entire program
is loaded anyway.
*/

$('#building .resetbtn').click(function() {
    backupBldg = new Building();
    current_building = Object.assign({}, bldgDiversey);
    setBuildingHtml(current_building);

});

/*
Resets tenant data to original state.   tenants is an array, while each array
element is tenants ojbect.    The index.html has a dropdown box of all tenants that is 
used to display that tenant's rent table.   Jquery is used to first clear that html select box
then buildSelect function is used to rebuild select box.  In the future, their will a function to
add new tenants, so the select box will need to be repopulated. The buildSelect function is defined 
editableTable.js.
*/

$('#tenant .resetbtn').click(function() {
    for (var i = 0; i < tenants.length; i++) {
        tenants[i].name = baseline_tenants[i].name;
        tenants[i].unit_size = baseline_tenants[i].unit_size;
        tenants[i].rents = baseline_tenants[i].rents;
    }
    $('#tenantListdpdwn option').remove()
    buildSelect('#tenantListdpdwn', tenants);
    buildTenantRentTbl(0);
});

/*
The current expenses object properties are reset to initial values
and buildExpTab function updates the htlm.    Note that only expenses growth
property can be edited.  In the future table will be editable and new expenses will be able
to added, deleted or their names changed.
*/

$('#expenses .resetbtn').click(function() {
    // expenses.growth = baseline_expenses.growth;
    for (var property in baseline_expenses) {
        console.log(property);
        expenses[property] = baseline_expenses[property];
    }
    buildExpTab((expenses.growth));
});

// resets loan data and rebuilds that section of the index.html.

$('#loan .resetbtn').click(function() {
     
    for (var property in baseline_loan) {
        console.log(property);
        divLoan[property] = baseline_loan[property];
    }
    setLoanHtml(divLoan);
     
});

/*
---------------------------------------------------------------
For input on the index.html, event handlers are created that fire when that field is changed.
In order to ensure input field results are diplayed in proper format  such as commas for
large numbers and currency with comma and $ sign, all input file are text and numeral.js and data.js are used 
to format data as a strings for display and convert the input values to back to numbers and dates.
________________________________________________________________
*/

// On tenant tab, when a tenant is selected the rent table is for that tenant is created.
// buidTenantRentTbl function is defined below.

$('#tenantListdpdwn').change(function() {
    var tntIdx = Number($('#tenantListdpdwn').val());
    buildTenantRentTbl(tntIdx);
});


// on tenant tab, on a change, the tenant unit value is saved.
// and the display text is reformated.  

$('#tenantSize').change(function() {
    var tntIdx = Number($('#tenantListdpdwn').val());
    var size = $('#tenantSize').val();
    tenants[tntIdx].unit_size = (numeral(size)._value);
    $('#tenantSize').val(numeral(size).format('0,0'));
});

// on the expense tab, on a change, the new expanses growth rate is
//stored and display text is reformated to display as a %

$('#expGrw').change(function() {
    var rate = $('#expGrw').val();
    expenses.growth = (numeral(rate)._value);
    $('#expGrw').val(numeral(rate).format('0.0%'));
});

// on the loan tab, on a change, the new bank who has provided financing  is
//stored.

$('#loanBank').change(function() {
    current_loan.bank = $('#loanBank').val();
});

// on the loan tab, on a change, the new loan value  is
//stored and display text is reformated to display as a currency.

$('#loanAmount').change(function() {
    var loan = $('#loanAmount').val();
    current_loan.loan = numeral(loan)._value;
    $('#loanAmount').val(numeral(loan).format('$0,0'));
});

// on the loan tab, on a change, the new loan term in years is
//stored.

$('#loanTerm').change(function() {
    current_loan.term = $('#loanTerm').val();
});

// on the loan tab, on a change, the new loan interest rate  is
//stored and display text is reformated to display as a percentage.

$('#loanRate').change(function() {
    var rate = $('#loanRate').val();
    current_loan.rate = (numeral(rate)._value) ;
    $('#loanRate').val(numeral(rate).format('0.0%'));
});

// on the loan tab, on a change, the new loan amortization period in years is
//stored.

$('#loanAmort').change(function() {
    current_loan.amort = $('#loanAmort').val();
});

 // on the loan tab, on a change, the new loan start date  is
//stored.

$('#loanStart').change(function() {
    current_loan.startDate = $('#loanStart').val();
});

// on the building tab, on a change, the new building name   is
//stored.

$('#bldgName').change(function() {
    current_building.bldgName = $('#bldgName').val();
});

$('#bldgAddr').change(function() {
    current_building.stAddress = $('#bldgAddr').val();
});

// on the building tab, on a change, the new building street address   is
//stored.

$('#bldgCity').change(function() {
    current_building.city = $('#bldgCity').val();
});

// on the building tab, on a change, the new building state is stored.
// needs to be uppercase.

$('#bldgSt').change(function() {
    current_building.state = $('#bldgSt').val().toUpperCase();
});

// on the building tab, on a change, the new building state is stored.

$('#bldgZip').change(function() {
    current_building.zip = $('#bldgZip').val();
});

// on the building tab, on a change, the new building size is stored.
// number is convered to text and formated.

$('#bldgSize').change(function() {
    var size = $('#bldgSize').val();
    current_building.bldgSize = (numeral(size)._value);
    $('#bldgSize').val(numeral(size).format('0,0'));
});

// on the building tab, on a change, the new closing cost is stored.
// number is convered to text and formated as currency.

$('#bldgClosing').change(function() {
    var vlu = $('#bldgClosing').val();
    current_building.closingCosts = numeral(vlu)._value;
    $('#bldgClosing').val(numeral(vlu).format('$0,0'));
});

// on the building tab, on a change, the new purchase price is stored.
// number is convered to text and formated as currency.


$('#bldgPrice').change(function() {
    var vlu = $('#bldgPrice').val();
    current_building.purchasePrice = numeral(vlu)._value;
    $('#bldgPrice').val(numeral(vlu).format('$0,0'));
});

// on the building tab, on a change, the new improvements costs is stored.
// number is convered to text and formated as currency.

$('#bldgImprovements').change(function() {
    var vlu = $('#bldgImprovements').val();
    current_building.improvements = numeral(vlu)._value;
    $('#bldgImprovements').val(numeral(vlu).format('$0,0'));
});

// on the building tab, on a change, the new terminal cap rate is stored.
// number is convered to text and formated as percentage.

$('#bldgTermCap').change(function() {
    var vlu = $('#bldgTermCap').val();
    current_building.terminalCap = numeral(vlu)._value;
    $('#bldgTermCap').val(numeral(vlu).format('0,0.00%'));
});

// on the building tab, on a change, the new building purchase date is stored.

$('#bldgPurDate').change(function() {
    current_building.purchaseDate = $('#bldgPurDate').val();
});

/*
------------------------------------------------------------------
The setxxx group of functions accept object and uses Jquery to set the values
various of input field and built out tables on the both Tenant and Expense tabs.

The key functions are:

 + setBuildingHtml(building) 
 + setLoanHtml(loan)
 + dt_formater(dateText)
 + rentArrayBuilder(bldgArray, header)
 + buildTenantRentTbl(i)

-------------------------------------------------------------------
*/


/*
accepts a buuilding object and sets the value on the building tab.  Numeral.js
is used to format currency and large numbers and then sets those numbers as text.
The dt_formater() takes a date and converts in a format suitable for date object.
*/

function setBuildingHtml(building) {
    $('#bldgName').val(building.bldgName);
    $('#bldgAddr').val(building.stAddress);
    $('#bldgCity').val(building.city);
    $('#bldgSt').val(building.state.toUpperCase());
    $('#bldgZip').val(building.zip);
    $('#bldgSize').val(numeral(building.bldgSize).format('0,0'));
    $('#bldgClosing').val(numeral(building.closingCosts).format('$0,0'));
    $('#bldgPrice').val(numeral(building.purchasePrice).format('$0,0'));
    $('#bldgImprovements').val(numeral(building.improvements).format('$0,0'));
    $('#bldgTermCap').val(numeral(building.terminalCap).format('0,0.00%'));
    var dateSetter = dt_formater(building.purchaseDate)
    $('#bldgPurDate').val(dateSetter);
}

/* 
accepts a loan object and sets value of input fields on the laon tab.

*/

function setLoanHtml(loan) {
    $('#loanBank').val(loan.bank);
    $('#loanAmount').val(numeral(loan.loan).format('$0,0'));
    $('#loanTerm').val(loan.term);
    $('#loanRate').val(numeral(loan.rate).format('0.0%'));
    $('#loanAmort').val(loan.amort);
    var dateSetter = dt_formater(loan.startDate)
    $('#loanStart').val(dateSetter);
}

/* 
dt_formater accepts date as a text field, create a data object, 
It uses the date object to create text that is formated in format
that both Date.js and javascript will accept and be able to easily convert
to date object.

*/

function dt_formater(dateText) {
    var date = new Date(dateText);
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var formateddate = date.getFullYear() + "-" + (month) + "-" + (day);
    return formateddate;
}

/*
rentArrayBuilder() is a helper function to rentArrayBuilder(). The tenant object includes an rent array. 
RentArrayBuilder accepts tenant object and header array for the rent table and creates array 
for header at 0 index and continues add array elements by creating a two dimensional array where 
the first dimension will correspond to rental period and second dimension is array of rent's 
start date, end date, monthly rent, annualized rent and rent per SF.  The returns array.

RentArrayBuilder adds the rent table to index.html tenant tab. 
*/


function rentArrayBuilder(bldgArray, header) {
    var data = [];
    data.push(header);
    for (var i = 0; i < bldgArray.rents.length; i++) {
        var arrayRow = [];
        arrayRow[0] = bldgArray.rents[i].startDate.toLocaleDateString();
        arrayRow[1] = bldgArray.rents[i].endDate.toLocaleDateString();
        arrayRow[2] = numeral(bldgArray.rents[i].monthlyRent).format('($0,0)');
        arrayRow[3] = numeral(bldgArray.rents[i].monthlyRent * 12).format('($0,0)');
        arrayRow[4] = numeral(((bldgArray.rents[i].monthlyRent * 12) / bldgArray.unit_size)).format('$0,0.00');
        data.push(arrayRow);
    }
    return data;
}


/*  
buildTenantRentTbl(i) builds the rent table on Tenant tab.  It accepts, the index of
the select box value to determine which tenant object to use.  As a reminder, the tenant array
that is comprised of tenant objects.

When this function is called when (1) when the web page is initally set up (2). the reset button on the
tenant tab is pressed or (3) when select box is changed.

The function updates unit size displayed on the webpage and formats it.    It then clears the rent
table, and uses the rentArrayBuilder function to create the array, passising it the both the current
array value based on the index of select box and table header as an array.  This array is 
required by arrayToTable function in editabeTable.js to create the html code for the table.
The html code is appended to htim at the tag with tenant-table id.
*/

function buildTenantRentTbl(i) {
    // $('#bldgName').val(building.bldgName);
    $('#tenantSize').val(numeral(tenant[i].unit_size).format('0,0'));
    $('#tenant-table').empty();
    var tenantData = [];
    var tenantHeader = ["start Date", "End Date", "Monthly Rent", "Annualized Rent", "Rent / SF"];
    var tenantData = rentArrayBuilder(tenant[i], tenantHeader);
    console.log(tenantData);
    var Renttable = arrayToTable(tenantData, {
        thead: true,
        attrs: { class: 'table' }
    })
    $('#tenant-table').append(Renttable);

}
/*  
---------------------------------------------------
The functions below below loads values into the index.html when the page loads.

new funcitons defined are:
+ buildExpTab(exp)


____________________________________________________

*/


/* 
builds the expense table for tenant at index 0 of tenant's select box.
It also updates value of the expense growth input field.
*/
buildTenantRentTbl(0);


// a helper funciton that accepts a number and converts a formated text
// as a percent value.  numeral.js is used for format the text.

function buildExpTab(exp) {
    $('#expGrw').val(numeral(exp).format('0.0%'));
}

/*
expArrayBuilder(exp, header) is a helper function that creates an 2 dimensional array where 
there first element of the array is a header, remaining elements of the array are expense objects.
The expense object includes property name and currency amount representing type of expenses and it's
year 1 total for that expense.  The function returns an array that used by arrayToTable to build
expense tab's expense table.
*/


function expArrayBuilder(exp, header) {
    var expData = [];
    expData.push(header);
    for (var property in exp) {
        var arrayRow = [];
        if (property != "growth") {
            arrayRow[0] = property;
            arrayRow[1] = numeral(exp[property]).format('$0,0.00');
            expData.push(arrayRow);
        }
    }
    return expData;
};

// Builds expData array, by first defining the header and using the expenses array and the header
// to create the array to feed into the arrayToTable function.

var expHeader = ["Expense", "Amount"];
var expData = expArrayBuilder(expenses, expHeader);



 // load  initial values for the building tab.
setBuildingHtml(bldgDiversey);

// load initial values for the select box on the tenants page.

buildSelect('#tenantListdpdwn', tenants);

// load initial value on the expense tab.
buildExpTab((expenses.growth));

// load initial values on the financing tab.
setLoanHtml(divLoan);

// build the html code for the expense table, on the expense tab.
var ExpTable = arrayToTable(expData, {
    thead: true,
    attrs: { class: 'table' }
})

// appends htlm code to expenses tab's table area.
$('#exp-table').append(ExpTable);


/*
code from www.commercialloandirect.com to retrieve from the website, the current value
US 5, 7, 10 year treasury bond.  These values are typically used to compare the spread
against a buildings loan rate.
*/

function loadXMLDoc() {
    var e;
    e = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"), e.onreadystatechange = function() { 4 == e.readyState && 200 == e.status && (document.getElementById("KeyMarketRates").innerHTML = e.responseText) }, e.open("POST", "https://www.commercialloandirect.com/rates-api.php", !0), e.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), e.send("Prime=N&Libor30Day=N&Libor90Day=N&Libor6Month=N&Libor1Year=N&Swap3Year=N&Swap5Year=N&Swap7Year=N&Swap10Year=N&Treasury5Year=Y&Treasury7Year=Y&Treasury10Year=Y&SBA10Year=N&SBA20Year=N&Bordered=N&Center=N&RightCol=N&LeftCol=N&ColorText=000000&Width=50%&WidthCol1=050&WidthCol2=050&TbColor=FFFFFF&BdColor=000000")
}
loadXMLDoc();

// Build Function to Save Building Page and update all pages
