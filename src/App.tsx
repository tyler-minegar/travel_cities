import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import SearchForm from "./pages/SearchForm";
import SearchResult from "./pages/SearchResult";

const Wrapper = styled.main`
  background: url("/images/background.jpg");
  background-position: center, center;
  min-height: 100vh;
  width: 100%;
`;

function App() {
  return (
    <Wrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchForm />} />
          <Route path="/result" element={<SearchResult />} />
        </Routes>
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;
