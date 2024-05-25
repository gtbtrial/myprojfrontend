import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { userContext } from "../App";
var ShowCart = () => {
    const [cartdata, setcartdata] = useState([]);
    const [carttotal,setcartotal] = useState();
    const {userinfo} = useContext(userContext);
    const navigate = useNavigate();
    var fetchcart = async () => {
        try {
            
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchcart/${userinfo.username}`)
            if (resp.ok) {
                var result = await resp.json();
                if (result.statuscode === 0) 
                {
                    setcartdata([]);
                }
                else 
                {
                    setcartdata(result.data);
                }
            }
        }
        catch (e) {
            toast.error("Some error occured" + e);
        }
    }

    useEffect(() => {
        if(userinfo!==null)
        {
            fetchcart();
        }
    }, [userinfo])

    useEffect(()=>
    {
        if(cartdata.length!==0)
        {
            var ctotal=0;
            for(var x=0;x<cartdata.length;x++)
            {
                ctotal = ctotal+cartdata[x].totalcost;//240+96
            }
            setcartotal(ctotal);
            sessionStorage.setItem("gtotal",ctotal);
        }
    },[cartdata])

    var oncheckout=()=>
    {
        navigate("/checkout");
    }

    var ondel = async (id) => {
        if (window.confirm("Are you sure to delete?")) {
            try {
                var resp = await fetch(`${process.env.REACT_APP_APIURL}/deluser/${id}`,
                    {
                        method: "delete"
                    })
                if (resp.ok) {
                    var result = await resp.json();
                    if (result.statuscode == 1) {
                        toast.success("User deleted successfully");
                        fetchcart();
                    }
                    else if (result.statuscode == 0) {
                        toast.success("User not deleted successfully");
                    }
                    else {
                        toast.success("Some error occured try again");
                    }
                }
            }
            catch (e) {
                toast.error(`Error Occured ${e}`)
            }
        }
    }

    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Your shopping cart</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    
                    {
                        cartdata.length > 0 ?
                            <>
                                 <h2>Your shopping cart</h2><br />
                                <table className="timetable_sub">
                                    <tbody>
                                        <tr>
                                            <th>Picture</th>
                                            <th>Name</th>
                                            <th>Rate</th>
                                            <th>Quantity</th>
                                            <th>Total Cost</th>
                                            <th>Delete</th>
                                        </tr>
                                        {
                                            cartdata.map((data, i) =>
                                                <tr key={i}>
                                                    <td><img src={`uploads/${data.picture}`} alt="ProdPic" height="75"/></td>
                                                    <td>{data.pname}</td>
                                                    <td>{data.rate}</td>
                                                    <td>{data.qty}</td>
                                                    <td>{data.totalcost}</td>
                                                    <td><button className="btn btn-danger" onClick={() => ondel(data._id)}>Delete</button></td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                                <br/>Your total bill is Rs.{carttotal}/-<br/><br/>
                                <button className="btn btn-primary" onClick={oncheckout}>Checkout</button>
                            </> : <h2>No products added in cart yet</h2>
                    }
                </div>
            </div>
        </>
    )
}
export default ShowCart