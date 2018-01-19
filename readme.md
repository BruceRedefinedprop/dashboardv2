# Project Scope

For the milestone project for the Interactive Frontend Development module, I propose to continue 
to build out the Harry Tool’s theme and build a Dashboard.  This Dashboard will be a single page 
application that provides the means to retrieve, edit and save pre-loaded data for a specific 
commercial real estate investment and graphically dispaly, key performance metrics such as revenue, 
expenses and expected economic return over a five-year period.   


#Application organization

So far, I am at the beginning of the development process.  To date,   I have built the dataset and 
tools to convert the raw data such as building size, tenants and lease into the specified 
financial metrics to measure the investment's performance.

The initial page, build_data_store.html is a very basic page who's purpose is to enable 
the application run my javascript programs.

The 'create_data.js' module  loads the hard coded data.  It creates building, tenant, lease and
expenses objects and sets as a constant, the length of the financial model.   This modules
also includes stubs for storing and retrieving objects to the local browser's storage.  While
I have tested the local storage functions in an earlier version, the code needs to be changed
to accomodate the new objects  created (after I tested the code) and may be moved to it's own javascript 
that is loaded at the bottom of the html page, so that all objects are created and 
the hard coded data is loaded first.

The 'dshbd_metrics.js' processes the hard coded data to build arrays for the model year and 
for each model year - the rent, expenses, NOI (net operating income), cash-on-cash, and 
the property's potential sale price (terminal value).  This data will be used by Dashboard page as
the base data it's graphs and tables. (which is not created yet).

The model year is hard coded to a five year period, but the code could accomodate any
number of years.   The model year starts at the first day of month right after the property's
purchase date, which is defined in the building object. This date can be any calendar data and the application 
sets the start date to first day on the next month and the end date for the fiscal year, a year later.

To determine the rent, 'dshbd_metrics.js' first builds an array of the rent for each month of specific fiscal
year and sums that array.  The result is then added to array of rents by fiscal year.

For the expenses, we examine the expense object, sum up all the expenses in year 1
and increase the expenses for each year by 2%.  In reality, expense growth can vary by
category and a more robust code will be developed in the future.  Right now, I think
this approach is ok for the class.

We then build the arrays for NOI, cash-on-cash and terminal value using straight forward
math.   These arrays are of course aligned up by fiscal year.  

* NOI = rent - expenses   
* cash-on-cash = NOI - debt service / equity   --> equity = buidling basis - loan.
* terminal value = NOI / cap rate

The debt service was calculated using data for the loan object and 'amort.js' function.   
'amort.js  is an open source loan calculator.  The result was tested  against similar
equatin in MS Excel.

The 'date.js' script is also open source program and I used it to compare dates and add time 
to others while building the rent arrays.   It made the data math easier.


# Testing approach

It appears that in c9, I need to run javascripts throught the browser and I have yet to
mastered the use of breakpoints and the ability in the IDE to test or view values.  (This is
much more straight-forward when writing Python in Pycharm.) I was hoping the c9 had it's JVM interperter.

So to test my javascript program, I would run the html and use Google Chrome Inspect to test the values of the 
various variables and arrays.   To make sure the make the math and algorithms were correct, I had a MS Excel
model of the correct results. I also inserted console.log statements to print out various variables / 
arrays.  (which I removed for now to make the code cleaner).

I will go back in the testing phase, add Jasmine tests to make sure, particularly in build rent 
function that the search activity is being performed correctly.

I also broke the code up in smaller modules, to make it  more readable.   I know this is my first pass 
I can do more optimize the code, but I would curious to know what you think of it.   Also, I 
would like to know what you think of it from a stylistic perspective so that I can develop good habits.


# Next Steps

In the next step, I will create plain web page that dynamically builds the tables to 
to visualize and edit the object data and dispaly the results.

From there I will build the graphs and retrieve some other info such as some USA bond quotes 
using a API form the US Dept of Treasury.