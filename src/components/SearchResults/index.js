import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import BookList from "../BookList";
import Header from "../Header";
import { Pagination, Grid } from "@mui/material";

const SearchResults = () => {
  let { input } = useParams();
  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${input}&maxResults=24`
    )
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        console.log(jsonData.items);
        setBookList(jsonData.items);
      })
      .catch((error) => console.log(error.message));
  }, [input]);

  return (
    <>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <Header />
      </Link>
      <Pagination
        count={10}
        variant="outlined"
        style={{ margin: "0 auto 30px", width: "350px" }}
      />

      <Grid
        container
        columns={{ xs: 4, sm: 7, md: 10, lg: 12 }}
        direction="row"
        justifyContent="center"
      >
        {bookList.map((book) => {
          return (
            <Grid item xs={3} key={book.id}>
              <BookList book={book} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default SearchResults;
