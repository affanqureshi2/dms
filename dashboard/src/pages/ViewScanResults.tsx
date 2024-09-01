import React from 'react';
import ScanResultList from '../components/ScanResultList';
import '../styles/App.css';

const ViewScanResults: React.FC = () => {

  return (
    <div className="container">
      <h2>Scan Results</h2>
      <ScanResultList />
    </div>
  );
};

export default ViewScanResults;
