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

