import { fontWeight } from "@mui/system";
import { Link } from "react-router-dom";

const BookList = ({ book }) => {
  let authors = book.volumeInfo.authors;
  
  return (
    <Link to={`/book/${book.id}`} style={{ textDecoration: "none" }}>
        <div className="bookList">
          <div className="bookImg">
            {book.volumeInfo.imageLinks ? (
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
              />
            ) : (
              <div className="noBookImg">
                <div>No Image Available</div>
              </div>
            )}
          </div>
          <div className="bookName">
            {book.volumeInfo.title}
          </div>
          {authors &&
          <div style={{fontSize:"0.8rem", fontWeight:"normal", margin:"3px"}}>
            Written by {authors.join(', ')}
          </div>}
        </div>
    </Link>
  );
};

export default BookList;
