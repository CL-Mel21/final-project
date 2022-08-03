import { useState } from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [input, setInput] = useState('');
  const inputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <>
      <h1>Find a Book</h1>
      <strong>Quick Search</strong>
      <input
        data-testid="input-box"
        type="text"
        value={input}
        onChange={inputChange}
      />
      <Link to={`/results/${input}`}>
        <button>Search</button>
      </Link>
    </>
  );
};

export default Homepage;
