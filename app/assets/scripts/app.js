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


    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        dailyBudget: -1
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
        container: '.container',
        dateLabel: '.budget__title--month'
    };

      var formatNumber = function(num, type) {
      var numSplit, int, dec, sign;

      num = Math.abs(num);
      num = num.toFixed(2);

      numSplit = num.split('.');

      int = numSplit[0];
      if (int.length > 3) {
          int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
      }


      dec = numSplit[1];

      // if (type === 'exp') {
      //   sign = '-'
      // } else {
      //   sign = '+'
      // };

      return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

    };

    var nodeListForEach = function(list, callback) {
      for (var i = 0; i < list.length; i++) {
        callback(list[i], i);
      }
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
          newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

          // Insert the HTML into the DOM
          document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem: function(selectorID) {

          var el = document.getElementById(selectorID);
          el.parentNode.removeChild(el);


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
          var type, dailyBudget, days;

          if (obj.budget > 0) {
            type = 'inc'
          } else if (obj.budget < 0) {
            type = 'exp'
          } else {
            type = ''
          };

          days = 31;

          dailyBudget = obj.budget / days;

          document.querySelector(DOMstrings.avialableBudgetLabel).textContent = formatNumber(obj.budget, type);
          document.querySelector(DOMstrings.dailyBudgetLabel).textContent = formatNumber(dailyBudget, type);
          document.querySelector(DOMstrings.incomeBudgetLabel).textContent = formatNumber(obj.totalInc, 'inc');
          document.querySelector(DOMstrings.expensesBudgetLabel).textContent = formatNumber(obj.totalExp, 'exp');


        },


        displayMonth: function() {
          var year, month, now, months;

          var now = new Date();

          months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
          month = now.getMonth();
          year = now.getFullYear();
          document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' +year;
        },

        daysInMonth: function() {

          //   // Month is 1-indexed (January is 1, February is 2, etc).
          //   function daysInMonth (month, year) {
          //   return new Date(year, month, 0).getDate();
          // }
          //
          //   // July
          //   daysInMonth(7,2009); // 31

        };

        changedType: function() {

          var fields = document.querySelectorAll(
            DOMstrings.inputType + ',' +
            DOMstrings.inputDescription + ',' +
            DOMstrings.inputValue);


        nodeListForEach(fields, function(cur) {

          cur.classList.toggle('red-focus');

        });

        document.querySelector(DOMstrings.inputBtn).classList.toggle('red');

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

        document.querySelector(DOM.inputType).addEventListener('change', displayModule.changedType);

    };


    var updateBudget = function() {

      // 1. Calculate and update budget
      budgetModule.calculateBudget();

      // 2. Return the budget
      var budget = budgetModule.getBudget();

      // 3. Display the budget on the UI
      displayModule.displayBudget(budget);
    };

    var updateDailyBudget = function() {

      // 1. Calculate avialable daily money
      budgetModule.calculateDailyBudget();

      // 2. Read daily money from budget controller
      var dailyBudgetOutput = budgetModule.getDaily();

      // 3. Update in display module new daily budget
      console.log(dailyBudgetOutput);


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

              // 6. Calculate and update daily budget
              updateDailyBudget();

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
        budgetModule.deleteItem(type, ID);

        // 2. Delete the item from the UI
        displayModule.deleteListItem(itemID);

        // 3. Update and show the new budget
        updateBudget();

        // 4. Update and show the new daily budget
        updateDailyBudget();

      }

    };

    return {
        init: function() {
            console.log('Application has started.');
            displayModule.displayMonth();
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
