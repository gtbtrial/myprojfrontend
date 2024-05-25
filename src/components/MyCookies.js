import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
var MyCookies = () => {
    const cookieobj = new Cookies();
    const [pname,setpname] = useState();
    var savedata=async(e)=>
    {
        cookieobj.set("usercookie","Manish",{maxAge: 60*60*24*7});
    }
    var readdata=async(e)=>
    {
        if(cookieobj.get("usercookie")!==undefined)
        {
            setpname(cookieobj.get("usercookie"))   
        }
    }
    var delcookie=async(e)=>
    {
        if(cookieobj.get("usercookie")!==undefined)
        {
            cookieobj.remove("usercookie");
        }
    }
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Cookies</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    <h2>Cookies</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        
                            <button name="btn1" className="btn btn-primary" onClick={savedata}>Save</button>
                            &nbsp;<button name="btn2" className="btn btn-primary" onClick={readdata}>Read</button>
                            &nbsp;<button name="btn3" className="btn btn-primary" onClick={delcookie}>Delete</button>
                            <br/><br/>{pname}
                    </div>
                </div>
            </div>
        </>
    )
}
export default MyCookies