import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { userContext } from "../App";
var ChangePassword = () => {
    const [currpass,setcurrpass] = useState();
    const [newpass,setnewpass] = useState();
    const [cnewpass,setcnewpass] = useState();
    const navigate = useNavigate();
    const {userinfo, setuserinfo} = useContext(userContext);
    var onpasschange=async(e)=>
    {
        try
        {
            e.preventDefault();
            if(newpass===cnewpass)
            {
                var uname = userinfo.username;
                var passdata = {currpass,newpass,uname}
                var resp = await fetch(`${process.env.REACT_APP_APIURL}/changepass`,
                {
                    method:"put",
                    body: JSON.stringify(passdata),
                    headers:{'Content-type':'application/json'}
                })
                if(resp.ok)
                {
                    var result = await resp.json();
                    if(result.statuscode===0)
                    {
                        toast.error(result.msg)
                    }
                    else if(result.statuscode===1)
                    {
                        toast.success(result.msg);
                        toast.info("You have been logged out, please login with new password");
                        setuserinfo(null);
                        sessionStorage.clear();
                        navigate("/login");
                    }                
                }
            }
            else
            {
                toast.warn("Current Password and Confirm New Password doesn't match");
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
                        <li className="active">Change Password</li>
                    </ol>
                </div>
            </div>

            <div className="login">
                <div className="container">
                    <h2>Change Password</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={onpasschange}>
    <input type="password" name="currpass" onChange={(e)=>setcurrpass(e.target.value)} placeholder="Current Password" required=" " />
    <input type="password" name="newpass" onChange={(e)=>setnewpass(e.target.value)} placeholder="New Password" required=" " />
    <input type="password" name="cnewpass" onChange={(e)=>setcnewpass(e.target.value)} placeholder="Confirm New Password" required=" " />
                         
                            <input type="submit" name="btn" value="Change Password" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ChangePassword