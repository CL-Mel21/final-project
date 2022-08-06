import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";

const Homepage = () => {
  const [input, setInput] = useState('');
  const inputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <>
      <Header />
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
