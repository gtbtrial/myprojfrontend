import { useState } from "react"
import { toast } from "react-toastify";
var CreateAdmin = () => {
    const [pname,setpname] = useState();
    const [phone,setphone] = useState();
    const [uname,setuname] = useState();
    const [pass,setpass] = useState();
    const [cpass,setcpass] = useState();
    const [terms,setterms] = useState();
    var savedata=async(e)=>
    {
        try
        {
            e.preventDefault();
            if(terms===true)
            {
                if(pass===cpass)
                {
                    var userdata = {pname,phone,uname,pass}
                    var resp = await fetch(`${process.env.REACT_APP_APIURL}/createadmin`,
                    {
                    method:"post",
                    body: JSON.stringify(userdata),
                    headers:{'Content-type':'application/json'}
                    })
                    if (resp.ok) 
                    {
                        var result = await resp.json();
                        if(result.statuscode===1)
                        {
                            toast.success(result.msg)
                        }
                        else
                        {
                            toast.error(result.msg)
                        }
                    }
                }
                else
                {
                    toast.warning("Password and confirm password doesn't match")
                }
            }
            else
            {
                toast.warning("Please accept terms and conditions")
            }
        }
        catch(e)
        {
            toast.error(`Error Occured ${e}`)
        }
    }
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><a href="index.html"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</a>
                        </li>
                        <li className="active">Create Admin</li>
                    </ol>
                </div>
            </div>

            <div className="register">
                <div className="container">
                    <h2>Create Admin</h2>
                    <div className="login-form-grids">
                        <h5>profile information</h5>
                        <form name="form1" onSubmit={savedata}>
                            <input type="text" name="pname" placeholder="Name..." required="" onChange={(e)=>setpname(e.target.value)} /><br/>

                            <input type="tel" name="phone" placeholder="Phone..." required=" " onChange={(e)=>setphone(e.target.value)}  />    

                        <h6>Login information</h6>
                            <input type="email" name="em" placeholder="Email Address(Username)" required=" " onChange={(e)=>setuname(e.target.value)} />

                            <input type="password" name="pass" placeholder="Password" required=" "onChange={(e)=>setpass(e.target.value)}  />

                            <input type="password" name="cpass" placeholder="Password Confirmation" required=" " onChange={(e)=>setcpass(e.target.value)} />

                            <div className="register-check-box">
                                <div className="check">
                                    <label className="checkbox"><input type="checkbox" name="checkbox" onChange={(e)=>setterms(e.target.checked)}  /><i> </i>I accept the terms and conditions</label>
                                </div>
                            </div>
                            <input type="submit" name="btn" value="Create Admin"/><br/>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CreateAdmin