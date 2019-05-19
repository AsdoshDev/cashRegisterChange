function totalInDrawer(cid){
  return cid.map(elements => elements[1]).reduce((total, number) => total + number,0);
}
// Example cash-in-drawer array:
let currency =[["PENNY", 0.01],
["NICKEL", 0.05],
["DIME", 0.10],
["QUARTER", 0.25],
["ONE", 1],
["FIVE", 5],
["TEN", 10],
["TWENTY", 20],
["ONE HUNDRED", 100]]



function findCurrency(change,cid,obj){
  let length = currency.length -1;
  for(let i = length;i >= 0;){
    debugger;
    let valueOfCurrency = currency[i][1];
    if(valueOfCurrency <= change){ // -.25 <= 0.5 
      let howManyRequired = parseInt(change/valueOfCurrency);
      let howMuchRequired = howManyRequired * valueOfCurrency;
      let amtAvailableForCurrency = cid[i][1];
      if(amtAvailableForCurrency){
        if(howMuchRequired <=  amtAvailableForCurrency){  // 0.5/0.25 <= 4.25/0.25
        /* not exact change */
        if((change - howMuchRequired) !== 0)
          change = (change - howMuchRequired).toFixed(2);
         else
           change = 0;
        let innerArr = [];
        innerArr.push(cid[i][0])
        innerArr.push(howMuchRequired)
        obj.change.push(innerArr);
        obj.status = "OPEN";
        if(change === 0)
          return change;
        i--;
      }
      else{
        /* exact change */
        if((change - amtAvailableForCurrency) !== 0)
          change = (change - amtAvailableForCurrency).toFixed(2);
        else
           change = 0;
        obj.change.push(cid[i]);
        if(change === 0)
        return change;
        i--;
      }
      }
      else{
        i--;
      }
    }
    else{
      i--;
    }
  }
  return change;
 }

function checkCashRegister(price, cash, cid) {
   let obj = {
    status : "",
    change  : []
  }
  let change = cash - price;
  
  if(totalInDrawer(cid) < change){
    obj.status = "INSUFFICIENT_FUNDS";
    
  }
  else if (totalInDrawer(cid) == change){
    obj.status = "CLOSED";
    obj.change = cid;
  }
  else{
     change = findCurrency(change,cid,obj);
     console.log('CHANGE');
     console.log(change);
    debugger;
     if(change > 0 || obj.change.length < 1){
       obj.status = "INSUFFICIENT_FUNDS";
       obj.change = [];
     }
  }
  return obj;
}


console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])

            
            
            
            
            
// another solution 
            
            
            // Create an array of objects which hold the denominations and their values
var denom = [
  { name: 'ONE HUNDRED', val: 100.00},
  { name: 'TWENTY', val: 20.00},
  { name: 'TEN', val: 10.00},
  { name: 'FIVE', val: 5.00},
  { name: 'ONE', val: 1.00},
  { name: 'QUARTER', val: 0.25},
  { name: 'DIME', val: 0.10},
  { name: 'NICKEL', val: 0.05},
  { name: 'PENNY', val: 0.01}
];

function checkCashRegister(price, cash, cid) {
  var output = { status: null, change: [] };
  var change = cash - price;

  // Transform CID array into drawer object
  var register = cid.reduce(function(acc, curr) {
    acc.total += curr[1];
    acc[curr[0]] = curr[1];
    return acc;
  }, { total: 0 });

  // Handle exact change
  if (register.total === change) {
    output.status = 'CLOSED';
    output.change = cid;
    return output;
  }

  // Handle obvious insufficient funds
  if (register.total < change) {
    output.status = 'INSUFFICIENT_FUNDS';
    return output;
  }

  // Loop through the denomination array
  var change_arr = denom.reduce(function(acc, curr) {
    var value = 0;
    // While there is still money of this type in the drawer
    // And while the denomination is larger than the change remaining
    while (register[curr.name] > 0 && change >= curr.val) {
      change -= curr.val;
      register[curr.name] -= curr.val;
      value += curr.val;

      // Round change to the nearest hundreth deals with precision errors
      change = Math.round(change * 100) / 100;
    }
    // Add this denomination to the output only if any was used.
    if (value > 0) {
        acc.push([ curr.name, value ]);
    }
    return acc; // Return the current change_arr
  }, []); // Initial value of empty array for reduce

  // If there are no elements in change_arr or we have leftover change, return
  // the string "Insufficient Funds"
  if (change_arr.length < 1 || change > 0) {
    output.status = 'INSUFFICIENT_FUNDS';
    return output;
  }

  // Here is your change, ma'am.
  output.status = 'OPEN';
  output.change = change_arr;
  return output;
}

            
            
            
            
