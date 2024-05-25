import { Route, Routes } from "react-router-dom";
import Login from '../components/Login';
import Home from "./Home";
import Register from "./Register";
import Thanks from "./Thanks";
import SearchUser from "./SearchUser";
import ListofUsers from "./ListofUsers";
import ChangePassword from "./ChangePassword";
import AdminHome from "./AdminHome";
import CreateAdmin from "./CreateAdmin";
import ManageCategory from "./ManageCategory";
import ManageSubCategory from "./ManageSubCategory";
import ManageProduct from "./ManageProduct";
import UpdateProduct from "./UpdateProduct";
import Category from "./Category";
import SubCategory from "./SubCategory";
import Products from "./Products";
import Details from "./Details";
import ShowCart from "./ShowCart";
import Checkout from "./Checkout";
import OrderSummary from "./OrderSummary";
import ViewOrders from "./ViewOrders";
import OrderItems from "./OrderItems";
import UpdateStatus from "./UpdateStatus";
import OrderHistory from "./OrderHistory";
import SearchResults from "./SearchResults";
import ContactUs from "./ContactUs";
import Activate from "./Activate";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import OtherAPI from "./OtherAPI";
import WeatherInfo from "./WeatherInfo";
import AddProductPics from "./AddProductPics";
import UserRoutesProtector from "./UserRoutesProtector";
import MyCookies from "./MyCookies";
var AppRoutes=()=>
{
    return(
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Register/>}/>
                <Route path="/thanks" element={<Thanks/>}/>
                <Route path="/searchuser" element={<SearchUser/>}/>
                <Route path="/listofmembers" element={<ListofUsers/>}/>
                <Route path="/changepassword" element={<UserRoutesProtector compname={ChangePassword}/>}/>
                <Route path="/adminhome" element={<AdminHome/>}/>
                <Route path="/createadmin" element={<CreateAdmin/>}/>
                <Route path="/managecategory" element={<UserRoutesProtector compname={ManageCategory}/>}/>
                <Route path="/managesubcategory" element={<ManageSubCategory/>}/>
                <Route path="/manageproduct" element={<ManageProduct/>}/>
                <Route path="/updateproduct" element={<UpdateProduct/>}/>
                <Route path="/category" element={<Category/>}/>
                <Route path="/subcategory" element={<SubCategory/>}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/details" element={<Details/>}/>
                <Route path="/showcart" element={<ShowCart/>}/>
                <Route path="/checkout" element={<Checkout/>}/>
                <Route path="/ordersummary" element={<OrderSummary/>}/>
                <Route path="/vieworders" element={<ViewOrders/>}/>
                <Route path="/orderitems" element={<OrderItems/>}/>
                <Route path="/updatestatus" element={<UpdateStatus/>}/>
                <Route path="/orderhistory" element={<OrderHistory/>}/>
                <Route path="/searchresults" element={<SearchResults/>}/>
                <Route path="/contactus" element={<ContactUs/>}/>
                <Route path="/activate" element={<Activate/>}/>
                <Route path="/forgotpassword" element={<ForgotPassword/>}/>
                <Route path="/resetpassword" element={<ResetPassword/>}/>
                <Route path="/showposts" element={<OtherAPI/>}/>
                <Route path="/weather" element={<WeatherInfo/>}/>
                <Route path="/addproductpics" element={<AddProductPics/>}/>
                <Route path="/cookies" element={<MyCookies/>}/>
            </Routes>
        </>
    )
}
export default AppRoutes;