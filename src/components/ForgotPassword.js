import { useState } from "react"
import { Link} from "react-router-dom"
import { toast } from "react-toastify";
var ForgotPassword = () => {
    const [uname,setuname] = useState();
    var onsearch=async(e)=>
    {
        try
        {
            e.preventDefault();
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/forgotpassword?un=${uname}`)
            if(resp.ok)
            {
                var result = await resp.json();
                toast.info(result.msg)            
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
                        <li className="active">Forgot Password</li>
                    </ol>
                </div>
            </div>

            <div className="login">
                <div className="container">
                    <h2>Forgot Password</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={onsearch}>
    <input type="email" name="em" placeholder="Email Address(Username)" onChange={(e)=>setuname(e.target.value)} required=" " />
                            <input type="submit" value="Submit" />
    
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ForgotPassword