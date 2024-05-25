import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
var Products = () => {
    const [prodsdata, setprodsdata] = useState([]);
    const [params] = useSearchParams();
    const subcat = params.get("scid");
    var fetchprodsbysubcat=async()=>
    {
        try {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchprodsbysubcat/${subcat}`)
            if (resp.ok) 
            {
                var result = await resp.json();
                if (result.statuscode === 0) 
                {
                    setprodsdata([]);
                }
                else 
                {
                    setprodsdata(result.data);
                }
            }
        }
        catch (e) {
            toast.error("Some error occured" + e);
        }
    }
    useEffect(()=>
    {
        fetchprodsbysubcat();
    },[])

    return (
        <>
            <div className="login">
                <div className="container">
                    <h2>Products</h2><br/>
                    {
                        prodsdata.length>0?
                        <>
                        {
                        prodsdata.map((data,index)=>
                            <div key={index} className="col-md-4 top_brand_left">
                                <div className="hover14 column">
                                    <div className="agile_top_brand_left_grid">
                                        <div className="agile_top_brand_left_grid1">
                                            <figure>
                                                <div className="snipcart-item block" >
                                                    <div className="snipcart-thumb">
                                                        <Link to={`/details?pid=${data._id}`}>
                                                            <img title=" " alt=" " height='150' src={`uploads/${data.picture}` }/>
                                                            <p>{data.prodname}</p>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                            )
                        }</>:<h3>No products Found</h3>
                    }
                </div>
            </div>
        </>
    )
}
export default Products