import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
var SubCategory = () => {
    const [subcatdata, setsubcatdata] = useState([]);
    const [params] = useSearchParams();
    const cat = params.get("cid");
    var fetchsubcat=async()=>
    {
        try {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchsubcat/${cat}`)
            if (resp.ok) 
            {
                var result = await resp.json();
                if (result.statuscode === 0) 
                {
                    setsubcatdata([]);
                }
                else 
                {
                    setsubcatdata(result.data);
                }
            }
        }
        catch (e) {
            toast.error("Some error occured" + e);
        }
    }
    useEffect(()=>
    {
        fetchsubcat();
    },[])

    return (
        <>
            <div className="login">
                <div className="container">
                    <h2>Sub Categories</h2><br/>
                    {
                        subcatdata.length>0?
                        <>
                        {
                        subcatdata.map((data,index)=>
                            <div className="col-md-4 top_brand_left">
                                <div className="hover14 column">
                                    <div className="agile_top_brand_left_grid">
                                        <div className="agile_top_brand_left_grid1">
                                            <figure>
                                                <div className="snipcart-item block" >
                                                    <div className="snipcart-thumb">
                                                        <Link to={`/products?scid=${data._id}`}>
                                                            <img title=" " alt=" " height='150' src={`uploads/${data.picture}` }/>
                                                            <p>{data.subcatname}</p>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                            )
                        }</>:<h3>No Sub Category Found</h3>
                    }
                </div>
            </div>
        </>
    )
}
export default SubCategory