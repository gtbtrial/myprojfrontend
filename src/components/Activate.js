import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
var Activate = () => {
    const [params] = useSearchParams();
    const code = params.get("token");
    const [msg,setmsg] = useState();
    var activateuser=async()=>
    {
        try {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/activateaccount/${code}`)
            if (resp.ok) 
            {
                var result = await resp.json();
                if (result.statuscode === 1) 
                {
                    setmsg("Account activated successfully")
                }
                else 
                {
                    setmsg("Account not activated, try again");
                }
            }
        }
        catch (e) {
            toast.error("Some error occured" + e);
        }
    }
    useEffect(()=>
    {
        activateuser();
    },[])

    return (
        <>
            <div className="login">
                <div className="container">
                    <h2>{msg}</h2><br/>
                </div>
            </div>
        </>
    )
}
export default Activate