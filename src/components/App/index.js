import Homepage from "../Homepage";
import SearchResults from "../SearchResults";
import BookDetail from "../BookDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Homepage />} />
        <Route path="/results">
          <Route path=":input"  element={<SearchResults />} />
        </Route>
        <Route path="/book">
          <Route path=":bookId"  element={<BookDetail />} />
        </Route>
        <Route path="*" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
