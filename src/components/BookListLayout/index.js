import { Grid } from "@mui/material";
import BookList from "../BookList";

const BookListLayout = ({ bookList }) => {
  if (bookList.length === 0) {
    console.log("null");
    return null;
  }

  return (
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
  );
};

export default BookListLayout;
