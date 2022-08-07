import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import BookList from "../BookList";
import Header from "../Header";
import { Pagination, Grid, Box } from "@mui/material";

const SearchResults = () => {
  let { input } = useParams();
  const [bookList, setBookList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(4);
  useEffect(() => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${input}&maxResults=24&startIndex=${(currentPage-1)*24+1}`
    )
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        console.log(jsonData.items);
        setBookList(jsonData.items);
      })
      .catch((error) => console.log(error.message));
  }, [input, currentPage]);

  useEffect(()=>{
    if (bookList.length < 24) {
      setPageCount(currentPage)
    } else {
      setPageCount(currentPage+3)
    }
  },[bookList, currentPage]);

const handleSelectPage = (e, num) =>{
  console.log(num)
  setCurrentPage(num);
}


  return (
    <>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <Header />
      </Link>
      <Box
        sx={{
          margin: "0",
          width: "100%",
          height: "50px",
          alignItems:"center",
          justifyContent:"center",
          display:"flex",
          background:
            "linear-gradient(180deg, rgba(255,254,253,0.3) 0%, rgba(243,243,242,0.5) 30%, rgba(243,243,242,0.5) 70%, rgba(233,233,233,0.3) 100%)",
        }}
      >
        <Pagination
          count={pageCount}
          siblingCount={0}
          boundaryCount={0}
          variant="outlined"
          onChange={handleSelectPage}
        />
      </Box>

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
