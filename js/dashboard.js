



$('#nav-submenu li.nav-building').click(function() {
    $('#building').css('display', 'block');
    $('#tenant').css('display', 'none');
    $('#expenses').css('display', 'none');
    $('#loan').css('display', 'none');
    $('#dashboard').css('display', 'none');
    
})

$('#nav-submenu li.nav-tenants').click(function() {
    $('#building').css('display', 'none');
    $('#tenant').css('display', 'block');
    $('#expenses').css('display', 'none');
    $('#loan').css('display', 'none');
    $('#dashboard').css('display', 'none');
})

$('#nav-submenu li.nav-expenses').click(function() {
    $('#building').css('display', 'none');
    $('#tenant').css('display', 'none');
    $('#expenses').css('display', 'block');
    $('#loan').css('display', 'none');
    $('#dashboard').css('display', 'none');
})

$('#nav-submenu li.nav-loan').click(function() {
    $('#building').css('display', 'none');
    $('#tenant').css('display', 'none');
    $('#expenses').css('display', 'none');
    $('#loan').css('display', 'block');
    $('#dashboard').css('display', 'none');
})

$('#nav-submenu li.nav-dashboard').click(function() {
    $('#building').css('display', 'none');
    $('#tenant').css('display', 'none');
    $('#expenses').css('display', 'none');
    $('#loan').css('display', 'none');
    $('#dashboard').css('display', 'block');
});




// buildTenantRentTbl(0);

$('#building .resetbtn').click(function() {
    backupBldg = new Building();
    current_building = Object.assign({}, bldgDiversey);
    setBuildingHtml(current_building);
    
});

// $('#tenant .resetbtn').click(function() {
//     tenants = Object.assign({}, baseline_tenants);
//     $('#tenantListdpdwn option').remove()
//     buildSelect('#tenantListdpdwn',tenants);
//     // buildTenantRentTbl(0);
// });
 
$('#tenantListdpdwn').change(function() {
    var tntIdx = Number($('#tenantListdpdwn').val());
    buildTenantRentTbl(tntIdx);
});

$('#tenantSize').change(function() {
    var tntIdx = Number($('#tenantListdpdwn').val());
    var size = $('#tenantSize').val();
    tenants[tntIdx].unit_size = (numeral(size)._value);
    $('#tenantSize').val(numeral(size).format('0,0'));
});



$('#expGrw').change(function() {
    var rate = $('#expGrw').val(); 
    expenses.growth= (numeral(rate)._value);
    $('#expGrw').val(numeral(rate).format('0.0%'));
});

$('#loanBank').change(function() {
    current_loan.bank = $('#loanBank').val();
});

$('#loanAmount').change(function() {
    var loan = $('#loanAmount').val() ;
    current_loan.loan = numeral(loan)._value;
    $('#loanAmount').val(numeral(loan).format('$0,0'));
});

$('#loanTerm').change(function() {
    current_loan.term = $('#loanTerm').val();
});
 
$('#loanRate').change(function() {
    var rate = $('#loanRate').val(); 
    current_loan.rate = (numeral(rate)._value)/100;
    $('#loanRate').val(numeral(rate).format('0.0%'));
});

 

$('#loanAmort').change(function() {
    current_loan.amort = $('#loanAmort').val();
});

loanStart

$('#loanStart').change(function() {
    current_loan.startDate = $('#loanStart').val();
});

$('#bldgName').change(function() {
    current_building.bldgName = $('#bldgName').val();
});

$('#bldgAddr').change(function() {
    current_building.stAddress = $('#bldgAddr').val();
});

$('#bldgCity').change(function() {
    current_building.city = $('#bldgCity').val();
});

$('#bldgSt').change(function() {
    current_building.state = $('#bldgSt').val().toUpperCase();
});

$('#bldgZip').change(function() {
    current_building.zip = $('#bldgZip').val();
});

$('#bldgSize').change(function() {
    var size = $('#bldgSize').val();
    current_building.bldgSize = (numeral(size)._value);
    $('#bldgSize').val(numeral(size).format('0,0'));
});

$('#bldgClosing').change(function() {
    var vlu = $('#bldgClosing').val() ;
    current_building.closingCosts = numeral(vlu)._value;
    $('#bldgClosing').val(numeral(vlu).format('$0,0'));
});

$('#bldgPrice').change(function() {
    var vlu = $('#bldgPrice').val() ;
    current_building.purchasePrice = numeral(vlu)._value;
    $('#bldgPrice').val(numeral(vlu).format('$0,0'));
});

$('#bldgImprovements').change(function() {
    var vlu = $('#bldgImprovements').val() ;
    current_building.improvements = numeral(vlu)._value;
    $('#bldgImprovements').val(numeral(vlu).format('$0,0'));
});

$('#bldgTermCap').change(function() {
    var vlu = $('#bldgTermCap').val() ;
    current_building.terminalCap = numeral(vlu)._value;
    $('#bldgTermCap').val(numeral(vlu).format('0,0.00%'));
});

$('#bldgPurDate').change(function() {
    current_building.purchaseDate = $('#bldgPurDate').val();
});




// Set values of HTML

function setBuildingHtml (building) {
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




 

function setLoanHtml(loan) {
    $('#loanBank').val(loan.bank);
    $('#loanAmount').val(numeral(loan.loan).format('$0,0'));
    $('#loanTerm').val(loan.term);
    $('#loanRate').val(numeral(loan.rate).format('0.0%'));
    $('#loanAmort').val(loan.amort);
    var dateSetter = dt_formater(loan.startDate)
    $('#loanStart').val(dateSetter);
}



function dt_formater(dateText) {
    var date = new Date(dateText);
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var formateddate = date.getFullYear() + "-" + (month) + "-" + (day);
    return formateddate;
}

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

setBuildingHtml(bldgDiversey);
buildSelect('#tenantListdpdwn',tenants);

setLoanHtml(divLoan);




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



buildTenantRentTbl(0);

function buildExpTab(exp) {
    $('#expGrw').val(numeral(exp).format('0.0%'));
}

buildExpTab((expenses.growth));


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

var expHeader = ["Expense", "Amount"];
var expData = expArrayBuilder(expenses, expHeader);

var ExpTable = arrayToTable(expData, {
    thead: true,
    attrs: { class: 'table' }
})

$('#exp-table').append(ExpTable);

function loadXMLDoc() { var e;
    e = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"), e.onreadystatechange = function() { 4 == e.readyState && 200 == e.status && (document.getElementById("KeyMarketRates").innerHTML = e.responseText) }, e.open("POST", "https://www.commercialloandirect.com/rates-api.php", !0), e.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), e.send("Prime=N&Libor30Day=N&Libor90Day=N&Libor6Month=N&Libor1Year=N&Swap3Year=N&Swap5Year=N&Swap7Year=N&Swap10Year=N&Treasury5Year=Y&Treasury7Year=Y&Treasury10Year=Y&SBA10Year=N&SBA20Year=N&Bordered=N&Center=N&RightCol=N&LeftCol=N&ColorText=000000&Width=50%&WidthCol1=050&WidthCol2=050&TbColor=FFFFFF&BdColor=000000") }
loadXMLDoc();

// Build Function to Save Building Page and update all pages



