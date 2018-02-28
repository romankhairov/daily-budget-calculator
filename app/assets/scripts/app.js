// BUDGET MODULE
var budgetModule = (function() {

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };


    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function(type) {
      var sum = 0;
      data.allItems[type].forEach(function(current) {
        sum = sum + current.value;
      });
      data.totals[type] = sum;
    };

    // var calculateDailyBudget = function(budget) {
    //   var daily = 0;
    //   daily = data.budget / 30;
    // }


    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0
    };


    return {
        addItem: function(type, des, val) {
            var newItem, ID;

            //[1 2 3 4 5], next ID = 6
            //[1 2 4 6 8], next ID = 9
            // ID = last ID + 1

            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            // Push it into our data structure
            data.allItems[type].push(newItem);

            // Return the new element
            return newItem;
        },

          calculateBudget: function() {

          // Calculate total income and expenses
          calculateTotal('exp');
          calculateTotal('inc');

          // Calculate the budget: income - expenses
          data.budget = data.totals.inc - data.totals.exp;


        },

          deleteItem: function(type, id) {
            var ids, index

            ids = data.allItems[type].map(function(current) {
              return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
              data.allItems[type].splice(index, 1);
            }

          },

          getBudget: function() {
              return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp
              };
            },

        testing: function() {
          console.log(data);
        }
    };

})();




// DISPLAY MODULE
var displayModule = (function() {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        avialableBudgetLabel: '.budget__value--small',
        dailyBudgetLabel: '.budget__value--large',
        incomeBudgetLabel: '.budget__income--value',
        expensesBudgetLabel: '.budget__expenses--value',
        container: '.container'
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        addListItem: function(obj, type) {
          var html, newHtml, element;
          // Create HTML string with placeholder text

          if (type === 'inc') {
          element = DOMstrings.incomeContainer;

          html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="fas fa-minus-circle"></i></button></div></div> </div>';
          } else if (type === 'exp') {
          element = DOMstrings.expensesContainer;

          html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="fas fa-minus-circle"></i></button></div></div></div>';
          }
          // Replace the placeholder text some actual data
          newHtml = html.replace('%id%', obj.id);
          newHtml = newHtml.replace('%description%', obj.description);
          newHtml = newHtml.replace('%value%', obj.value);

          // Insert the HTML into the DOM
          document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        clearFields: function() {
          var fields, fieldsArray;

          fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

          fieldsArray = Array.prototype.slice.call(fields);

          fieldsArray.forEach(function(current, index, array) {
            current.value = "";
          });

          fieldsArray[0].focus();

        },

        displayBudget: function(obj) {

          document.querySelector(DOMstrings.avialableBudgetLabel).textContent = obj.budget;
          // document.querySelector(DOMstrings.dailyBudgetLabel).textContent = obj.budget;
          document.querySelector(DOMstrings.incomeBudgetLabel).textContent = obj.totalInc;
          document.querySelector(DOMstrings.expensesBudgetLabel).textContent = obj.totalExp;

        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    };

})();




// GLOBAL APP MODULE
var globalModule = (function(budgetModule, displayModule) {

    var setupEventListeners = function() {
        var DOM = displayModule.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

    };

    var updateBudget = function () {

      // 1. Calculate and update budget
      budgetModule.calculateBudget();

      // 2. Return the budget
      var budget = budgetModule.getBudget();

      // 3. Display the budget on the UI
      displayModule.displayBudget(budget);
    };

    var ctrlAddItem = function() {
          var input, newItem;

              // 1. Get the field input data
              input = displayModule.getInput();

              if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
              // 2. Add the item to the budget globalModule
              newItem = budgetModule.addItem(input.type, input.description, input.value);

              // 3. Add the item to the UI
              displayModule.addListItem(newItem, input.type);

              // 4. Clear the fields
              displayModule.clearFields();

              // 5. Calculate and update budget
              updateBudget();
            }

    };

    var ctrlDeleteItem = function(event) {
      var itemID, splitID, type, ID;

      itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

      if(itemID) {

        // inc-1
        splitID = itemID.split('-');
        type = splitID[0];
        ID = parseInt(splitID[1]);

        // 1. Delete the item from data structure
        budgetCtrl.deleteItem(type, ID);

        // 2. Delete the item from the UI

        // 3. Update and show the new budget

      }

    };

    return {
        init: function() {
            console.log('Application has started.');
            displayModule.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0
            });
            setupEventListeners();
        }
    };

})(budgetModule, displayModule);


globalModule.init();
