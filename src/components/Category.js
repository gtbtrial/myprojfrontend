import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
var Category = () => {
    const [allcat, setallcat] = useState([]);
    var fetchallcat=async()=>
    {
        try {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchallcat`)
            if (resp.ok) 
            {
                var result = await resp.json();
                if (result.statuscode === 0) 
                {
                    toast.error("No categories found")
                }
                else 
                {
                    setallcat(result.data);
                }
            }
        }
        catch (e) {
            toast.error("Some error occured" + e);
        }
    }
    useEffect(()=>
    {
        fetchallcat();
    },[])

    return (
        <>
            <div className="login">
                <div className="container">
                    <h2>Categories</h2><br/>
                    {
                        allcat.length>0?
                        <>
                        {
                        allcat.map((data,index)=>
                            <div className="col-md-4 top_brand_left">
                                <div className="hover14 column">
                                    <div className="agile_top_brand_left_grid">
                                        <div className="agile_top_brand_left_grid1">
                                            <figure>
                                                <div className="snipcart-item block" >
                                                    <div className="snipcart-thumb">
                                                        <Link to={`/subcategory?cid=${data._id}`}>
                                                            <img title=" " alt=" " height='150' src={`uploads/${data.picture}` }/>
                                                            <p>{data.catname}</p>
                                                        </Link>
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
export default Category