import {  useEffect, useState } from "react"
import { Link, useSearchParams} from "react-router-dom"
import { toast } from "react-toastify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
var UpdateProduct = () => 
{
    const [cat,setcat] = useState("");
    const [subcat,setsubcat] = useState("");
    const [allcat,setallcat] = useState([]);
    const [subcatdata,setsubcatdata] = useState([]);

    const [prodname,setprodname] = useState();
    const [rate,setrate] = useState();
    const [discount,setdiscount] = useState();
    const [description,setdescription] = useState();
    const [stock,setstock] = useState();
    const [feat,setfeat] = useState();
    const [picname,setpicname] = useState();
    const [pic,setpic] = useState(null);
    const [params] = useSearchParams();
    const prodid = params.get("pid");

    var onupdate=async(e)=>
    {
        try
        {
            e.preventDefault();
            const formData = new FormData();
            formData.append("catid",cat);
            formData.append("subcatid",subcat);
            formData.append("pname",prodname);
            formData.append("rate",rate);
            formData.append("dis",discount);
            formData.append("stock",stock);
            formData.append("featured",feat);
            formData.append("desc",description);
            if(pic!==null)//if file is selected
            {
                formData.append("picture",pic);
            }
            formData.append("oldpicname",picname);
            formData.append("pid",prodid);

            var resp = await fetch(`${process.env.REACT_APP_APIURL}/updateproduct`,
            {
                method:"put",
                body: formData
            })
            if(resp.ok)
            {
                var result = await resp.json();
                if(result.statuscode===1)
                {
                    toast.success("Product updated successfully")
                    clearfields();
                }
                else
                {
                   toast.success("Product not updated");
                }                
            }
        }
        catch(e)
        {
            toast.error("Some error occured" + e);
        }
    }
    var clearfields=()=>
    {
        setcat("")
        setsubcat("")
        setprodname("")
        setrate("")
        setdiscount("")
        setstock("")
        setfeat("");
        setdescription("");
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

    useEffect(()=>
    {
        fetchprodinfo();
    },[])

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
                }
                else 
                {
                    setcat(result.data.catid)
                    setsubcat(result.data.subcatid)
                    setprodname(result.data.prodname)
                    setrate(result.data.rate)
                    setdiscount(result.data.discount)
                    setdescription(result.data.description)
                    setstock(result.data.stock)
                    setfeat(result.data.featured)
                    setpicname(result.data.picture)

                }
            }
        }
        catch (e) {
            toast.error("Some error occured" + e);
        }
    }
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

    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Update Product</li>
                    </ol>
                </div>
            </div>

            <div className="login">
                <div className="container">
                    <h2>Update Product</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={onupdate}>
                        
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
                                </>:null
                            }
                        </select><br/>

                        <input type="text" value={prodname} name="pname" placeholder="Product Name" onChange={(e)=>setprodname(e.target.value)} required=" " /><br/>
                        <input type="text" name="rate" value={rate} placeholder="Rate" onChange={(e)=>setrate(e.target.value)} required=" " /><br/>
                        <input type="text" name="discount" value={discount} placeholder="Discount(in percent, do not add percent symbol)" onChange={(e)=>setdiscount(e.target.value)} required=" " /><br/>

                        {/* <textarea name="descrip" className="form-control" placeholder="Description" value={description} onChange={(e)=>setdescription(e.target.value)}></textarea><br/> */}

                        <ReactQuill theme="snow" value={description} onChange={setdescription} />

                        <input type="text" name="stock" value={stock} placeholder="Stock" onChange={(e)=>setstock(e.target.value)} required=" " /><br/>   

                        <img src={`uploads/${picname}`} alt="ProductPic" height="75"/>Choose new image if required

                        <input type="file" name="pic" onChange={(e)=>setpic(e.target.files[0])}/><br/>

                        Featured <label><input type="radio" name="feat" checked={feat==='yes'} value="yes" onChange={(e)=>setfeat(e.target.value)}/>Yes</label>

                        <label><input type="radio" name="feat" checked={feat==='no'} value="no" onChange={(e)=>setfeat(e.target.value)}/>No</label>

                        <input type="submit" value="Update" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UpdateProduct