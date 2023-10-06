import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Menu from "./navigation/Menu";
import FoundPage from "./pages/FoundPage";
import LostPage from "./pages/LostPage";
import PostPage from "./pages/PostPage";

import { useDbData } from "./utilities/firebase";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  const [data, error] = useDbData("/");
  if (error) return <h1>Error loading data</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;
  console.log("data", data);

  return (
    <div className="main-app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />}>
            <Route path="/" element={<FoundPage posts={data.foundPosts} />} />
            <Route path="lostpage" element={<LostPage posts={data.lostPosts} />} />
            <Route path="postpage" element={<PostPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
