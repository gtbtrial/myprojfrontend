import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify";
var ListofUsers = () => {
    const [membslist, setmembslist] = useState([]);
    var fetchusers = async () => {
        try {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchusers`)
            if (resp.ok) {
                var result = await resp.json();
                if (result.statuscode === 0) {
                    toast.error("No members found")
                }
                else {
                    setmembslist(result.allusers);
                }
            }
        }
        catch (e) {
            toast.error("Some error occured" + e);
        }
    }

    useEffect(() => {
        fetchusers();
    }, [])

    var ondel = async (id) => {
        if (window.confirm("Are you sure to delete?")) {
            try {
                var resp = await fetch(`${process.env.REACT_APP_APIURL}/deluser/${id}`,
                    {
                        method: "delete"
                    })
                if (resp.ok) {
                    var result = await resp.json();
                    if (result.statuscode == 1) {
                        toast.success("User deleted successfully");
                        fetchusers();
                    }
                    else if (result.statuscode == 0) {
                        toast.success("User not deleted successfully");
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
                        <li className="active">List of Users</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    
                    {
                        membslist.length > 0 ?
                            <>
                                 <h2>List of Users</h2><br />
                                <table className="timetable_sub">
                                    <tbody>
                                        <tr>
                                            <th>Name</th>
                                            <th>Phone</th>
                                            <th>Username</th>
                                            <th>Delete</th>
                                        </tr>
                                        {
                                            membslist.map((data, i) =>
                                                <tr key={i}>
                                                    <td>{data.name}</td>
                                                    <td>{data.phone}</td>
                                                    <td>{data.username}</td>
                                                    <td><button className="btn btn-danger" onClick={() => ondel(data._id)}>Delete</button></td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </> : <h2>No members found</h2>
                    }
                </div>
            </div>
        </>
    )
}
export default ListofUsers