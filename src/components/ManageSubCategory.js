import {  useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify";
var ManageSubCategory = () => {
    const [cat,setcat] = useState("");
    const [allcat,setallcat] = useState([]);
    const [subcatname,setsubcatname] = useState();
    const [pic,setpic] = useState(null);
    const [subcatdata,setsubcatdata] = useState([]);
    const [picname,setpicname] = useState();
    const [subcatid,setsubcatid] = useState();
    const[editmode,seteditmode] = useState(false);
    const fileInputRef = useRef(null);
    var onsave=async(e)=>
    {
        try
        {
            e.preventDefault();
            const formData = new FormData();
            formData.append("catid",cat);
            formData.append("scname",subcatname);

            if(pic!==null)//if file is selected
            {
                formData.append("picture",pic);
            }

            var resp = await fetch(`${process.env.REACT_APP_APIURL}/savesubcategory`,
            {
                method:"post",
                body: formData
            })
            if(resp.ok)
            {
                var result = await resp.json();
                if(result.statuscode===1)
                {
                    toast.success("Sub Category added successfully")
                    fetchsubcat();
                }
                else
                {
                   toast.success("Sub Category not added");
                }                
            }
        }
        catch(e)
        {
            toast.error("Some error occured" + e);
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
    var onupdate=(data)=>
    {
        seteditmode(true);
        setcat(data.catid)
        setsubcatname(data.subcatname)
        setpicname(data.picture);
        setsubcatid(data._id);
    }
    var oncancel=()=>
    {
        seteditmode(false);
        setcat("")
        setsubcatname("")
        setpicname("");
        setsubcatid("");
        if (fileInputRef.current) 
        {
            fileInputRef.current.value = '';
        }
        setpic(null);
        setsubcatdata([])
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
    var updatesubcat=async (e)=>
    {
        e.preventDefault();
        try
        {
            const formData = new FormData();
            formData.append("subcatid",subcatid);
            formData.append("catid",cat);
            formData.append("scname",subcatname);//either oldname or newname
            if(pic!==null)//admin wants to update picture
            {
                formData.append("picture",pic);
            }
            formData.append("oldpicname",picname);

            var resp = await fetch(`${process.env.REACT_APP_APIURL}/updatesubcategory`,
            {
                method:"put",
                body: formData
            })
            if(resp.ok)
            {
                var result = await resp.json();
                if(result.statuscode===1)
                {
                    toast.success("Sub Category updated successfully")
                    oncancel();
                }
                else
                {
                   toast.success("Sub Category not updated");
                }                
            }
        }
        catch(e)
        {
            toast.error("Some error occured" + e);
        }
    }
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Manage Sub Category</li>
                    </ol>
                </div>
            </div>

            <div className="login">
                <div className="container">
                    <h2>Manage Sub Category</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={editmode?updatesubcat:onsave}>
                        
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
                        </select>

                        <input type="text" value={subcatname} name="scname" placeholder="Sub Category Name" onChange={(e)=>setsubcatname(e.target.value)} required=" " /><br/>
                        {editmode?
                            <>
                                <img src={`uploads/${picname}`} height='75'/>Choose new image, if required<br/><br/>
                            </>:null
                        }
                        <input type="file" ref={fileInputRef} name="pic" onChange={(e)=>setpic(e.target.files[0])}/><br/>
                        {
                        editmode?
                        <>
                            <input type="submit" name="btn2" className="btn btn-primary" onClick={updatesubcat} value="Update" />&nbsp;

                            <input type="button" name="btn3" className="btn btn-danger" value="Cancel" onClick={oncancel} />

                        </>:<input type="submit" name="btn1" value="Add"/>
                        }
                        </form>
                    </div>
                    {
                    subcatdata.length>0?
                    <>
                        <h2>Added Sub Categories</h2><br/>
                        <table className="timetable_sub">
                            <tbody>
                                <tr>
                                    <th>Picture</th>
                                    <th>Name</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                                {
                                subcatdata.map((data,index)=>
                                <tr key={index}>
                                    <td><img src={`uploads/${data.picture}`} height='75'/></td>
                                    <td>{data.subcatname}</td>
                                    <td><button className="btn btn-primary" onClick={()=>onupdate(data)}>Update</button></td>
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
export default ManageSubCategory