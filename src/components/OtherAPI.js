import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify";
var OtherAPI = () => {
    const [data, setdata] = useState([]);
    var fetchdata = async () => {
        try {
            var resp = await fetch(`https://jsonplaceholder.typicode.com/posts`)
            if (resp.ok) 
            {
                var result = await resp.json();
                setdata(result);
            }
        }
        catch (e) {
            toast.error("Some error occured" + e);
        }
    }

    useEffect(() => {
        fetchdata();
    }, [])


    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">List of Posts</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    
                    {
                        data.length > 0 ?
                            <>
                                 <h2>List of Posts</h2><br />
                                <table className="timetable_sub">
                                    <tbody>
                                        <tr>
                                            <th>ID</th>
                                            <th>Title</th>
                                            <th>Body</th>
                                        </tr>
                                        {
                                            data.map((data, i) =>
                                                <tr key={i}>
                                                    <td>{data.id}</td>
                                                    <td>{data.title}</td>
                                                    <td>{data.body}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </> : <h2>No posts found</h2>
                    }
                </div>
            </div>
        </>
    )
}
export default OtherAPI