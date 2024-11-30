import React, { useState } from 'react';
import './emi.css';

function EMI() {
  const [principal, setPrincipal] = useState('');
  const [interest, setInterest] = useState('');
  const [tenure, setTenure] = useState('');
  const [emi, setEMI] = useState('');

  const calculateEMI = () => {
    const loanAmount = parseFloat(principal);
    const interestRate = parseFloat(interest) / 100 / 12; // Monthly interest rate
    const loanTenure = parseInt(tenure);

    // EMI calculation formula
    const emi = (loanAmount * interestRate * Math.pow(1 + interestRate, loanTenure)) /
      (Math.pow(1 + interestRate, loanTenure) - 1);

    // Update the state with the calculated EMI
    setEMI(emi.toFixed(2));
  };

  return (
    <div className="emi-calculator">
      <h2>EMI Calculator</h2>
      <div>
        <label>Principal Amount:</label>
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          placeholder='Enter the amount'
          autoFocus
        />
      </div>
      <div>
        <label>Interest Rate (%):</label>
        <input
          type="number"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          placeholder='Enter the Interest Rate'
        />
      </div>
      <div>
        <label>Tenure (months):</label>
        <input
          type="number"
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
          placeholder='Enter the months'
        />
      </div>
      <button onClick={calculateEMI}>Calculate EMI</button>
      {emi && <p className="output">Your EMI: {emi}</p>}
    </div>
  );
}

export default EMI;
