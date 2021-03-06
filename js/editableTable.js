/*
_____________________________________________-

arrayToTable is a function the accepts data array and object that defines additional
attributes.  The function, accepts the data and additional attributes and builds the  code
to be appended to the html file.  In this application, we use object to update attrs in default object

______________________________________________

*/


var arrayToTable = function(data, options) {

    "use strict";

    var table = $('<table />'),
        thead,
        tfoot,
        rows = [],
        row,
        i,
        j,
        defaults = {
            th: true, // should we use th elemenst for the first row
            thead: false, //should we incldue a thead element with the first row
            tfoot: false, // should we include a tfoot element with the last row
            attrs: {} // attributes for the table element, can be used to
        };

    options = $.extend(defaults, options);

    table.attr(options.attrs);

    // loop through all the rows, we will deal with tfoot and thead later
    for (var i = 0; i < data.length; i = i + 1) {
        row = $('<tr />');
        for (var j = 0; j < data[i].length; j = j + 1) {
            if (i === 0 && options.th) {
                row.append($('<th />').html(data[i][j]));
            }
            else {
                row.append($('<td />').html(data[i][j]));
            }
        }
        rows.push(row);
    };

    // if we want a thead use shift to get it
    if (options.thead) {
        thead = rows.shift();
        thead = $('<thead />').append(thead);
        table.append(thead);
    };

    // if we want a tfoot then pop it off for later use
    if (options.tfoot) {
        tfoot = rows.pop();
    };

    // add all the rows
    for (i = 0; i < rows.length; i = i + 1) {
        table.append(rows[i]);
    };

    // and finally add the footer if needed
    if (options.tfoot) {
        tfoot = $('<tfoot />').append(tfoot);
        table.append(tfoot);
    };

    return table;
};


/*  buildSelect (tag, obj)  
accepts a css tag that identifies the location of target select box and obj that is an
array of data.  In this application we use ID to identify location on Tenant tab and the array
is tenants array, an array of tenant objects.  We construct code that populated the select box's
<option> tags, and appends to the designated location. 
*/


function buildSelect (tag, obj) {
    var opt = $(tag);
    var selObj = obj;
    var rows = [];
    // opt.$(tag).remove();
    for (var i = 0; i < selObj.length; i++ ) {
        opt.append($('<option>', {
            value: i,
            text: selObj[i].name
        }));
    }
}



