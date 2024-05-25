import {  useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

var ManageProduct = () => 
{
    const [cat,setcat] = useState("");
    const [subcat,setsubcat] = useState("");
    const [allcat,setallcat] = useState([]);
    const [subcatdata,setsubcatdata] = useState([]);
    const [prodsdata,setprodsdata] = useState([]);
    const [prodname,setprodname] = useState();
    const [rate,setrate] = useState();
    const [discount,setdiscount] = useState();
    const [description,setdescription] = useState();
    const [stock,setstock] = useState();
    const [feat,setfeat] = useState();
    const [pic,setpic] = useState(null);
    const navigate = useNavigate();
    const modules = {
        toolbar: [
          [{ 'header': '1'}, {'header': '2'}, {'font': []}],
          [{size: []}],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, 
           {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image', 'video'],
          ['clean']
        ],
        clipboard: {
          // toggle to add extra line breaks when pasting HTML:
          matchVisual: false,
        },
        history: {
          delay: 1000,
          maxStack: 50,
          userOnly: true
        }
      };

    var onsave=async(e)=>
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
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/saveproduct`,
            {
                method:"post",
                body: formData
            })
            if(resp.ok)
            {
                var result = await resp.json();
                if(result.statuscode===1)
                {
                    toast.success("Product added successfully")
                    clearfields();
                }
                else
                {
                   toast.success("Product not added");
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
    var onupdate=(prodid)=>
    {
        navigate({
            pathname: '/updateproduct',
            search: `?pid=${prodid}`
          });
    }
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Manage Product</li>
                    </ol>
                </div>
            </div>

            <div className="login">
                <div className="container">
                    <h2>Manage Product</h2>
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
                                </>:null
                            }
                        </select><br/>

                        <input type="text" value={prodname} name="pname" placeholder="Product Name" onChange={(e)=>setprodname(e.target.value)} required=" " /><br/>
                        <input type="text" name="rate" value={rate} placeholder="Rate" onChange={(e)=>setrate(e.target.value)} required=" " /><br/>
                        <input type="text" name="discount" value={discount} placeholder="Discount(in percent, do not add percent symbol)" onChange={(e)=>setdiscount(e.target.value)} required=" " /><br/>

                        {/* <textarea name="descrip" className="form-control" placeholder="Description" value={description} onChange={(e)=>setdescription(e.target.value)}></textarea><br/> */}

                        <ReactQuill theme="snow" value={description} modules={modules} onChange={setdescription} />

                        <input type="text" name="stock" value={stock} placeholder="Stock" onChange={(e)=>setstock(e.target.value)} required=" " /><br/>   

                        <input type="file" name="pic" onChange={(e)=>setpic(e.target.files[0])}/><br/>

                        Featured <label><input type="radio" name="feat" value="yes" onChange={(e)=>setfeat(e.target.value)}/>Yes</label>

                        <label><input type="radio" name="feat" value="no" onChange={(e)=>setfeat(e.target.value)}/>No</label>

                        <input type="submit" value="Add" />
                        </form>
                    </div>
                    {
                    prodsdata.length>0?
                    <>
                        <h2>Added Products</h2><br/>
                        <table className="timetable_sub">
                            <tbody>
                                <tr>
                                    <th>Picture</th>
                                    <th>Name</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                                {
                                prodsdata.map((data,index)=>
                                <tr key={index}>
                                    <td><img alt='ProductImage' src={`uploads/${data.picture}`} height='75'/></td>
                                    <td>{data.prodname}</td>
                                    <td><button className="btn btn-primary" onClick={()=>onupdate(data._id)}>Update</button></td>
                                    <td><button className="btn btn-danger">Delete</button></td>
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
export default ManageProduct