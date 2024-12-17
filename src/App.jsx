import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Body from "./components/Body";
import Login from "./components/Login";
import Feed from "./components/Feed";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path='/feed' element={<Feed/>}/>
            <Route path="/login" element={<Login />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
