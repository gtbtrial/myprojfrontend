import {  useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify";
var ManageCategory = () => {
    const [catname,setcatname] = useState();
    const [pic,setpic] = useState(null);// image binary file
    const [allcat,setallcat] = useState([]);
    const [catid,setcatid]=useState();
    const [picname,setpicname]=useState();//only name of file, not actual image file
    const [editmode,seteditmode]=useState(false);
    const fileInputRef = useRef(null);
    var onsave=async(e)=>
    {
        try
        {
            e.preventDefault();
            const formData = new FormData();

            formData.append("cname",catname);

            if(pic!==null)//if file is selected
            {
                formData.append("picture",pic);
            }

            var resp = await fetch(`${process.env.REACT_APP_APIURL}/savecategory`,
            {
                method:"post",
                body: formData,
                headers:{authorization:`${sessionStorage.getItem("token")}`}
            })
            if(resp.ok)
            {
                var result = await resp.json();
                if(result.statuscode===1)
                {
                    toast.success("Category added successfully")
                    fetchallcat();
                }
                else
                {
                   toast.success("Category not added");
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
    var onupdate = (data)=>
    {
        seteditmode(true);
        setcatid(data._id)
        setpicname(data.picture)
        setcatname(data.catname)
    }
    var onupdatedb=async ()=>
    {
        try
        {
            const formData = new FormData();
            formData.append("cname",catname);//either oldname or newname
            if(pic!==null)//admin wants to update picture
            {
                formData.append("picture",pic);
            }
            formData.append("oldpicname",picname);
            formData.append("catid",catid);

            var resp = await fetch(`${process.env.REACT_APP_APIURL}/updatecategory`,
            {
                method:"put",
                body: formData
            })
            if(resp.ok)
            {
                var result = await resp.json();
                if(result.statuscode===1)
                {
                    toast.success("Category updated successfully")
                    fetchallcat();
                }
                else
                {
                   toast.success("Category not updated");
                }                
            }
        }
        catch(e)
        {
            toast.error("Some error occured" + e);
        }
    }

    var oncancel=()=>
    {
        seteditmode(false);
        setcatname("")
        setcatid("")
        setpicname("")
        if (fileInputRef.current) 
        {
            fileInputRef.current.value = '';
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
                    toast.error("No categories added yet")
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
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Manage Category</li>
                    </ol>
                </div>
            </div>

            <div className="login">
                <div className="container">
                    <h2>Manage Category</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={onsave}>
                        <input type="text" name="cname" value={catname} placeholder="Category Name" onChange={(e)=>setcatname(e.target.value)} required=" " /><br/>

                        {
                            editmode?
                            <>
                            <img src={`uploads/${picname}`} height='75'/>
                            Choose new image if required
                            </>:null
                        }

                        <input type="file" ref={fileInputRef} name="catpic" onChange={(e)=>setpic(e.target.files[0])}/>

                      { editmode===false? <input type="submit" name="btn" value="Add" />:true}

        {editmode?<input type="button" className="btn btn-primary" name="btn3" value="Update" onClick={onupdatedb} />:null}

       {editmode?<input type="button" name="btn2" className="btn btn-danger" onClick={oncancel} value="Cancel" />:null}
                        </form>
                    </div><br/>
                {
                    allcat.length>0?
                    <>
                        <h2>Added Categories</h2><br/>
                        <table className="timetable_sub">
                            <tbody>
                                <tr>
                                    <th>Picture</th>
                                    <th>Name</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                                {
                                allcat.map((data,index)=>
                                <tr key={index}>
                                    <td><img src={`uploads/${data.picture}`} height='75'/></td>
                                    <td>{data.catname}</td>
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
export default ManageCategory