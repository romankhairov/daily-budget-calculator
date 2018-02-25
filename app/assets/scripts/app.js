
// BUDGET CONTROLLER-----------------------------------------------------------    BUDGET CONTROLLER    ---------------------------------------------------------------------
var budgetController = (function() {

  // Some code

})();



// UI CONTROLLER---------------------------------------------------------------    UI CONTROLLER    ---------------------------------------------------------------------
var uiController = (function() {

  // Some code

})();



// GLOBAL APP CONTROLLER-------------------------------------------------------    GLOBAL APP CONTROLLER    ---------------------------------------------------------------------
var controller = (function(budgetController, uiController) {

  var ctrlAddItem = function() {

    // 1. Get the filed input data

    // 2. Add the item to the budget controller

    // 3. Add the item to the UI

    // 4. Calculate the budget

    // 5. Display the budget on the UI

    console.log('Test of ctrlAddItem');
  }

  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

  document.addEventListener('keypress', function(e) {

    if(event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
    }

  });

})(budgetController, uiController);
