import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Registration from './pages/registration/Registration';
import Login from './pages/login/Login';
import Message from './pages/message/Message';
import AuthProvider from './components/Context/AuthProvider';
import PrivateRoute from './pages/login/PrivateRoute';
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
        <Route exact path="/" element={
        <PrivateRoute>
          <Message />
        </PrivateRoute>}>
        </Route>
        <Route path="/" element={<Message />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    
    
  );
}

export default App;
