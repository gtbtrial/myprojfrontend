import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { userContext } from "../App";
var OrderHistory = () => {
    const [orderslist, setorderslist] = useState([]);
    const navigate = useNavigate();
    const {userinfo} = useContext(userContext);
    var fetchorders = async () => {
        try {
            var uname = userinfo.username;
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchuserorders/${uname}`)
            if (resp.ok) {
                var result = await resp.json();
                if (result.statuscode === 0) 
                {
                    setorderslist([]);
                }
                else 
                {
                    setorderslist(result.data);
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
            fetchorders();
        }
    }, [userinfo])

    var updatestatus=(id)=>
    {
        navigate(`/updatestatus?oid=${id}`);
    }

    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Order History</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    
                    {
                        orderslist.length > 0 ?
                            <>
                                 <h2>Your Orders</h2><br />
                                <table className="timetable_sub">
                                    <tbody>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Amount</th>
                                            <th>Address</th>
                                            <th>State</th>
                                            <th>City</th>
                                            <th>Payment Mode</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                        </tr>
                                        {
                                            orderslist.map((data, i) =>
                                                <tr key={i}>
                                                    <td><Link to={`/orderitems?oid=${data._id}`}>{data._id}</Link></td>
                                                    <td>{data.OrderAmount}</td>
                                                    <td>{data.address}</td>
                                                    <td>{data.state}</td>
                                                    <td>{data.city}</td>
                                                    <td>{data.pmode}</td>
                                                    <td>{data.Status}</td>
                                                    <td>{data.OrderDate}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </> : <h2>No orders found</h2>
                    }
                </div>
            </div>
        </>
    )
}
export default OrderHistory