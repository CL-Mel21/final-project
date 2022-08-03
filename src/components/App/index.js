import Homepage from "../Homepage";
import SearchResults from "../SearchResults";
import BookDetail from "../BookDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
      <Routes>
        <Route path="/home" element={<Homepage />} />
        <Route path="/results/:input" element={<SearchResults />} />
        <Route path="/book/:bookId" element={<BookDetail />} />
        <Route path="*" element={<Homepage />} />
      </Routes>
  );
};

export default App;
