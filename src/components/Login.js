import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { userContext } from "../App";
import Cookies from "universal-cookie";
var Login = () => {
    const [uname,setuname] = useState();
    const [pass,setpass] = useState();
    const [rembme,setrembme] = useState();
    const navigate = useNavigate();
    const {setuserinfo} = useContext(userContext);
    const cookieobj = new Cookies();
    var onlogin=async(e)=>
    {
        try
        {
            e.preventDefault();
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/login?un=${uname}&pass=${pass}`)
            if(resp.ok)
            {
                var result = await resp.json();
                if(result.statuscode===0)
                {
                    toast.error(result.msg)
                }
                else if(result.statuscode===1)
                {
                    setuserinfo(result.userdata);
                    sessionStorage.setItem("userdata", JSON.stringify(result.userdata));

                    if(rembme===true)
                    {
                        cookieobj.set("usercookie",result.userdata._id,{maxAge: 60*60*24*14});
                    }

                    if(result.userdata.usertype==="admin")
                    {
                        sessionStorage.setItem("token",result.jtoken);
                        navigate("/adminhome");
                    }
                    else
                    {
                        navigate("/");
                    }
                }
                else if(result.statuscode===2)
                {
                    toast.error("Your account is not activated, please activate and then login")
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
                        <li className="active">Login Page</li>
                    </ol>
                </div>
            </div>

            <div className="login">
                <div className="container">
                    <h2>Login Form</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={onlogin}>
    <input type="email" name="em" placeholder="Email Address" onChange={(e)=>setuname(e.target.value)} required=" " />
    <input type="password" name="pass" onChange={(e)=>setpass(e.target.value)} placeholder="Password" required=" " />
                            <br/>
        <label><input type="checkbox" name="rembme" onChange={(e)=>setrembme(e.target.checked)}/>&nbsp;Remember Me</label>

                            <div className="forgot">
                                <Link to="/forgotpassword">Forgot Password?</Link>
                            </div>
                            <input type="submit" value="Login" />
                        </form>
                    </div>
                    <h4>For New People</h4>
                    <p><a href="registered.html">Register Here</a> (Or) go back to <a href="index.html">Home<span className="glyphicon glyphicon-menu-right" aria-hidden="true"></span></a></p>
                </div>
            </div>
        </>
    )
}
export default Login