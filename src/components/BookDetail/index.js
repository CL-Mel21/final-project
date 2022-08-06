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
    test: "Still Loading",
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
      <div className="bookDetails">
        <img src={book.imageLinks.thumbnail} />
        <div>
          <h2>{book.title}</h2>
          {book.authors && <p>Author(s): {book.authors.join(", ")}</p>}
          {book.categories && <p>Categories: {book.categories.join(", ")}</p>}
          {book.industryIdentifiers && (
            <p>
              ISBN: {book.industryIdentifiers[0].identifier}
              {book.industryIdentifiers[1]
                ? ", " + book.industryIdentifiers[1].identifier
                : null}
            </p>
          )}
          {book.publisher && <p>Publisher: {book.publisher}</p>}
          {book.publishedDate && <p>Published Date: {book.publishedDate}</p>}
          {book.pageCount && <p>Pages: {book.pageCount}</p>}
          {book.averageRating && <p>Average Rating: {book.averageRating}</p>}
        </div>

        <div dangerouslySetInnerHTML={{ __html: book.description }} />
      </div>
    </div>
  );
};

export default BookDetail;
