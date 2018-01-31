/* 
In the next test, we create new model based on 7 year duration and new data.
We'll use the expected result spreadsheet to calculate the expected rent and check
it against the model rent array that dshbd_metrics.js generates.
*/

describe("Build new rent array for 6 year model", function() {

  var RentTestTenantsAr = [];

  beforeEach(function() {

    RentTestTenantsAr[0] = new Tenant("tenant1", 10000);
    RentTestTenantsAr[0].rents = [];
    RentTestTenantsAr[1] = new Tenant("tenant2", 10000);
    RentTestTenantsAr[1].rents = [];
    RentTestTenantsAr[2] = new Tenant("tenant3", 10000);
    RentTestTenantsAr[2].rents = [];


    RentTestTenantsAr[0].rents[0] = new Rent(new Date("1/1/2017"), new Date("12/31/2017"), 50000);
    RentTestTenantsAr[0].rents[1] = new Rent(new Date("1/1/2018"), new Date("12/31/2018"), RentTestTenantsAr[0].rents[0].monthlyRent + 1200);
    RentTestTenantsAr[0].rents[2] = new Rent(new Date("1/1/2019"), new Date("12/31/2019"), RentTestTenantsAr[0].rents[1].monthlyRent + 1200);
    RentTestTenantsAr[0].rents[3] = new Rent(new Date("1/1/2020"), new Date("12/31/2020"), RentTestTenantsAr[0].rents[2].monthlyRent + 1200);
    RentTestTenantsAr[0].rents[4] = new Rent(new Date("1/1/2021"), new Date("12/31/2021"), RentTestTenantsAr[0].rents[3].monthlyRent + 1200);
    RentTestTenantsAr[0].rents[5] = new Rent(new Date("1/1/2022"), new Date("12/31/2022"), RentTestTenantsAr[0].rents[4].monthlyRent + 1200);
    RentTestTenantsAr[0].rents[6] = new Rent(new Date("1/1/2023"), new Date("12/31/2023"), RentTestTenantsAr[0].rents[5].monthlyRent + 1200);

    RentTestTenantsAr[1].rents[0] = new Rent(new Date("4/1/2017"), new Date("3/31/2018"), 40000);
    RentTestTenantsAr[1].rents[1] = new Rent(new Date("4/1/2018"), new Date("3/31/2019"), RentTestTenantsAr[1].rents[0].monthlyRent + 1000);
    RentTestTenantsAr[1].rents[2] = new Rent(new Date("4/1/2019"), new Date("3/31/2020"), RentTestTenantsAr[1].rents[1].monthlyRent + 1000);
    RentTestTenantsAr[1].rents[3] = new Rent(new Date("4/1/2020"), new Date("3/31/2021"), RentTestTenantsAr[1].rents[2].monthlyRent + 1000);
    RentTestTenantsAr[1].rents[4] = new Rent(new Date("4/1/2021"), new Date("3/31/2022"), RentTestTenantsAr[1].rents[3].monthlyRent + 1000);
    RentTestTenantsAr[1].rents[5] = new Rent(new Date("4/1/2022"), new Date("3/31/2023"), RentTestTenantsAr[1].rents[4].monthlyRent + 1000);
    RentTestTenantsAr[1].rents[6] = new Rent(new Date("4/1/2023"), new Date("3/31/2024"), RentTestTenantsAr[1].rents[5].monthlyRent + 1000);

    RentTestTenantsAr[2].rents[0] = new Rent(new Date("9/1/2017"), new Date("8/31/2018"), 30000);
    RentTestTenantsAr[2].rents[1] = new Rent(new Date("9/1/2018"), new Date("8/31/2019"), RentTestTenantsAr[2].rents[0].monthlyRent + 600);
    RentTestTenantsAr[2].rents[2] = new Rent(new Date("9/1/2019"), new Date("8/31/2020"), RentTestTenantsAr[2].rents[1].monthlyRent + 600);
    RentTestTenantsAr[2].rents[3] = new Rent(new Date("9/1/2020"), new Date("8/31/2021"), RentTestTenantsAr[2].rents[2].monthlyRent + 600);
    RentTestTenantsAr[2].rents[4] = new Rent(new Date("9/1/2021"), new Date("8/31/2022"), RentTestTenantsAr[2].rents[3].monthlyRent + 600);
    RentTestTenantsAr[2].rents[5] = new Rent(new Date("9/1/2022"), new Date("8/31/2023"), RentTestTenantsAr[2].rents[4].monthlyRent + 600);
    RentTestTenantsAr[2].rents[6] = new Rent(new Date("9/1/2023"), new Date("8/31/2024"), RentTestTenantsAr[2].rents[5].monthlyRent + 600);

  })


  it("match new montlhy rent with first month ", function() {
    // create rent array
    current_building.purchaseDate = "1/15/17";
    var model_periods = 6;
    console.log("model Duration: " + model_periods);
    modelyears = buildModelYears(model_periods);
    console.log(modelyears);
    console.log(RentTestTenantsAr);

    var monthlyRentA = getRent(modelyears[0].startDate, RentTestTenantsAr);
    var monthlyRentTestA = 50000;

    expect(monthlyRentA).toEqual(monthlyRentTestA);
  })

  it("match new montlhy rent with last month ", function() {
    // create rent array
    current_building.purchaseDate = "1/15/17";
    var model_periods = 6;
    console.log("model Duration: " + model_periods);
    modelyears = buildModelYears(model_periods);

    // function getRent(compDate, tenant) {
    //   var rentTotal = 0;
    //   this.compDate = compDate;
    //   this.tenant = tenant;

    //   for (var i = 0; i < this.tenant.length; i++) {
    //     for (var j = 0; j < this.tenant[i].rents.length; j++) {
    //       if (this.tenant[i].rents[j].startDate <= this.compDate && this.tenant[i].rents[j].endDate >= this.compDate) {
    //         console.log("date: " + this.compDate + " " );
    //         console.log(this.tenant[i].rents[j].monthlyRent);
    //         rentTotal += this.tenant[i].rents[j].monthlyRent;
    //       }
    //     }
    //   }
    //   return rentTotal;
    // }

    monthlyRent = getRent(modelyears[1].startDate, RentTestTenantsAr);

    var monthlyRentTest = 121200;;

    expect(monthlyRent).toEqual(monthlyRentTest);
  })
  
  it("test model year based on test data", function() {
    current_building.purchaseDate = "1/15/17";
    var model_periods = 6;
    console.log("model Duration: " + model_periods);
    modelyears = buildModelYears(model_periods);
    modelyearsrentTest = [1151200, 1468600, 1502200, 1535800, 1569400, 1603000];
    tenants = RentTestTenantsAr;
    var testModelRent = buildModelRent();
    expect(modelyearsrentTest).toEqual(testModelRent);
  })


})


