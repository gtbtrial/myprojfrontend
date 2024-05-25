import { useState } from "react"
import { Link, useNavigate, useSearchParams} from "react-router-dom"
import { toast } from "react-toastify";
var UpdateStatus = () => {
    const [newstatus,setnewstatus] = useState();
    const [params] = useSearchParams();
    const oid = params.get("oid");
    const navigate = useNavigate();
    var changestatus=async(e)=>
    {
        try
        {
            e.preventDefault();
            var updatedata = {oid,newstatus}
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/updatestatus`,
            {
                method:"put",
                body: JSON.stringify(updatedata),
                headers:{'Content-type':'application/json'}
            })
            if(resp.ok)
            {
                var result = await resp.json();//{statuscode:1,udata:result}
                if(result.statuscode===1)
                {
                    toast.success("Status updated successfully");
                    navigate("/vieworders")
                }
                else
                {
                    toast.error("Problem while updating status");
                }                
            }
        }
        catch(e)
        {
            toast.error("Some error occured" + e);
        }
    }

    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Update Status</li>
                    </ol>
                </div>
            </div>

            <div className="login">
                <div className="container">
                    <h2>Update Status</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={changestatus}>
                            <select name="newst" onChange={(e)=>setnewstatus(e.target.value)} className="form-control">
                                <option value="">Choose New Status</option>
                                <option>Confirmed</option>
                                <option>Shipped</option>
                                <option>In-Transit</option>
                                <option>Out for Delivery</option>
                                <option>Delivered</option>
                                <option>Cancelled</option>
                                <option>Rejected by user</option>
                            </select>
                            <input type="submit" value="Update" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UpdateStatus