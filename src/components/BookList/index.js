import { Link } from "react-router-dom";
import { Box, ThemeProvider, createTheme } from "@mui/system";

const theme = createTheme({
  palette: {
    background: {
      paper: "#fff",
    },
    text: {
      primary: "#009688",
      secondary: "#46505A",
    },
    action: {
      active: "#001E3C",
    },
    success: {
      dark: "#173A5E",
    },
  },
});

const BookList = ({ book }) => {
  return (
    <Link to={`/book/${book.id}`} style={{ textDecoration: "none" }}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            bgcolor: "background.paper",
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
            width: 400,
            m: 2,
            border: "1px solid grey",
            "&:hover": {
              bgcolor: "action.active",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <Box
            sx={{
              color: "text.primary",
              fontSize: 24,
              fontWeight: "bold",
              mb: 2,
            }}
          >
            {book.volumeInfo.title}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {book.volumeInfo.imageLinks ? (
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
              />
            ) : (
              <Box sx={{ border: "2px solid grey" }}>No Image Available</Box>
            )}
            <Box
              sx={{
                color: "text.secondary",
                p: 2,
                pr:0,
                verticalAlign: "middle",
              }}
            >
              Written by {book.volumeInfo.authors.join(",")}
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </Link>
  );
};

export default BookList;
