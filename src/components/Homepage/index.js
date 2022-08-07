import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import BookListLayout from "../BookListLayout";
import { Stack, Box } from "@mui/material";

const NYT_API_KEY = process.env.REACT_APP_NYT_API_KEY;

const Homepage = () => {
  const [input, setInput] = useState("");
  const [bestSellers, setBestSellers] = useState([]);
  const [bestSellerItems, setBestSellerItems] = useState([]);
  let navigate = useNavigate();
  const loadSearchResults = (e) => {
    if (e.key === "Enter") {
      return navigate(`/results/${input}`);
    }
  };

  useEffect(() => {
    fetch(
      `https://api.nytimes.com/svc/books/v3/lists.json?api-key=${NYT_API_KEY}&list=hardcover-fiction`
    )
      .then((res) => res.json())
      .then((data) => {
        setBestSellers(data.results);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    let templist = [];
    console.log(bestSellers);
    bestSellers.forEach((book) => {
      console.log(book.book_details[0].title);
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${book.book_details[0].title}&maxResults=1`
      )
        .then((response) => {
          return response.json();
        })
        .then((jsonData) => {
          // console.log(index);
          // console.log(jsonData.items);
          templist = [...templist, jsonData.items[0]];
          console.log(templist);
          setBestSellerItems(templist);
          return templist;
        })
        .catch((error) => console.log(error.message));
    });
    console.log("templist");
    console.log(templist);
  }, [bestSellers]);

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

      <Box
        sx={{
          margin: "50px 0",
          padding: "0 100px",
          width: "100%",
          height: "50px",
          alignItems: "center",
          display: "flex",
          background:
            "linear-gradient(180deg, rgba(255,254,253,0.3) 0%, rgba(243,243,242,0.5) 30%, rgba(243,243,242,0.5) 70%, rgba(233,233,233,0.3) 100%)",
        }}
      >
        <h2>Best Sellers from New York Times</h2>
      </Box>
      <BookListLayout bookList={bestSellerItems} />
    </div>
  );
};

export default Homepage;
