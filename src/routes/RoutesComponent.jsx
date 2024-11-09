import React from "react";
import Login from "./Login";
import Home from "./Home";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import RequireAuth from '@auth-kit/react-router/RequireAuth';


const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/login' } element={<Login/>}/>
        <Route path={'/'} element={
          <RequireAuth fallbackPath={'/login'}>
            <Home/>
          </RequireAuth>
        }
        />
      </Routes>
    </BrowserRouter>
  )
}
export default RoutesComponent