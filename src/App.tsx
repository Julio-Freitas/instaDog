import { BrowserRouter } from "react-router-dom";
import Header from "./components/header";
import Router from "./routes/router";

import "./App.css";
import Footer from "./components/footer";
import { UserStorage } from "./context/usetContext";

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <UserStorage>
          <Header />
          <div className="content">
            <Router />
          </div>
          <Footer />
        </UserStorage>
      </div>
    </BrowserRouter>
  );
}

export default App;
