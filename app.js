// Features of application:
// 1) Summ all income money. Possibility to add more input fields.
// 2) Summ all monthly payments and minus from total 15% for savings
// 3) Split the rest of the money to ammount days in picked month
// 4) Possibility to add expenses to picked day. After that daily summ
// for the rest days recalculates.

// 1) input
function findTotal(){
    var arr = document.getElementsByName('qty');
    var tot=0;
    for(var i=0;i<arr.length; i++){
        if(parseInt(arr[i].value))
            tot += parseInt(arr[i].value);
    }
    document.getElementById('total').value = tot;
}

// 2) input monthly expenses
function findTotalMonthExp(){
    var arr = document.getElementsByName('month_exp');
    var tot=0;
    for(var i=0;i<arr.length; i++){
        if(parseInt(arr[i].value))
            tot += parseInt(arr[i].value);
    }
    document.getElementById('total_month_exp').value = tot;
}
