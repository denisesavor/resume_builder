import React, { useState } from 'react';

function ResumeBuilder() {
  const [clickCount, setClickCount] = useState(0);

  const handleButtonClick = () => {
    console.log('Button clicked!');
    setClickCount(prevCount => prevCount + 1);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Resume Builder</h1>
      <button
        type="button"
        onClick={handleButtonClick}
        className="btn btn-primary"
      >
        Click me!
      </button>
      <p className="mt-3">Button clicked {clickCount} times</p>
      <div className="mt-3">
        <h3>Debug Information:</h3>
        <pre>{JSON.stringify({ clickCount }, null, 2)}</pre>
      </div>
    </div>
  );
}

export default ResumeBuilder;
