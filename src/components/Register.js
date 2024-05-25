import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
var Register = () => {
    const [pname,setpname] = useState();
    const [phone,setphone] = useState();
    const [uname,setuname] = useState();
    const [pass,setpass] = useState();
    const [cpass,setcpass] = useState();
    const [terms,setterms] = useState();
    const navigate = useNavigate();
    const [verrors, setverrors] = useState({});
    var validateForm=()=>
    {
        const errors = {};
        if(pname.length<3)
        {
            errors.pname = 'Name must be at least 3 characters long';
        }

        if (!/^\d{10}$/.test(phone)) 
        {
			errors.phone = 'Phone must be a 10-digit number';
		}

        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(uname)) {
			errors.email = 'Invalid email format';
		}

        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}/.test(pass)) {
			errors.password =
				'Password must contain at least 1 uppercase, 1 number, 1 special character, and be at least 6 characters long';
		}

        if (pass !== cpass) 
        {
			errors.passmatch = 'Password and confirm password does not match';
		}

        if (terms!==true) 
        {
			errors.terms = 'Please accept terms and conditions';
		}


        setverrors(errors);
        if(Object.keys(errors).length>0)
        {
            return false
        }
        else
        {
            return true
        }
    }

    var savedata=async(e)=>
    {
        e.preventDefault();
        if(validateForm()===true)
        {
            try
            {
                if(terms===true)
                {
                    if(pass===cpass)
                    {
                        var userdata = {pname,phone,uname,pass}
                        var resp = await fetch(`${process.env.REACT_APP_APIURL}/signup`,
                        {
                        method:"post",
                        body: JSON.stringify(userdata),
                        headers:{'Content-type':'application/json'}
                        })
                        if (resp.ok) 
                        {
                            var result = await resp.json();//result={msg:"Signup Sucessfull"} result.msg
                            if(result.statuscode===1)
                            {
                                navigate("/thanks");
                            }
                            else
                            {
                                toast.error(result.msg)
                            }
                        }
                        else
                        {
                            result = await resp.json();
                            toast.error(result.msg)
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
    }
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><a href="index.html"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</a>
                        </li>
                        <li className="active">Register Page</li>
                    </ol>
                </div>
            </div>

            <div className="register">
                <div className="container">
                    <h2>Register Here</h2>
                    <div className="login-form-grids">
                        <h5>profile information</h5>
                        <form name="form1" onSubmit={savedata}>
                            <input type="text" name="pname" placeholder="Name..." minLength="3" required=" " onChange={(e)=>setpname(e.target.value)} />
                            {verrors.pname?<span>{verrors.pname}</span>:null}
                            <br/>

                            <input type="tel" name="phone" minLength="10" maxLength="10" placeholder="Phone..." required=" " onChange={(e)=>setphone(e.target.value)}  /> 
                            {verrors.phone?<span>{verrors.phone}</span>:null}

                        <h6>Login information</h6>
                            <input type="email" name="em" placeholder="Email Address(Username)" required=" " onChange={(e)=>setuname(e.target.value)} />
                            {verrors.email?<span>{verrors.email}</span>:null}

                            <input type="password" name="pass"  pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}" placeholder="Password" required=" "onChange={(e)=>setpass(e.target.value)}  />

                            {verrors.password?<span>{verrors.password}</span>:null}

                            <input type="password" name="cpass" placeholder="Password Confirmation" required=" " onChange={(e)=>setcpass(e.target.value)} />

                            {verrors.passmatch?<span>{verrors.passmatch}</span>:null}

                            <div className="register-check-box">
                                <div className="check">
                                    <label className="checkbox"><input type="checkbox" name="checkbox" onChange={(e)=>setterms(e.target.checked)}  /><i> </i>I accept the terms and conditions</label>
                                    {verrors.terms?<span>{verrors.terms}</span>:null}
                                </div>
                            </div>
                            <input type="submit" name="btn" value="Register"/><br/>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Register