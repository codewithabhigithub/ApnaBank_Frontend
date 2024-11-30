import React from 'react';

function ApnaBankHeader() {
  return (
    <header style={{ backgroundColor: 'red', color: '$800', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>G4 Bank</div>
      <nav>
        <ul style={{ listStyle: 'none', display: 'flex' }}>
          <li><a href="#">Home</a></li>
          <li><a href="#">Accounts</a></li>
          <li><a href="#">Loans</a></li>
          <li><a href="#">Investments</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default ApnaBankHeader;
