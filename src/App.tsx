import { Route, Routes } from "react-router-dom";
import "./App.css";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Blog} />
        <Route path="/:id" Component={BlogDetails} />
      </Routes>
    </>
  );
}

export default App;
