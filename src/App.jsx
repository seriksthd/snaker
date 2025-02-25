import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Profile from "./components/Profile";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
      {/* <Profile /> */}
    </div>
  );
};

export default App;
