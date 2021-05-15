var totalIncome = document.querySelector("#totalIncome")
var amountRemain = document.querySelector("#amountRemain")
var totalExpense = document.querySelector("#totalExpense")
var btnExpense = document.querySelector("#addExpense")
var historyList = document.querySelector("#historyList")


var transactionType = "I"
var id
var date

var transactionTypeOption = document.querySelector("#transactionTypeOption").addEventListener('change', function () {
    if (this.checked) {
        btnExpense.innerHTML = "Add Expense"
        transactionType = 'E'
    } else {
        btnExpense.innerHTML = "Add Income"
        transactionType = 'I'
    }
})

function getLocalStorage() {
    var getLocalStorage = localStorage.getItem("BUDGETAPPTRANSACTIONS")
    if (getLocalStorage === null) {
        transactions = []
    } else {
        transactions = JSON.parse(getLocalStorage)
    }
}

// Display transations on loading page
displayTransactions()
// calculate and display total income, total expense and amount remaining
calculate()


function displayTransactions() {
    getLocalStorage()

    var newLiTag = ''
    transactions.forEach((transaction, index) => {
        reason = transaction.reason
        date = transaction.date
        amount = transaction.amount
        transactionType = transaction.transactionType

        newLiTag += `<li class = "item">
            <span class ="icon"></span>
            <div>
                <p class ="reason">${reason}</p>
                <p class="date">${date.toString()}</p>
            </div>
            <p class = "amount">$${amount}</p>
            <span class="option">x</span>
            </li>`
    });
    // Add the list tags to the history list 
    historyList.innerHTML = newLiTag;
}




// Handle the add transaction button
btnExpense.onclick =  function addTransaction() {
    var reason = document.querySelector("#reason").value
    var amount = document.querySelector("#amount").value
    if(reason && amount){
        // Create the single transaction array
        var transaction = {
            id: Math.floor(Math.random() * 10000),
            reason: reason,
            date: new Date(),
            transactionType: transactionType,
            amount: parseFloat(amount),
        }

        console.log(transactionType)
        // Get localStorage
        getLocalStorage()

        // add new transaction to transactions array
        transactions.unshift(transaction)

        // Saving transactions array to local storage
        localStorage.setItem("BUDGETAPPTRANSACTIONS", JSON.stringify(transactions))
        console.log(transactions)

        //  Display the available transaction history
        displayTransactions()

        // function to calculate and display total income, total expense and amount remaining
                calculate()

        //  Set the input boxes to empty
                
            document.querySelector("#reason").innerHTML = ""
            document.querySelector("#amount").innerHTML = ""
        }


    else{
        alert("Input cannot be empty")
    } 
  }


function calculate() {
    getLocalStorage()
    // initialize the total income and totalExpense count
    var income = 0.0
    var expense = 0.0

    transactions.forEach((transaction, index) => {
        if (transaction.transactionType === "I") {
            income += transaction.amount
        }
        else {
            expense += transaction.amount
        }
    })
    var amountRemaining = (income - expense)

    totalIncome.innerHTML = "$" + income.toFixed(2)
    totalExpense.innerHTML = "$" + expense.toFixed(2)
    if(amountRemaining < 0){
        amountRemain.innerHTML = "You are in debt of $" + -1*amountRemaining.toFixed(2)
    }else{
        amountRemain.innerHTML = "$" + amountRemaining.toFixed(2)

    }
    
    
    function delTransaction(id){
        transactions.forEach((transaction, index) => {
            if (transaction.id === id) {
                
            }
        })
    }
}
