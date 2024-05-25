import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";

var ContactUs = () => {
    const [name,setname] = useState();
    const [email,setemail] = useState();
    const [phone,setphone] = useState();
    const [msg,setmsg] = useState();
    const [cpverif,setcpverif] = useState();
    var sendmsg=async(e)=>
    {
        try
        {
            e.preventDefault();
            if(cpverif===true)
            {
                var msgdata = {name,email,phone,msg}
                var resp = await fetch(`${process.env.REACT_APP_APIURL}/contactus`,
                {
                method:"post",
                body: JSON.stringify(msgdata),
                headers:{'Content-type':'application/json'}
                })
                if (resp.ok) 
                {
                    var result = await resp.json();
                    toast.info(result.msg)
                }
            }
            else
            {
                toast.warn("Captcha Verification Failed");
            }
            
        }
        catch(e)
        {
            toast.error("Some error occured" + e);
        }
    }

    var gcaptchaonchange=(value)=>
    {
       if(value!==null)
        {
            setcpverif(true);
        }
        else
        {
            setcpverif(false);
        }
    }
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Contact Us</li>
                    </ol>
                </div>
            </div>

            <div className="login">
                <div className="container">
                    <h2>Contact Us</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={sendmsg}>
    <input type="text" name="pname" placeholder="Name..." onChange={(e)=>setname(e.target.value)} required=" " /><br/>
    <input type="email" name="em" placeholder="Email Address..." onChange={(e)=>setemail(e.target.value)} required=" " /><br/>
    <input type="text" name="phone" placeholder="Phone..." onChange={(e)=>setphone(e.target.value)} required=" " /><br/>
        <textarea name="msg" className="form-control" placeholder="Message..." onChange={(e)=>setmsg(e.target.value)}></textarea><br/>
        <ReCAPTCHA  sitekey="6Le6KtopAAAAAHrIUMCMrGCGDDjJpo9toYKMf-Sp" onChange={gcaptchaonchange}/>
                            <input type="submit" value="Contact Us" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ContactUs