//  Budget Controller
var budgetController = (function() {

  // Some code

})();


//  UI Controller
var UIController = (function() {

  // Some code;

})();

// Global App Controller
var controller = (function(budgetCtrl, UICtrl) {

  document.querySelector('.add__btn').addEventListener('click', function() {
    console.log('Button was clicked.')
  })

})(budgetController, UIController);
