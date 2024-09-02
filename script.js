// scripts.js

document.addEventListener("DOMContentLoaded", function() {
    const expenseForm = document.getElementById('expenseForm');
    const expenseTableBody = document.getElementById('expenseTableBody');
    const filterCategory = document.getElementById('filterCategory');
    const search = document.getElementById('search');
  
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
    expenseForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const description = document.getElementById('description').value;
      const amount = document.getElementById('amount').value;
      const category = document.getElementById('category').value;
      const date = document.getElementById('date').value;
      
      const expense = { description, amount, category, date };
      expenses.push(expense);
      localStorage.setItem('expenses', JSON.stringify(expenses));
      
      addExpenseToTable(expense);
      expenseForm.reset();
    });
  
    function addExpenseToTable(expense) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${expense.description}</td>
        <td>${expense.amount}</td>
        <td>${expense.category}</td>
        <td>${expense.date}</td>
        <td><button onclick="deleteExpense(${expenses.indexOf(expense)})">Delete</button></td>
      `;
      expenseTableBody.appendChild(row);
    }
  
    expenses.forEach(addExpenseToTable);
  
    window.deleteExpense = function(index) {
      expenses.splice(index, 1);
      localStorage.setItem('expenses', JSON.stringify(expenses));
      expenseTableBody.innerHTML = '';
      expenses.forEach(addExpenseToTable);
    }
  
    filterCategory.addEventListener('change', function() {
      const category = filterCategory.value;
      expenseTableBody.innerHTML = '';
      const filteredExpenses = category === 'all' ? expenses : expenses.filter(expense => expense.category === category);
      filteredExpenses.forEach(addExpenseToTable);
    });
  
    search.addEventListener('input', function() {
      const query = search.value.toLowerCase();
      expenseTableBody.innerHTML = '';
      const filteredExpenses = expenses.filter(expense => expense.description.toLowerCase().includes(query));
      filteredExpenses.forEach(addExpenseToTable);
    });
  
    document.getElementById('downloadReport').addEventListener('click', function() {
      const csvContent = "data:text/csv;charset=utf-8,"
        + "Description,Amount,Category,Date\n"
        + expenses.map(e => `${e.description},${e.amount},${e.category},${e.date}`).join("\n");
  
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "expenses_report.csv");
      document.body.appendChild(link);
      link.click();
    });
  });
  