import {  useEffect, useState } from "react"
import { Link,  useSearchParams } from "react-router-dom"
import { toast } from "react-toastify";
var OrderItems = () => {
    const [itemsdata, setitemsdata] = useState([]);
    const [params] = useSearchParams();
    const orderid = params.get("oid");
    var fetchorderitems = async () => {
        try {
            
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchorderitems/${orderid}`)
            if (resp.ok) {
                var result = await resp.json();
                if (result.statuscode === 0) 
                {
                    setitemsdata([]);
                }
                else 
                {
                    setitemsdata(result.data);
                }
            }
        }
        catch (e) {
            toast.error("Some error occured" + e);
        }
    }

    useEffect(() => 
    {
        fetchorderitems();
    }, [orderid])

    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Items in Order</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    
                    {
                        itemsdata.length > 0 ?
                            <>
                                 <h2>Items in Order</h2><br />
                                <table className="timetable_sub">
                                    <tbody>
                                        <tr>
                                            <th>Picture</th>
                                            <th>Name</th>
                                            <th>Rate</th>
                                            <th>Quantity</th>
                                            <th>Total Cost</th>
                                        </tr>
                                        {
                                            itemsdata.map((data, i) =>
                                                <tr key={i}>
                                                    <td><img src={`uploads/${data.picture}`} alt="ProdPic" height="75"/></td>
                                                    <td>{data.pname}</td>
                                                    <td>{data.rate}</td>
                                                    <td>{data.qty}</td>
                                                    <td>{data.totalcost}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </> : <h2>No items found</h2>
                    }
                </div>
            </div>
        </>
    )
}
export default OrderItems