(() => {
    const balanceAmount = document.getElementById('balanceAmount');
    const incomeAmount = document.getElementById('incomeAmount');
    const expenseAmount = document.getElementById('expenseAmount');
    const transactionList = document.getElementById('transactionList');
    const transactionForm = document.getElementById('transactionForm');
    const descriptionInput = document.getElementById('descriptionInput');
    const amountInput = document.getElementById('amountInput');
    const typeSelect = document.getElementById('typeSelect');
  
    let transactions = [];
  
    function formatCurrency(value) {
      return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    }
  
    function updateSummary() {
      let income = 0;
      let expense = 0;
      transactions.forEach(t => {
        if(t.type === 'income'){
          income += t.amount;
        } else {
          expense += t.amount;
        }
      });
      const balance = income - expense;
      balanceAmount.textContent = formatCurrency(balance);
      incomeAmount.textContent = formatCurrency(income);
      expenseAmount.textContent = formatCurrency(expense);
    }
  
    function renderTransactions() {
      transactionList.innerHTML = '';
      transactions.forEach((t, index) => {
        const li = document.createElement('li');
        li.className = t.type;
        li.setAttribute('data-index', index);
        li.setAttribute('tabindex', '0');
        li.title = `${t.type.charAt(0).toUpperCase() + t.type.slice(1)}: ${t.description}, Amount: ${formatCurrency(t.amount)}`;
  
        const desc = document.createElement('div');
        desc.className = 'transaction-description';
        desc.textContent = t.description;
  
        const amountDiv = document.createElement('div');
        amountDiv.className = 'transaction-amount ' + t.type;
        amountDiv.textContent = (t.type === 'expense' ? '-' : '+') + formatCurrency(t.amount);
  
        const btnDelete = document.createElement('button');
        btnDelete.className = 'btn-delete';
        btnDelete.setAttribute('aria-label', `Delete transaction: ${t.description}, amount ${formatCurrency(t.amount)}`);
        btnDelete.innerHTML = '&times;';
        btnDelete.addEventListener('click', () => {
          deleteTransaction(index);
        });
  
        li.appendChild(desc);
        li.appendChild(amountDiv);
        li.appendChild(btnDelete);
  
        transactionList.appendChild(li);
      });
    }
  
    function deleteTransaction(index) {
      transactions.splice(index, 1);
      updateSummary();
      renderTransactions();
    }
  
    function addTransaction(e) {
      e.preventDefault();
      const description = descriptionInput.value.trim();
      const amount = parseFloat(amountInput.value);
      const type = typeSelect.value;
      if(description && !isNaN(amount) && amount > 0 && (type === 'income' || type === 'expense')) {
        transactions.push({description, amount, type});
        updateSummary();
        renderTransactions();
        transactionForm.reset();
        descriptionInput.focus();
      } else {
        alert('Please enter valid description, positive amount, and select transaction type.');
      }
    }
  
    transactionForm.addEventListener('submit', addTransaction);
  
    // Initialize with demo data
    function initDemoData(){
      transactions = [
        {description: 'Salary', amount: 3000, type: 'income'},
        {description: 'Groceries', amount: 250, type: 'expense'},
        {description: 'Freelance Project', amount: 800, type: 'income'},
        {description: 'Rent', amount: 1200, type: 'expense'}
      ];
      updateSummary();
      renderTransactions();
    }
  
    initDemoData();
  })();
  