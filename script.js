const form = document.getElementById("transaction-form");
const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const list = document.getElementById("list");
const balance = document.getElementById("balance");

let transactions = [];

// Add Transaction
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const desc = descInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (desc === "" || isNaN(amount)) {
    alert("Please enter valid data");
    return;
  }

  const transaction = {
    id: Date.now(),
    desc,
    amount
  };

  transactions.push(transaction);
  addToDOM(transaction);
  updateBalance();

  descInput.value = "";
  amountInput.value = "";
});

// Add item to UI
function addToDOM(transaction) {
  const li = document.createElement("li");

  li.classList.add(transaction.amount > 0 ? "income" : "expense");

  li.innerHTML = `
    ${transaction.desc}
    <span>
      ₹${transaction.amount}
      <button onclick="deleteTransaction(${transaction.id})">❌</button>
    </span>
  `;

  list.appendChild(li);
}

// Update Balance
function updateBalance() {
  const total = transactions.reduce((sum, t) => sum + t.amount, 0);
  balance.innerText = total.toFixed(2);
}

// Delete Transaction
function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  list.innerHTML = "";
  transactions.forEach(addToDOM);
  updateBalance();
}