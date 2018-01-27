# Project Scope

For the milestone project for the Interactive Frontend Development module, I propose to continue 
to build out the Harry Tool’s theme and build a Dashboard.  This Dashboard will be a single page 
application that provides the means to retrieve, edit and save pre-loaded data for a specific 
commercial real estate investment and graphically dispaly, key performance metrics such as revenue, 
expenses and expected economic return over a five-year period.   


#Application organization

The appliation is designed to fit into the Harry Tools landing page, https://github.com/BruceRedefinedprop/harrystools-proofofconcent

The program is organized into a three parts:

* The main HTML Page
* custom javascript modules
* open source javascript libraries and API's.
 

## index.html - the Main page

The main HTML page, index.html is framed by Harry Tools theme developed in the earlier milestone
project with the main menu on the top right of project, settings, help and signout 
are stubs reserved for future use.  The signout table does point back to the Harry's proof of concept
webpage https://harrys-landingpage-bruceharrison.c9users.io/index.html.

Then further down the page, there are five buttons that used to navigate through the views, 
which I will loosely refer to as tabs.

The five views are:

### The building Tab

The building tab defined information about the specific property being studies such as name,
address, size, cost and terminal value cap rate.  All input field are editable and inputs,
except purchase date, are text fields and Javascript in dashboard.js is used to convert the text
to required numbers and then back to formated text to improve reability.  Numeral.js, open source
library is used to help with this task.

The date fields, depending on browser will offer a datapicker.  Unfortuantely, 
datepicker is not available for Safari or IE.  In a future, the program can be improved by
using Jquery UI's datapicker function enchance Safari and IE limitiations.


### The Tenant Tab

The tenant tab display information the tenant such as name, amount of space rented and 
rent table.  It features  a select box that let's the user switch between tenants.
I hope in future projects that I'll be given the opportunity to expand on this tab by
being able to tenant and rent tables and edit that data as necessary. 

javascript / jquery code in dashboard.js is used to populate this page and control it's editing 
functions, such as when unit size is changed or new a tenant is chosen.  When the user
selects a new tenant, the rent table is updated.  From a code perspective, Jquery removes the old
table, builds a new table and appends the new html code to the page.  In a future version
the table will editable.  It is my understanding that there are better tools with python and server-side
programming to build and work with editable tables than there is using jQuery solely on 
the client  side, so I decided to leave that feature for a later versions of the Harry Tools platform.


### Expense Tab

The Expense Tab shows the operating expenses for the property.  It builds table from
pre-loaded data using Jquery.  The expense growth can be changed and will impact the NOI and
Cash-on-Cash as displayed on the Dashboard grapns.

### Financing Tab

The financing tabs display key factors used to determine the annual debt service as well as
display US Treasury bond rates from https://www.commercialloandirect.com/commercial-rates.php.
Everytime this page is loaded, the bond rates are retrieved from the aforementioned website.

The annual debt service is used by Dashboard tab and dshdb_metrics.js to caculate cash-on-cash
returns, which is NOI - debt service divided by the buildng basis.    To determine the debt service
amort.js, an open source program is used.   Before I used amort.js, I examined the code to be
sure that it's method of caculation is consist with industry acceptable formula. 


### Dashboard

The Dashboard displays charts of the key performance results.   As data changes in preceding tabs,
the various data store objects and arrays are updated  When the Dashboard button is clicked,
the key performance measures defined in dshbd_metrics.js are updated and used to with the support
of Google Charts to generate the graphs by model year for:

* revenue, expenses and net operating income (NOI)
* Cash-on-Returns
* Estimated terminal value.

The model year is set for five years from the first day of the month just after the building's
date.   The building's terminal value is calculated by NOI / terminal cap rate, an industry
standard estimate of value.


# Code and Library Used

One of the goal of the project, was to build a single webpage and use Jquery another appropriate
technique maninpuate the DOM.  To acheive this goal, a single html file, index.html was written.
However, that page is logically designed to fit into the larger Harry's Tools platform, where the
first milestone project was the general marketing information, while this project represent,
the start of application focused on data entry and graphical representation of the performance
metrics.

The javascript programs developed include:

* create_data.Js - which creates main objects for the building, tenants, rents, years, etc.
... and loads hard code data.  It is assumed that later version that database will be used 
... to store and retrive what in this application is hard coded.  At the bottom of this file,
... is code to store and retrieve an object locally, however, i chose not expose or expand this
... this logic since it only uses local browser storage and seem of little practical use for this
... application and had the potential to create confusion for a user.

* dashboard.js - The Dashboard module main program the updates to index.html to add and change 
... information about a real estate investment including  details about the building size and 
... locaiton, it's tenants and rent the they pay, operating expenses and financing 
... It also controls the refreshing of all performance metrics and creation of Dashboard 
... graphs that display various performance metrics as well as ajax to retrieve current bond rates.
... Note:  The site that I use to retrieve bond rates, meets the needs of this assignment and its free,
... it's data does not timely as the final application will require.
...
... Futhermore this script use Jquery to set up event listenerns such that when a html input 
... field changes,  that change is recorded and the approrpiate object is updated.  Other event
,,, listenerns are set up to manage the tab buttons.   The code's documentation project implementation
... details.
 

* dshbd_metrics.js - use the data stored in the various objects, processes the data, ulimately,
... producing arrays that define the model year, revenue, expenes, NOI, cash-on-cash,
... and terminal value by model year.   The details are those caculations are documented 
... in the code.   The main funcitons in this file invoked and all metrics updated prior to
... to the Dashboard graphs being generated.

* dshbd_charts.js -  use standard Google Charts template code to generate the various charts.
... There was some additonal coding required to format arrays built-up in dshdb_metrics.js
... into the format required by Google Charts.

* Date.js is an open source library that is designed to make manulating date / time easier such as
... adding 1 year to date as well as converting back and forth between formated text and
... date format.


* Amort.js is an open source tools for caculating debt payments and building amortization tables.
... there might be more robust library for this funciton, but the purposes of this assignment, 
... it is adequate and does the math correctly.

* editableTable.js was code snipet that I found on web search and simplified for my purposes.

* expected results.xlsx is an MS Excel spreadsheet that shows expected test results
... for various tenant, rent tables and debt service caculations.


# Testing

The testing methodology used is the following:

1.  Valudate that preload data creates project objects and arrays.  This achieved by
using console to visually inspect the objects and arrays 

2. valuate that base data key metrics were updated correctly.   To support this activity, 
a test an excel spreadsheet of expected results was built.  This spreadsheet can also be used
for later testing to test results and data is changed.  The console was used to inspect,
outcome arrays produced by dshbd_metrics.js.

3. (to be create) Jasmine tests were used to test more complex, javascript functions
in dashboard.js  and dshbd_metrics.js to ensure as data changes, the expected are achieved.
The excel was used to caculate and veriy the expected results.

4. Each tab's input fields were tested to ensure that when an field was changed, 
that data was recorded in the proper array or object.  Futhermore, when the Dashboard button
was clicked, dshbd_metrics.js outcome arrays were verified through inspection to validate
that they were updated with the new data and produced the desired results.  This funcdtion
was also tested by inspecting the Dashboard graphs, which while not exact did show results
close enough to demonatration that application was working.  jasmine was also used to verify 
the results.

5. Dashboard graphs were inspected against expected result, as defined by the Excel Spreadsheet.


