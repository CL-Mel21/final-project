import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import BookList from "../BookList";
import Header from "../Header";
import { Pagination, Box } from "@mui/material";

const SearchResults = () => {
  let params = useParams();
  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${params.input}&maxResults=40`
    )
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        console.log(jsonData.items);
        setBookList(jsonData.items);
      })
      .catch((error) => console.log(error.message));
  }, [params]);

  return (
    <>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <Header />
      </Link>
      <Pagination count={10} variant="outlined" color="secondary" />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {bookList.map((book) => {
          return <BookList key={book.id} book={book} />;
        })}
      </Box>
    </>
  );
};

export default SearchResults;
