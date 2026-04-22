import { AdminFlight } from "../pages/admin/AdminFlight";
import { AdminStay } from "../pages/admin/AdminStay";
import React from 'react'
import { Route, Routes } from "react-router-dom";
import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { AdminProducts } from "../pages/admin/AdminProducts";
import { AllHotels } from "../pages/admin/AllHotels";
import { Destination } from "../pages/thingsTodo/Destination";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import { StayData } from "../pages/stay/StayData";
import { CheckoutPage } from "../pages/CheckoutPage";
import { FlightData } from "../pages/flights/FlightData";

export const AllRoutes = () => {
    return (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/adminflight" element={<AdminFlight />} />
            <Route path="/admin/adminstay" element={<AdminStay />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Signup/>}/>
            <Route path="/admin/hotels" element={<AllHotels />} />
            <Route path="/ThingsToDo" element={<Destination/>}/>
            <Route path="/stay" element={<StayData />} />
            <Route path="/flight" element={<FlightData />} />
            
            <Route path="/checkout" element={<CheckoutPage/>} ></Route>
          </Routes>
        </>
      );
}