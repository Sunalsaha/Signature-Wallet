import React, { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./withdraw.scss";

const WithdrawSection = forwardRef((props, ref) => {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000); // Auto-hide message after 3s
  };

  return (
    <motion.section
      className="withdraw-section"
      ref={ref}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2>Withdraw Funds</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Amount:
          <input type="number" placeholder="Enter amount" />
        </label>
        <label>
          Wallet Address:
          <input type="text" placeholder="0x..." />
        </label>
        <button type="submit">Confirm Withdraw</button>
      </form>

      <AnimatePresence>
        {success && (
          <motion.div
            className="success-message"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            🎉Withdrawal Successful!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
});

export default WithdrawSection;
