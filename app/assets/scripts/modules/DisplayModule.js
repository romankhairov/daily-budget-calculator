// DISPLAY MODULE
module.exports = function(displayModule) {

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
          var type;

          if (obj.budget > 0) {
            type = 'inc'
          } else if (obj.budget < 0) {
            type = 'exp'
          } else {
            type = ''
          };

          document.querySelector(DOMstrings.avialableBudgetLabel).textContent = formatNumber(obj.budget, type);
          // document.querySelector(DOMstrings.dailyBudgetLabel).textContent = obj.budget;
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

};
