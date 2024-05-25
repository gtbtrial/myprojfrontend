import { useContext, useEffect, useState } from "react"
import { userContext } from "../App";
import { toast } from "react-toastify";
var OrderSummary = () => 
{
    const [odata,setodata] = useState({});
    const {userinfo} = useContext(userContext);
    useEffect(()=>
    {
        if(userinfo!==null)
        {
            fetchorderdetails();
        }
    },[userinfo])
    var fetchorderdetails=async()=>
    {
        try
        {
            var uname = userinfo.username;
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchorderid?un=${uname}`)
            if(resp.ok)
            {
                var result = await resp.json();//{statuscode:1,udata:result}
                if(result.statuscode===1)
                {
                    setodata(result.data);
                }
                else
                {
                    setodata({})
                    toast.error("Error while fetching order details, try again")
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
            <div className="login">
                <div className="container">
                    <h2>Thanks for shopping on our website. Your order number is {odata._id}</h2>
                </div>
            </div>
        </>
    )
}
export default OrderSummary