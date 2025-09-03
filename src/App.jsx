import './index.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Body from './component/Body';
import Login from './component/login';
import Profile from './component/Profile';
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
