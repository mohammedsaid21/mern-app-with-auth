import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useEffect, useState } from 'react';
import { useAuthContext } from './hooks/useAuthContext';

function App() {

  const { user } = useAuthContext()

  const [loading, setLoading ] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, [])
  
const styl  = {color: 'red', textAlign: 'center', paddingTop: '150px'}

  if(loading)
    return <h1 style={styl}>Is Loading</h1>

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={ user ?  <Home /> : <Navigate to='/login' />}
            />
            <Route 
              path="/login"
              element={ !user ?  <Login /> : <Navigate to='/' />}
            />
            <Route 
              path="/signup"
              element={!user ? <Signup /> : <Navigate to='/' />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

