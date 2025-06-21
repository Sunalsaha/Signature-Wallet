import React, { useState } from "react";
import "./Transactions.scss"; // ✅ Correct spelling

const sampleTransactions = [
  { id: 1, description: "Sent 2 ETH to 0xabc", amount: "2 ETH", status: "Success" },
  { id: 2, description: "Requested 5 ETH", amount: "5 ETH", status: "Pending" },
  { id: 3, description: "Failed withdrawal", amount: "1 ETH", status: "Failed" },
  { id: 4, description: "Sent 1.1 ETH", amount: "1.1 ETH", status: "Success" },
  { id: 5, description: "Sent 0.8 ETH", amount: "0.8 ETH", status: "Pending" },
  { id: 6, description: "Sent 0.4 ETH", amount: "0.4 ETH", status: "Success" },
  { id: 7, description: "Sent 3 ETH", amount: "3 ETH", status: "Failed" },
  { id: 8, description: "Approved 1.5 ETH", amount: "1.5 ETH", status: "Success" },
];

const Transactions = () => {
  const [transactions] = useState(sampleTransactions);
  const [search, setSearch] = useState("");

  const filtered = transactions.filter((tx) =>
    tx.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="transactions-page">
      <div className="page-header">
        <h2>Transactions</h2>
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="transactions-list">
        {filtered.length > 0 ? (
          filtered.map((tx) => (
            <div className="transaction-card" key={tx.id}>
              <div className="info">
                <p className="description">{tx.description}</p>
                <span className="amount">{tx.amount}</span>
              </div>
              <span className={`status ${tx.status.toLowerCase()}`}>{tx.status}</span>
            </div>
          ))
        ) : (
          <p className="no-results">No transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default Transactions;
