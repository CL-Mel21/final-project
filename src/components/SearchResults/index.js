import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BookList from "../BookList";
import { Box } from "@mui/material";

const SearchResults = () => {
  let params = useParams();
  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${params.input}&maxResults=40`)
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
    <Box
    sx={{

        display: "flex",
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    }}
    >
      {bookList.map((book) => {
        return <BookList key={book.id} book={book} />;
      })}
    </Box>
  );
};

export default SearchResults;
