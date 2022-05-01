import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './components/Context/AuthProvider';
import Login from './pages/login/Login';
import PrivateRoute from './pages/login/PrivateRoute';
import Message from './pages/message/Message';
import Registration from './pages/registration/Registration';
function App() {
  // const [isLoading, setIsLoading] = useState(true)
  // const { user} = useAuth();

  // const spinner = Spinner();

  // //loading
  // useEffect(() => {
  //   setIsLoading(true)
  //   setTimeout(() => {
  //     setIsLoading(false)
  //   }, 3000)
  // }, [])

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/chats"
            element={
              <PrivateRoute>
                <Message />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
