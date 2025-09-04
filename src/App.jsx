import './index.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Body from './component/Body';
import Login from './component/Login';
import Feed from "./component/Feed";
import { Provider } from 'react-redux'
import Store from "./utils/appStore"
import Profile from './component/Profile';
function App() {

  return (
    <>
      <Provider store={Store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="login" element={<Login />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App
