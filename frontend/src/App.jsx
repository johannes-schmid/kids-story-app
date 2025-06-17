import React, { useState } from 'react';

const examples = [
  'A brave little mouse exploring the forest',
  'A trip to the moon',
  'The magic treehouse in our backyard'
];

const ageGroups = [
  { value: '3-5', label: 'Age 3-5' },
  { value: '6-8', label: 'Age 6-8' },
  { value: '9-12', label: 'Age 9-12' }
];

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [ageGroup, setAgeGroup] = useState('3-5');
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleExample = (text) => setPrompt(text);

  const generateStory = async () => {
    setLoading(true);
    setPages([]);
    try {
      const resp = await fetch('http://localhost:3001/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, ageGroup })
      });
      const data = await resp.json();
      setPages(data.pages || []);
    } catch (e) {
      console.error(e);
      alert('Failed to generate story');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Kids Story Generator</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="What is the story about?"
      />
      <div className="controls">
        <select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)}>
          {ageGroups.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
        </select>
        <button onClick={generateStory} disabled={loading || !prompt}>Generate</button>
      </div>
      <div className="examples">
        <p>Examples:</p>
        {examples.map(ex => (
          <button key={ex} onClick={() => handleExample(ex)}>{ex}</button>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      <div className="pages">
        {pages.map((p, i) => (
          <div key={i} className="page">
            <img src={p.image} alt="illustration" />
            <p>{p.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
