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
I hope in future projects that I'll given the opportunity to expand on this tab by
being able to tenant and rent tables and edit that data as necessary. 

javascript code in dashboard.js is used to populate this page and control it's editing 
functions, such as when unit size is changed or new a tenant is chosen.  When the user
selects a new tenant, the rent table is updated.






