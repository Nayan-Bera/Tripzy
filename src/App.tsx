import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProviderLayout from "./layouts/ProviderLayout";
import Home from "./pages/home/Home";

function App() {
  return (
    <Router>
      <ProviderLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* add other routes */}
        </Routes>
      </ProviderLayout>
    </Router>
  );
}

export default App;
