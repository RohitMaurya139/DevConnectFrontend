import './index.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Body from './component/Body';
import Login from './component/Login';
import Feed from "./component/Feed";
import { Provider } from 'react-redux'
import Store from "./utils/appStore"
import Connection from './component/Connection';
import Request from './component/Request';
import Profile from './component/Profile';
import SignUp from './component/SignUp';
function App() {

  return (
    <>
      <Provider store={Store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connection" element={<Connection />} />
              <Route path="/request" element={<Request />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App
