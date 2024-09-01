import React, { useState } from 'react';
import './styles/Form.css';
import { exit } from 'process';

function isJsonString(str:string) {
    try {
        JSON.parse(str);
    } catch (e) {
        alert("Please pass the valid json");
        return false;
    }
    return JSON.parse(str);
}

const ScanResultForm: React.FC = () => {
  const [repositoryName, setRepositoryName] = useState('');
  const [status, setStatus] = useState('Queued');
  const [findings, setFindings] = useState('');
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(isJsonString(findings))
    {
        const result = {
          repositoryName,
          status,
          findings: isJsonString(findings),
          queuedAt: new Date().toISOString(),
        };
    
        try {
          const response = await fetch('http://localhost:3000/api/results', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(result),
          });
    
          if (!response.ok) {
            throw new Error('Failed to submit scan result');
          }
    
          // Reset form on successful submission
          setRepositoryName('');
          setStatus('Queued');
          setFindings('');
          alert('Scan result submitted successfully');
        } catch (error) {
          console.error(error);
          alert('Error submitting scan result');
        }
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="repositoryName">Repository Name</label>
        <input 
          type="text" 
          id="repositoryName" 
          value={repositoryName} 
          required
          onChange={(e) => setRepositoryName(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select 
          id="status" 
          value={status} 
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Queued">Queued</option>
          <option value="In Progress">In Progress</option>
          <option value="Success">Success</option>
          <option value="Failure">Failure</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="findings">Findings (JSON)</label>
        <textarea 
          id="findings" 
          value={findings} 
          required
          onChange={(e) => setFindings(e.target.value)
          } 
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ScanResultForm;
