import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { userContext } from "../App";
var Checkout = () => {
    const [saddr,setsaddr] = useState();
    const [state,setstate] = useState();
    const [city,setcity] = useState();
    const [pmode,setpmode] = useState("");
    const [cardno,setcardno] = useState();
    const [hname,sethname] = useState();
    const [cvv,setcvv] = useState();
    const [exp,setexp] = useState();
    const [flag,setflag] = useState(false);
    const navigate = useNavigate();
    const [cartdata, setcartdata] = useState([]);
    const {userinfo} = useContext(userContext);
    var oncheckout=async(e)=>
    {
        try
        {
            e.preventDefault();
            var uname = userinfo.username

            var orderdata = {saddr,state,city,pmode,cardno,hname,exp,cvv,uname,cartdata,oamt:sessionStorage.getItem("gtotal")}

            var resp = await fetch(`${process.env.REACT_APP_APIURL}/saveorder`,
            {
            method:"post",
            body: JSON.stringify(orderdata),
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
                    navigate("/ordersummary")
                }
                else
                {
                    toast.error(result.msg)
                }                
            }
        }
        catch(e)
        {
            toast.error("Some error occured" + e);
        }
    }
    var fetchcart = async () => {
        try {
            
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchcart/${userinfo.username}`)
            if (resp.ok) {
                var result = await resp.json();
                if (result.statuscode === 0) 
                {
                    setcartdata([]);
                }
                else 
                {
                    setcartdata(result.data);
                }
            }
        }
        catch (e) {
            toast.error("Some error occured" + e);
        }
    }
    useEffect(() => {
        if(userinfo!==null)
        {
            fetchcart();
        }
    }, [userinfo])
    useEffect(()=>
    {
        if(pmode!=="")
        {
            if(pmode==="Cash on Delivery")
            {
                setflag(false)
            }
            else if(pmode==="Card")
            {
                setflag(true)
            }
        }   
    },[pmode])
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Checkout</li>
                    </ol>
                </div>
            </div>

            <div className="login">
                <div className="container">
                    <h2>Checkout</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={oncheckout}>
                            <textarea name="sdaddr" onChange={(e)=>setsaddr(e.target.value)} placeholder="Shipping Address" className="form-control"></textarea><br/>

                            <input type="text" onChange={(e)=>setstate(e.target.value)} name="state" placeholder="State"/><br/>

                            <input type="text" onChange={(e)=>setcity(e.target.value)} name="city" placeholder="City"/><br/>
                            
                            Choose Payment Mode<br/>
                            <label><input type="radio" name="pmode" onChange={(e)=>setpmode(e.target.value)} value="Cash on Delivery"/>&nbsp;Cash on Delivery</label>&nbsp;

                            <label><input type="radio" name="pmode" onChange={(e)=>setpmode(e.target.value)} value="Card"/>&nbsp;Card Payment</label>
                            <br/><br/>
                            {
                                flag?
                                <>
                                    <input type="text" onChange={(e)=>setcardno(e.target.value)} name="ccno" placeholder="Credit Card No"/><br/>
                                    <input type="text" name="hname" onChange={(e)=>sethname(e.target.value)} placeholder="Holder Name"/><br/>
                                    <input type="text" name="exp" onChange={(e)=>setexp(e.target.value)} placeholder="Expiry"/>
                                    <input type="password" name="exp" onChange={(e)=>setcvv(e.target.value)} placeholder="CVV"/>
                                </>:null
                            }

                        <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Checkout