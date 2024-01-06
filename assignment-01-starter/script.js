const addExpenseButton = document.getElementById("add-expense-button")

const descriptionInput = document.getElementById("description")

const valueInput = document.getElementById("value")

const selectInput = document.getElementById("type")

const incomeList = document.getElementById("income-list")

const expenseList = document.getElementById("expense-list")

const totalIncome = document.getElementById("total-income")

const totalExpense = document.getElementById("total-expense")

const totalBudget = document.getElementById("total-budget")


function formatMoney(value){
  return Math.abs(Number(value)).toLocaleString(undefined, {minimumFractionDigits : 2}) 
}

function calculateIncome(){
  let sum = 0

  for(let item of incomeList.children){



    const valueString =  item.children[0].children[1].children[0].innerHTML.replace(/,/g,"")

  
  sum += parseFloat(valueString)

  }
  
  totalIncome.innerHTML= formatMoney(sum)

  return sum;
}

calculateIncome();

function calculateExpense(){
  let sum = 0

  for(let item of expenseList.children){



    const valueString =  item.children[0].children[1].children[0].innerHTML.replace(/,/g,"")

  
  sum += parseFloat(valueString)

  }
  
  totalExpense.innerHTML= formatMoney(sum)

  return sum;
}

calculateExpense();

function calculateBudget() {
  totalBudget.innerHTML = formatMoney(calculateIncome() - calculateExpense());
}

calculateBudget();



function howToDo(){

  const description = descriptionInput.value
  const value = valueInput.value
  const type = selectInput.value

  //data validation

  const errors = [];

  if(description.length === 0){
    errors.push("Please enter the description")
  }

  if(value.length === 0){
    errors.push("Please enter the value")
  }

  if(errors.length > 0){
    alert(errors)
    return
  }

  // insert entry

  const list = type === "income" ? incomeList : expenseList;
  const colorClass = type === 'income' ? 'text-green-600' : 'text-red-600';
  const sign = type === "income" ? "+" : "-"




  const newEntryHtml =` 
  <li class="py-2.5">
  <div class="group flex justify-between gap-2 text-sm">
    <span>${description}</span>
        <div>
      <span class="${colorClass}">${sign}${formatMoney(value)}</span>
      <span
        class="ml-2 hidden cursor-pointer font-medium text-red-500 group-hover:inline-block"
      >
        Delete
      </span>
    </div>
  </div>
</li>
`;


list.innerHTML=list.innerHTML + newEntryHtml 



  
//update total income

calculateIncome();
calculateExpense();
calculateBudget();
  
}
addExpenseButton.addEventListener("click", howToDo) 