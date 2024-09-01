import React from 'react';

interface DynamicFieldProps {
  label: string;
  fields: string[];
//   messageIcon: React.ReactNode;
}

const Badge: React.FC<DynamicFieldProps> = ({ label, fields }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', width: '90%', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '8px', left: '8px' }}>
        <strong>{label}</strong>
      </div>

      <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
        {fields.map((field, index) => (
          <div key={index} style={{ marginBottom: '8px' }}>
            {field}
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: '8px', left: '8px' }}>
        {/* {messageIcon} */}
      </div>
    </div>
  );
};

export default Badge;