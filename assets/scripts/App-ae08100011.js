!function(e){var t={};function n(i){if(t[i])return t[i].exports;var a=t[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:i})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";var i,a=document.getElementsByClassName("accordion");for(i=0;i<a.length;i++)a[i].addEventListener("click",function(){this.classList.toggle("active");var e=this.nextElementSibling;"block"===e.style.display?e.style.display="none":e.style.display="block"});var l,o,u,c,d,r,s,p,v,g=(l=function(e){var t=0;o.allItems[e].forEach(function(e){t+=e.value}),o.totals[e]=t},o={allItems:{exp:[],inc:[]},totals:{exp:0,inc:0},budget:0},{addItem:function(e,t,n){var i=void 0,a=void 0;return a=o.allItems[e].length>0?o.allItems[e][o.allItems[e].length-1].id+1:0,"exp"===e?i=new function(e,t,n){this.id=e,this.description=t,this.value=n}(a,t,n):"inc"===e&&(i=new function(e,t,n){this.id=e,this.description=t,this.value=n}(a,t,n)),o.allItems[e].push(i),i},calculateBudget:function(){l("exp"),l("inc"),o.budget=o.totals.inc-o.totals.exp},deleteItem:function(e,t){var n;-1!==(n=o.allItems[e].map(function(e){return e.id}).indexOf(t))&&o.allItems[e].splice(n,1)},getBudget:function(){return{budget:o.budget,totalInc:o.totals.inc,totalExp:o.totals.exp}},getDaysInMonth:function(){return n=new Date,e=n.getMonth()+1,t=n.getFullYear(),new Date(t,e,0).getDate();var e,t,n}}),m=(u={inputType:".add__type",inputDescription:".add__description",inputValue:".add__value",inputBtn:".add__btn",incomeContainer:".income__list",expensesContainer:".expenses__list",avialableBudgetLabel:".budget__value--small",dailyBudgetLabel:".budget__value--large",incomeBudgetLabel:".budget__income--value",expensesBudgetLabel:".budget__expenses--value",container:".container",dateLabel:".budget__title--month"},c=function(e,t){var n,i=void 0;return(i=(n=(e=(e=Math.abs(e)).toFixed(2)).split("."))[0]).length>3&&(i=i.substr(0,i.length-3)+","+i.substr(i.length-3,3)),("exp"===t?"-":"+")+" "+i+"."+n[1]},{getInput:function(){return{type:document.querySelector(u.inputType).value,description:document.querySelector(u.inputDescription).value,value:parseFloat(document.querySelector(u.inputValue).value)}},addListItem:function(e,t){var n=void 0,i=void 0,a=void 0;"inc"===t?(a=u.incomeContainer,n='<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="fas fa-minus-circle"></i></button></div></div> </div>'):"exp"===t&&(a=u.expensesContainer,n='<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="fas fa-minus-circle"></i></button></div></div></div>'),i=(i=(i=n.replace("%id%",e.id)).replace("%description%",e.description)).replace("%value%",c(e.value,t)),document.querySelector(a).insertAdjacentHTML("beforeend",i)},deleteListItem:function(e){var t=document.getElementById(e);t.parentNode.removeChild(t)},clearFields:function(){var e,t=void 0;e=document.querySelectorAll(u.inputDescription+", "+u.inputValue),(t=Array.prototype.slice.call(e)).forEach(function(e,t,n){e.value=""}),t[0].focus()},displayBudget:function(e){var t,n,i=void 0;i=e.budget>0?"inc":e.budget<0?"exp":"",n=g.getDaysInMonth(),t=e.budget/n,console.log(t+" "+n),document.querySelector(u.avialableBudgetLabel).textContent=c(e.budget,i),document.querySelector(u.dailyBudgetLabel).textContent=c(t,i),document.querySelector(u.incomeBudgetLabel).textContent=c(e.totalInc,"inc"),document.querySelector(u.expensesBudgetLabel).textContent=c(e.totalExp,"exp")},displayMonth:function(){var e,t,n,i;return n=["January","February","March","April","May","June","July","August","September","October","November","December"],t=(i=new Date).getMonth(),e=i.getFullYear(),document.querySelector(u.dateLabel).textContent=n[t]+" "+e,new Date(e,t,0).getDate()},changedType:function(){!function(e,t){for(var n=0;n<e.length;n++)t(e[n],n)}(document.querySelectorAll(u.inputType+","+u.inputDescription+","+u.inputValue),function(e){e.classList.toggle("red-focus")}),document.querySelector(u.inputBtn).classList.toggle("red")},getDOMstrings:function(){return u}});(d=g,r=m,s=function(){d.calculateBudget();var e=d.getBudget();r.displayBudget(e)},p=function(){var e,t=void 0;""!==(e=r.getInput()).description&&!isNaN(e.value)&&e.value>0&&(t=d.addItem(e.type,e.description,e.value),r.addListItem(t,e.type),r.clearFields(),s())},v=function(e){console.log(e.target);var t=void 0,n=void 0,i=void 0,a=void 0;for(e=e.target;!e.getAttribute("id");)e=e.parentNode;(t=e.id)&&(i=(n=t.split("-"))[0],a=parseInt(n[1]),d.deleteItem(i,a),r.deleteListItem(t),s())},{init:function(){var e;console.log("Application has started."),r.displayMonth(),r.displayBudget({budget:0,totalInc:0,totalExp:0}),e=r.getDOMstrings(),document.querySelector(e.inputBtn).addEventListener("click",p),document.addEventListener("keypress",function(e){13!==e.keyCode&&13!==e.which||p()}),document.querySelector(e.container).addEventListener("click",v),document.querySelector(e.inputType).addEventListener("change",r.changedType)}}).init()}]);