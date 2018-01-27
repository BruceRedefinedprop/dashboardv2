/* This module builds are arrays to hold data
that will be used create Dashboard tables and
graphs

Objects:
Object: Years     ---- > instiated object: modelYears   defines fiscal years for the model

functions:

    buildModelYears(duration) return an array of Years objects for each fiscal year.
    the length of array is set duration, which must be integer.

    getRent(compDate, tenant) comDate is date for specific month.   tenant is Tenant object.
    the function use compDate, checks the rent tables embeded in the Tenant object
    sums up the rent from the all tenants and returns total rent for the month.

    buildYearRent(start) takes a start data and builds an array of rents by month for 
    each year.  It relies on getRent() to retrieve the rent for each month. It returns
    the array yearRent.
    
    there is a code block sums up the yearRent and addes it to modelrent array.


Main Arrays:

modelYears define fiscal years.
modelRent defines rent by fiscal year
modelExpenses defines expense by fiscal year
modelNOI defines NOI by fiscal year
modelCashonCash by fiscal year
terminalVal potential selling price by year

*/

/* defines and create fiscal years.  
Initially, we need to defined Years object that corresponds to a fiscal year,
rather than calender year.

*/

function Years(startDate, endDate) {
    this.startDate = startDate;
    this.endDate = endDate;
}

/*   
buildModelYears accepts a value that corresponds to the length of the financial 
model and returns an array Year objects that corresponds to the duration of the financial model
study period e.g. 5 years, 20 years, etc...

The start date tables the building purchase date, defined in the building object and
starts the study period on the first day of the next month.  The end date is a year later.
The Date.setFullYear changes the year by 1.  We need to subtract a day to the correct end date.

*/

function buildModelYears(duration) {
    this.duration = duration;
    var modelyears = [];

    for (var i = 0; i < this.duration; i++) {
        if (i == 0) {

            modelyears[0] = new Years;
            modelyears[0].startDate = new Date(current_building.purchaseDate);
            modelyears[0].startDate.setMonth(modelyears[0].startDate.getMonth() + 1, 1);
            modelyears[0].endDate = new Date(modelyears[0].startDate);
            modelyears[0].endDate.setFullYear(modelyears[0].endDate.getFullYear() + 1);
            modelyears[0].endDate.setDate(modelyears[0].endDate.getDate() - 1);
        }
        else {
            modelyears[i] = new Years;
            modelyears[i].startDate = new Date(modelyears[i - 1].endDate);
            modelyears[i].startDate.setDate(modelyears[i].startDate.getDate() + 1);
            modelyears[i].endDate = new Date(modelyears[i].startDate);
            modelyears[i].endDate.setFullYear(modelyears[i].endDate.getFullYear() + 1);
            modelyears[i].endDate.setDate(modelyears[i].endDate.getDate() - 1);
        }
    }

    return modelyears;
}

var modelyears = buildModelYears(MODEL_YEARS);

// build Rent Array

/*
    getRent(compDate, tenant) comDate is date for specific month.   tenant is Tenant object.
    the function use compDate, checks the rent tables embeded in the Tenant object
    sums up the rent from the all tenants and returns total rent for the month.
*/

function getRent(compDate, tenant) {
    var rentTotal = 0;
    this.compDate = compDate;
    this.tenant = tenant;
    for (var i = 0; i < this.tenant.length; i++) {
        for (var j = 0; j < this.tenant[i].rents.length; j++) {
            if (this.tenant[i].rents[j].startDate <= this.compDate && this.tenant[i].rents[j].endDate >= this.compDate) {
                rentTotal += this.tenant[i].rents[j].monthlyRent;
            }
        }
    }
    return rentTotal;
}

/*
    buildYearRent(start) takes a start data and builds an array of rents by month for 
    each year.  It relies on getRent() to retrieve the rent for each month. It returns
    the array YearRent
*/

function buildYearRent(start) {
    this.start = start;

    var yearRent = [];
    var compDate;
    for (var i = 0; i < 12; i++) {
        // if statement for first month.. then increment compare data...
        if (i == 0) {
            compDate = new Date(this.start);
        }
        else {
            compDate = compDate.add(1).month();
        }
        console.log("compDate:" + compDate);

        yearRent[i] = getRent(compDate, tenants)
    }
    return yearRent;
}


/*
creates modelRent array, which defines the rent for each fiscal year.
The buildYearRent function uses the startdate for each the models fiscal years
to build a yearRent array. then yearRent array months are summed up, with the result
with result added to the modelRent array.
*/

function buildModelRent() {
    var modelRent = [];

    function getSum(total, num) {
        return total + num;
    }
    for (var i = 0; i < modelyears.length; i++) {
        var yearRent = buildYearRent(modelyears[i].startDate);
        modelRent[i] = yearRent.reduce(getSum);
    }
    return modelRent
}

var modelRent = buildModelRent();


/* 
builds a yearExpense array, inceasing expense by 2% per year.
hardcoded value.
*/


function buildModelExpenses() {
    var modelExpenses = [];
    var yearExpense = 0;

    for (x in expenses) {
        yearExpense += expenses[x];
    }

    for (var i = 0; i < modelyears.length; i++) {
        if (i == 0) {
            modelExpenses[i] = yearExpense;
        }
        else {
            modelExpenses[i] = modelExpenses[i - 1] * (1+expenses.growth);
        }
    }
    return modelExpenses
}

var modelExpenses = buildModelExpenses();

/*
builds modelNOI array.  NOI - net operating income.  NOI = rents - expenses.
*/



function buildModelNOI() {
    var modelNOI = [];
    for (var i = 0; i < modelyears.length; i++) {
        modelNOI[i] = modelRent[i] - modelExpenses[i];
    };
    return modelNOI;
};

var modelNOI = buildModelNOI();

/*  calculates:
        debt service using pmt() from amort.js
        building basis whichs its price plus improvements and purchasing expenses.
        equity in building = basis - loaned amount.
*/




function buildCoC() {
    var basis = current_building.purchasePrice + current_building.improvements;
    var equity = basis - current_loan.loan;
    var debtService = pmt(current_loan.rate, current_loan.amort, current_loan.loan);

    // builds modelCashonCash array, how return you get for equity.

    var modelCashonCash = [];
    for (var i = 0; i < modelyears.length; i++) {
        modelCashonCash[i] = ((modelNOI[i] + debtService) / equity) * 100;
    }
    return modelCashonCash;
};

var modelCashonCash = buildCoC();


// build terminalVal array, potential selling price by year



function buildTerminalValue() {
    var terminalVal = [];
    var termCap = current_building.terminalCap;
    var basis = current_building.purchasePrice + current_building.improvements
    for (var i = 0; i < modelyears.length; i++) {
        if (i == 0) {
            
            terminalVal[i] = basis;
        }
        else {
            terminalVal[i] = modelNOI[i] / termCap;
        }

    }
    return terminalVal;
}

var terminalVal = buildTerminalValue();