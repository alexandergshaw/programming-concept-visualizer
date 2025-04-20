'use client';

import React, { useState } from 'react';
import '../../styles/object.css';

export default function ObjectConcept() {
  const [obj, setObj] = useState<{ [key: string]: string }>({
    name: 'Alex',
    role: 'Student',
    language: 'JavaScript',
  });

  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const handleAdd = () => {
    if (!key) return;
    setObj(prev => ({ ...prev, [key]: value }));
    setKey('');
    setValue('');
  };

  return (
    <div className="concept-container">
      <h2>JavaScript Objects</h2>
      <p>
        An object is a collection of <strong>key-value pairs</strong>. Keys are strings (or Symbols),
        and values can be anything.
      </p>

      <div className="object-display">
        <pre>{JSON.stringify(obj, null, 2)}</pre>
      </div>

      <div className="input-area">
        <input
          placeholder="key"
          value={key}
          onChange={e => setKey(e.target.value)}
        />
        <input
          placeholder="value"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button onClick={handleAdd}>Add / Update</button>
      </div>

      <div className="object-visual">
        {Object.entries(obj).map(([k, v]) => (
          <div key={k} className="object-pair">
            <div className="object-key">{k}</div>
            <div className="object-arrow">→</div>
            <div className="object-value">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
