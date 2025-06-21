import React, { useState, useRef } from "react";
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { useInView } from "framer-motion";
import { Link } from "react-router-dom";
import AnimatedNumber from "./AnimatedNumber";
import WithdrawSection from "./WithdrawSection";
import "./dashboard.scss";

const Dashboard = () => {
  const [theme, setTheme] = useState("dark");
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [transactions, setTransactions] = useState([
    { name: "Transaction 1", status: "Pending" },
    { name: "Transaction 2", status: "Pending" },
  ]);

  const [signers, setSigners] = useState([
    { name: "Alice", editing: false },
    { name: "Bob", editing: false },
  ]);
  const [newSignerName, setNewSignerName] = useState("");
  const [addingSigner, setAddingSigner] = useState(false);

  const assetRef = useRef(null);
  const isAssetInView = useInView(assetRef, { once: true });

  const handleWithdrawClick = () => setShowWithdraw(true);
  const handleBackToDeposit = () => setShowWithdraw(false);

  const handleApprove = (index) => {
    const txName = transactions[index].name;
    setTransactions((prev) => prev.filter((_, i) => i !== index));
    setSuccessMessage(`${txName} approved successfully!`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleAddSigner = () => {
    if (newSignerName.trim() === "") return;
    setSigners((prev) => [...prev, { name: newSignerName.trim(), editing: false }]);
    setNewSignerName("");
    setAddingSigner(false);
  };

  const handleEditToggle = (index) => {
    setSigners((prev) =>
      prev.map((signer, i) => (i === index ? { ...signer, editing: true } : signer))
    );
  };

  const handleSaveEdit = (index, newName) => {
    if (newName.trim() === "") return;
    setSigners((prev) =>
      prev.map((signer, i) =>
        i === index ? { name: newName.trim(), editing: false } : signer
      )
    );
  };

  const handleCancelEdit = (index) => {
    setSigners((prev) =>
      prev.map((signer, i) => (i === index ? { ...signer, editing: false } : signer))
    );
  };

  const handleDeleteSigner = (index) => {
    setSigners((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={`dashboard-container ${theme}`}>
      <main className="main">
        <div className="topbar">
          <div className="network">Network: Ethereum</div>
          <div className="wallet">Wallet: 0x123...456</div>
          {/* 🌗 Updated Toggle Button */}
          <button
            className={`theme-toggle-icon ${theme}`}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
        </div>

        <section className="assets-value" ref={assetRef}>
          <p>Total Assets</p>
          <h1>
            ${isAssetInView ? <AnimatedNumber value={12345.67} /> : "0.00"}
            <span> USD</span>
          </h1>

          <div className="buttons">
            {!showWithdraw ? (
              <>
                <button className="green">Deposit</button>
                <button onClick={handleWithdrawClick}>Withdraw</button>
              </>
            ) : (
              <button onClick={handleBackToDeposit}>Back to Deposit</button>
            )}
          </div>
        </section>

        {showWithdraw && <WithdrawSection />}

        {!showWithdraw && (
          <>
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}

            {transactions.length > 0 && (
              <section className="pending-transactions">
                <h2>Pending Transactions</h2>
                {transactions.map((tx, index) => (
                  <div className="transaction-row" key={index}>
                    <span>{tx.name}</span>
                    <button onClick={() => handleApprove(index)}>Approve</button>
                  </div>
                ))}
              </section>
            )}
          </>
        )}

        <section className="bottom-section">
          <div className="manage-signers">
            <div className="section-header">
              <h3>Manage Signers</h3>
              {!addingSigner ? (
                <button className="add-signer" onClick={() => setAddingSigner(true)}>
                  <FaPlus /> Add
                </button>
              ) : (
                <div className="add-form">
                  <input
                    type="text"
                    value={newSignerName}
                    onChange={(e) => setNewSignerName(e.target.value)}
                    placeholder="Enter signer name"
                  />
                  <button onClick={handleAddSigner}><FaCheck /></button>
                  <button onClick={() => setAddingSigner(false)}><FaTimes /></button>
                </div>
              )}
            </div>

            <ul className="signer-list">
              {signers.map((signer, index) => (
                <li key={index}>
                  {!signer.editing ? (
                    <>
                      {signer.name}
                      <div className="actions">
                        <FaEdit onClick={() => handleEditToggle(index)} />
                        <FaTrash onClick={() => handleDeleteSigner(index)} />
                      </div>
                    </>
                  ) : (
                    <div className="edit-form">
                      <input
                        type="text"
                        defaultValue={signer.name}
                        onChange={(e) =>
                          setSigners((prev) =>
                            prev.map((s, i) =>
                              i === index ? { ...s, name: e.target.value } : s
                            )
                          )
                        }
                      />
                      <button onClick={() => handleSaveEdit(index, signer.name)}><FaCheck /></button>
                      <button onClick={() => handleCancelEdit(index)}><FaTimes /></button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="transaction-history">
            <div className="section-header">
              <h3>Transaction History</h3>
              <Link to="/transactions" className="view-all-link">View All</Link>
            </div>
            <ul>
              <li>Sent 2 ETH <span className="status success">Success</span></li>
              <li>Sent 0.5 ETH <span className="status failed">Failed</span></li>
              <li>Sent 1.3 ETH <span className="status pending">Pending</span></li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
