import {  useEffect, useState } from "react"
import { Link} from "react-router-dom"
import { toast } from "react-toastify";

var AddProductPics = () => 
{
    const [cat,setcat] = useState("");
    const [allcat,setallcat] = useState([]);

    const [subcat,setsubcat] = useState("");
    const [subcatdata,setsubcatdata] = useState([]);

    const [prodid,setprodid] = useState("");
    const [prodsdata,setprodsdata] = useState([]);

    const [images, setImages] = useState([]);
    const [prodimages, setprodimages] = useState([]);

    var onsave=async(e)=>
    {
        e.preventDefault();
        const formData = new FormData();
        formData.append("productId",prodid);
       
        images.forEach((image) => 
        {
            formData.append('images', image);
        });

		try
        {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/prodimages`,
			{
				method:"post",
				body:formData
			})
			if(resp.ok)
			{
				var result = await resp.json();
				if(result.statuscode===1)
				{
					toast.success("Product images added successfully");
				}
				else if(result.statuscode===0)
				{
					toast.error("Product images not added");
				}
                else
                {
                    toast.error("Error Occured");
                }
			}
		}
		catch(e)
		{
			toast.error("Error Occured");
		}
    }
    useEffect(()=>
    {
        fetchallcat();
    },[])
    useEffect(()=>
    {
        if(cat!=="")
        {
            fetchsubcat();
        }
    },[cat])
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

    var fetchsubcat=async()=>
    {
        try {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchsubcat/${cat}`)
            if (resp.ok) 
            {
                var result = await resp.json();
                if (result.statuscode === 0) 
                {
                    toast.error("No sub categories found")
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

    var fetchprodsbysubcat=async()=>
    {
        try {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchprodsbysubcat/${subcat}`)
            if (resp.ok) 
            {
                var result = await resp.json();
                if (result.statuscode === 0) 
                {
                    toast.error("No products found")
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
        if(subcat!=="")
        {
            fetchprodsbysubcat();
        }
    },[subcat])

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
                    toast.info("No extra images added yet")
                }
            }
        }
        catch (e) {
            toast.error("Some error occured" + e);
        }
    }
    useEffect(()=>
    {
        if(prodid!=="")
        {
            fetchprodimages();
        }
    },[prodid])

    var delimage = async (imagename) => {
        if (window.confirm("Are you sure to delete?")) 
        {
            try 
            {
                var resp = await fetch(`${process.env.REACT_APP_APIURL}/delprodimage/${prodid}/${imagename}`,
                {
                    method: "delete"
                })
                if (resp.ok) 
                {
                    var result = await resp.json();
                    if (result.statuscode == 1) {
                        toast.success("Image deleted successfully");
                        fetchprodimages();
                    }
                    else if (result.statuscode == 0) {
                        toast.success("Image not deleted successfully");
                    }
                    else {
                        toast.success("Some error occured try again");
                    }
                }
            }
            catch (e) {
                toast.error(`Error Occured ${e}`)
            }
        }
    }

    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Add Product Pictures</li>
                    </ol>
                </div>
            </div>

            <div className="login">
                <div className="container">
                    <h2>Add product Pictures</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={onsave}>
                        
                        <select name="cat" value={cat} className="form-control" onChange={(e)=>setcat(e.target.value)}>
                            <option value="">Choose Category</option>
                            {
                                allcat.length>0?
                                <>
                                {
                                    allcat.map((data,indx)=>
                                    <option value={data._id} key={indx}>{data.catname}</option>
                                    )
                                }
                                </>:<option value="">No Categories</option>
                            }
                        </select><br/>

                        <select name="subcat" value={subcat} className="form-control" onChange={(e)=>setsubcat(e.target.value)}>
                            <option value="">Choose Sub Category</option>
                            {
                                subcatdata.length>0?
                                <>
                                {
                                    subcatdata.map((data,indx)=>
                                    <option value={data._id} key={indx}>{data.subcatname}</option>
                                    )
                                }
                                </>:<option value="">No Sub Categories</option>
                            }
                        </select><br/>

                        <select name="prods" value={prodid} className="form-control" onChange={(e)=>setprodid(e.target.value)}>
                            <option value="">Choose Product</option>
                            {
                                prodsdata.length>0?
                                <>
                                {
                                    prodsdata.map((data,indx)=>
                                    <option value={data._id} key={indx}>{data.prodname}</option>
                                    )
                                }
                                </>:<option value="">No products</option>
                            }
                        </select><br/>

                        <input type="file" name="ppic" multiple onChange={(e)=>setImages([...e.target.files])} /><br/>

                        <input type="submit" value="Add" />
                        </form>
                    </div>
                    <br/>
                    {
                    prodimages.length>0?
                    <>
                        <h2>Added Pictures</h2><br/>
                        <table className="timetable_sub">
                            <tbody>
                                <tr>
                                    <th>Picture</th>
                                    <th>Delete</th>
                                </tr>
                                {
                                prodimages.map((data,index)=>
                                <tr key={index}>
                                    <td><img src={`uploads/${data}`} height='75'/></td>
                                    <td><button className="btn btn-danger" onClick={()=>delimage(data)}>Delete</button></td>
                                </tr>)
                                }
                            </tbody>
                        </table>
                    </>:null

                    }
                </div>
            </div>
        </>
    )
}
export default AddProductPics