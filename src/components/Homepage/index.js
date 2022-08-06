import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import { Stack } from "@mui/material";

const Homepage = () => {
  const [input, setInput] = useState("");
  let navigate = useNavigate();
  const loadSearchResults = (e) => {
    if (e.key === "Enter") {
      return navigate(`/results/${input}`);
    }
  }

  return (
    <div className="webPage">
      <Header />
      <Stack
        spacing={1}
        justifyContent="center"
        alignItems="flex-start"
        style={{ width: "350px", margin: "0 auto" }}
      >
        <h2>Quick Search</h2>
        <div>
          <input
            data-testid="input-box"
            type="text"
            placeholder="Please Enter the Keywords"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={loadSearchResults}
          />
          <Link to={`/results/${input}`}>
            <button>Search</button>
          </Link>
        </div>
      </Stack>
    </div>
  );
};

export default Homepage;
