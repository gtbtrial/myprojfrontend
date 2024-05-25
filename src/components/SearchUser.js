import { useState } from "react"
import { Link} from "react-router-dom"
import { toast } from "react-toastify";
var SearchUser = () => {
    const [uname,setuname] = useState();
    const [userinfo,setuserinfo] = useState({});
    var onsearch=async(e)=>
    {
        try
        {
            e.preventDefault();
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/searchuser?un=${uname}`)
            if(resp.ok)
            {
                var result = await resp.json();//{statuscode:1,udata:result}
                if(result.statuscode===0)
                {
                    toast.error("Invalid Username");
                    setuserinfo({})
                }
                else
                {
                    setuserinfo(result.udata);
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
                        <li className="active">Search User</li>
                    </ol>
                </div>
            </div>

            <div className="login">
                <div className="container">
                    <h2>Search User</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={onsearch}>
    <input type="email" name="em" placeholder="Email Address" onChange={(e)=>setuname(e.target.value)} required=" " />
                            <input type="submit" value="Search" />
                            {userinfo.name}<br/>
                            {userinfo.phone}

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SearchUser