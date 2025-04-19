'use client';

import { useState } from 'react';
import '../../styles/array.css';

export default function ArrayConcept() {
  const [arr, setArr] = useState<number[]>([1, 2, 3]);

  const handlePush = () => {
    setArr([...arr, arr.length + 1]);
  };

  const handlePop = () => {
    setArr(arr.slice(0, -1));
  };

  return (
    <div className="array-container">
      <h2 className="array-title">JavaScript Arrays</h2>
      <p className="array-description">
        Arrays are ordered lists of values. You can add, remove, or transform elements using built-in methods like <code>push</code>, <code>pop</code>, <code>map</code>, and more.
      </p>

      <div className="array-box">
        {arr.map((val, idx) => (
          <div className="array-cell" key={idx}>
            <span className="array-index">{idx}</span>
            <span className="array-value">{val}</span>
          </div>
        ))}
      </div>

      <div className="array-buttons">
        <button onClick={handlePush}>Push</button>
        <button onClick={handlePop}>Pop</button>
      </div>
    </div>
  );
}
