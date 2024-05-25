import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify";
var WeatherInfo = () => {
    const [data, setdata] = useState({});
    const [city, setcity] = useState();
    var fetchdata = async () => {
        try {
            var resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0cef9ce50886d905c871f0dd52775df4&units=metric`)
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
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Show Weather</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">

                    <select name="city" onChange={(e)=>setcity(e.target.value)}>
                        <option value="">Choose City</option>
                        <option>Jalandhar</option>
                        <option>Amritsar</option>
                        <option>Ludhiana</option>
                    </select>
                    <button onClick={fetchdata}>Show Weather</button>
                    {
                    Object.keys(data).length>0?
                    <>
                        Overall :- {data.weather[0].main}<br/>
                        Temp :- {data.main.temp}
                    </>:null
                    }
                </div>
            </div>
        </>
    )
}
export default WeatherInfo