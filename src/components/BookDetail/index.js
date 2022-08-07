import { Box, Stack, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../Header";

const BookDetail = () => {
  const params = useParams();
  const [book, setBook] = useState({
    title: "",
    authors: [],
    publisher: "",
    publishedDate: "",
    description: "",
    pageCount: 0,
    categories: [],
    averageRating: 0,
    imageLinks: {},
    industryIdentifiers: [],
  });
  const url = `https://www.googleapis.com/books/v1/volumes/${params.bookId}`;
  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        console.log(jsonData.volumeInfo);
        setBook(jsonData.volumeInfo);
      })
      .catch((error) => console.log(error.message));
  }, [url]);

  return (
    <div className="webPage">
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <Header />
      </Link>
      <Box
        sx={{
          maxWidth: "800px",
          m: "auto",
          p: "10px 20px",
        }}
      >
        <Stack direction="row" spacing={4}>
          <Box
            sx={{
              m: "25px 10px",
              width: "150px",
              height: "200px",
              justifyContent: "middle",
            }}
          >
            {book.imageLinks ? (
              <img src={book.imageLinks.thumbnail} alt={book.title} />
            ) : (
              <div className="noBookImg">
                <div>No Image Available</div>
              </div>
            )}
          </Box>
          <Box component="div" sx={{ display: "inline" }}>
            <h2>{book.title}</h2>
            {book.authors && <p>Author(s): {book.authors.join(", ")}</p>}
            {book.categories && <p>Categories: {book.categories.join(", ")}</p>}
            {book.industryIdentifiers && (
              <p>
                ISBN:{" "}
                {book.industryIdentifiers[0] &&
                  book.industryIdentifiers[0].identifier}
                {book.industryIdentifiers[1]
                  ? ", " +
                    (book.industryIdentifiers[1] &&
                      book.industryIdentifiers[1].identifier)
                  : null}
              </p>
            )}
            {book.publisher && <p>Publisher: {book.publisher}</p>}
            {book.publishedDate && <p>Published Date: {book.publishedDate}</p>}
            {book.pageCount && <p>Pages: {book.pageCount}</p>}
            {book.averageRating && (
              <Rating
                name="half-rating-read"
                value={book.averageRating}
                precision={0.1}
                readOnly
              />
            )}
          </Box>
        </Stack>
        <hr />
        <Box sx={{ width: "90%", m: "20px auto", textAlign: "justify" }}>
          <div dangerouslySetInnerHTML={{ __html: book.description }} />
        </Box>
      </Box>
    </div>
  );
};

export default BookDetail;
