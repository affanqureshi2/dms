import React from 'react';
import ScanResultForm from '../components/ScanResultForm';
import '../styles/App.css';

const SubmitScanResult: React.FC = () => {
  return (
    <div className="container">
      <h2>Submit Scan Result</h2>
      <ScanResultForm />
    </div>
  );
};

export default SubmitScanResult;
