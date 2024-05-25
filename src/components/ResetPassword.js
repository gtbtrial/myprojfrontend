import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify";
import { userContext } from "../App";
var ResetPassword = () => {
    const [newpass,setnewpass] = useState();
    const [cnewpass,setcnewpass] = useState();
    const [uname,setuname] = useState();
    const navigate = useNavigate();
    const [flag,setflag] = useState(false);
    const [params] = useSearchParams();
    const token = params.get("token");
    const [msg,setmsg] = useState();
    var verifytoken=async()=>
    {
        try
        {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/verifytoken?token=${token}`)
            if(resp.ok)
            {
                var result = await resp.json();
                if(result.statuscode===-1 || result.statuscode===0)
                {
                    setmsg(result.msg)
                    setflag(false)
                }
                else if(result.statuscode===1)
                {
                    setflag(true);
                    setuname(result.username)
                }        
            }
        }
        catch(e)
        {
            toast.error("Some error occured" + e);
        }
    }
    useEffect(()=>
    {
        verifytoken();
    },[])

    var onpasschange=async(e)=>
    {
        try
        {
            e.preventDefault();
            if(newpass===cnewpass)
            {
                var passdata = {newpass,uname}
                var resp = await fetch(`${process.env.REACT_APP_APIURL}/resetpass`,
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
                        <li className="active">Reset Password</li>
                    </ol>
                </div>
            </div>

            <div className="login">
                <div className="container">
                    {
                    flag?
                    <>
                    <h2>Reset Password</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={onpasschange}>
    <input type="password" name="newpass" onChange={(e)=>setnewpass(e.target.value)} placeholder="New Password" required=" " />

    <input type="password" name="cnewpass" onChange={(e)=>setcnewpass(e.target.value)} placeholder="Confirm New Password" required=" " />
                         
                            <input type="submit" name="btn" value="Reset Password" />
                        </form>
                    </div>
                    </>:<h2>{msg}</h2>
                    }
                </div>
            </div>
        </>
    )
}
export default ResetPassword