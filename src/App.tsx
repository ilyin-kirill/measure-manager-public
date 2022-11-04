import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import './styles.scss'
import Layout from "./components/Layout/Layout";
import Login from "./pages/login/Login";
import PrivateRoute from "./components/Layout/PrivateRoute";
import PublicRoute from "./components/Layout/PublicRoute";

import { useUserState } from "./context/UserContext";
import { IAuth } from './types/types';

function App() {
  let { isAuthenticated }: IAuth = useUserState();
  return (
    <Router>
      <Routes>
        <Route path='*' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
          <Route path='*' element={<Layout/>}/>
        </Route>
        <Route path='/login' element={
          <PublicRoute>
            <Login/>
          </PublicRoute>
        }/>
      </Routes>
    </Router>
  );
}

export default App;
