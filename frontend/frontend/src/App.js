import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await axios.post('http://127.0.0.1:5000/bfhl', parsedInput);
      setResponse(res.data);
      setError('');
    } catch (err) {
      setError('Invalid JSON input');
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!response) return null;
    const { numbers, alphabets, highest_alphabet } = response;
    return (
      <div>
        {selectedOptions.includes('Numbers') && <div>Numbers: {numbers.join(', ')}</div>}
        {selectedOptions.includes('Alphabets') && <div>Alphabets: {alphabets.join(', ')}</div>}
        {selectedOptions.includes('Highest alphabet') && <div>Highest Alphabet: {highest_alphabet.join(', ')}</div>}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>ABCD123</h1>
      <textarea value={jsonInput} onChange={handleInputChange} placeholder="Enter JSON here" />
      <button onClick={handleSubmit}>Submit</button>
      {error && <div className="error">{error}</div>}
      {response && (
        <div>
          <select multiple={true} onChange={handleOptionChange}>
            <option value="Numbers">Numbers</option>
            <option value="Alphabets">Alphabets</option>
            <option value="Highest alphabet">Highest alphabet</option>
          </select>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;