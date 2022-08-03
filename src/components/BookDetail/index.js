import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookDetail = () => {
  const params = useParams();
  const [book, setBook] = useState({
    "title": "",
    "authors": [],
    "publisher": "",
    "publishedDate": "",
    "description": "",
    "pageCount": 0,
    "categories": [],
    "averageRating": 0,
    "imageLinks": {},
    "industryIdentifiers": [],
    "test": "Still Loading"
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
    <div>
      <p>{book.title}</p>
      <p>{book.test}</p>
      <p>Author(s): {book.authors.join(", ")}</p>
      <div dangerouslySetInnerHTML= {{__html:book.description}} />
    </div>
  );
};

export default BookDetail;
