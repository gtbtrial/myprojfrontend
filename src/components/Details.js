import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";
var Details = () => {
    const [params] = useSearchParams();
    const prodid = params.get("pid");
    const navigate = useNavigate();
    const [productinfo,setproductinfo] = useState({});
    const [remcost,setremcost] = useState();
    const [stock,setstock] = useState([]);
    const [qty,setqty] = useState();
    const [tc,settc] = useState();
    const {userinfo} = useContext(userContext)
    const [prodimages,setprodimages] = useState([]);
    useEffect(()=>
    {
        fetchprodinfo();
        fetchprodimages();
    },[])

    useEffect(()=>
    {
        settc(remcost*qty);
    },[qty])

    useEffect(()=>
    {
        setremcost(productinfo.rate-((productinfo.rate*productinfo.discount)/100));

        var stockarr=[];
        if(productinfo.stock>10)
        {
            for(var x=1;x<=10;x++)
            {
                stockarr.push(x);
            }
        }
        else
        {
            for(var x=1;x<=productinfo.stock;x++)
            {
                stockarr.push(x);
            }
        }
        setstock(stockarr);
    },[productinfo])
    var fetchprodinfo=async()=>
    {
        try {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchproddetailsbyid/${prodid}`)
            if (resp.ok) 
            {
                var result = await resp.json();
                if (result.statuscode === 0) 
                {
                    toast.error("No product details found")
                    setproductinfo({});
                }
                else 
                {
                    setproductinfo(result.data);
                }
            }
        }
        catch (e) {
            toast.error("Some error occured" + e);
        }
    }

    var fetchprodimages=async()=>
    {
        try {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchprodimages/${prodid}`)
            if (resp.ok) 
            {
                var result = await resp.json();
                if (result.statuscode === 1) 
                {
                    setprodimages(result.pics)
                }
                else
                {
                    setprodimages([]);
                }
            }
        }
        catch (e) {
            toast.error("Some error occured" + e);
        }
    }

    var addtocart=async(e)=>
    {
        e.preventDefault();
        if(userinfo===null)
        {
            toast.info("Please login to add to cart");
            navigate("/login");
        }
        else
        {
            try
            {
                var cartdata = {prodid,picname:productinfo.picture,prodname:productinfo.prodname,remcost,qty,tc,uname:userinfo.username}
                var resp = await fetch(`${process.env.REACT_APP_APIURL}/addtocart`,
                {
                method:"post",
                body: JSON.stringify(cartdata),
                headers:{'Content-type':'application/json'}
                })
                if (resp.ok) 
                {
                    var result = await resp.json();
                    if(result.statuscode===1)
                    {
                        navigate("/showcart");
                    }
                    else
                    {
                        toast.error(result.msg)
                    }
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
            <div className="products">
                <div className="container">
                    <div className="agileinfo_single">
                        <div className="col-md-4 agileinfo_single_left">
                            <img id="example" src={`uploads/${productinfo.picture}`} alt=" " className="img-responsive" />
                        </div>
                        <div className="col-md-8 agileinfo_single_right">
                            <h2>{productinfo.prodname}</h2>
                            <div className="w3agile_description">
                                <h4>Description :</h4>
                                <p dangerouslySetInnerHTML={{ __html: productinfo.description }}/>
                            </div>
                            <div className="snipcart-item block">
                                <div className="snipcart-thumb agileinfo_single_right_snipcart">
                                    <h4 className="m-sing">₹{remcost} <span>₹{productinfo.rate}</span></h4>
                                </div>
                                <div className="snipcart-details agileinfo_single_right_details">
                                    <form name="form1" method="post">
                                        {
                                        productinfo.stock>=1?
                                        <fieldset>
                                            <select name="qty" className="form-control" onChange={(e)=>setqty(e.target.value)}>
                                                <option value="">Choose Quantity</option>
                                                {
                                                    stock.map((data,index)=>
                                                        <option key={index}>{data}</option>
                                                    )
                                                }
                                            </select><br/><br/>
                                            <input type="submit" name="submit" onClick={addtocart} value="Add to cart" className="button" />
                                        </fieldset>:<h3>Out of Stock</h3>
                                        }
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="clearfix"> </div>
                    </div>
                    
                    {
                        prodimages.length>0?
                        <><br/>
                        <h2>Product Images</h2><br/>
                        {
                        prodimages.map((data,index)=>
                            <div className="col-md-4 top_brand_left">
                                <div className="hover14 column">
                                    <div className="agile_top_brand_left_grid">
                                        <div className="agile_top_brand_left_grid1">
                                            <figure>
                                                <div className="snipcart-item block" >
                                                    <div className="snipcart-thumb">
                                                       
                                                <img title=" " alt=" " height='150' src={`uploads/${data}` }/>
                                                       
                                                    </div>
                                                </div>
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                            )
                        }</>:null   
                    }


                </div>
            </div>
        </>
    )
}
export default Details