import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
const spanStyle = {
    padding: '20px',
    background: '#efefef',
    color: '#000000'
  }
  
  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '400px'
  }
  const slideImages = [
    {
      url: 'images/11.jpg'
    },
    {
      url: 'images/22.jpg'
    },
    {
      url: 'images/44.jpg',
    },
  ];
var Home = () => {
    const [prodsdata, setprodsdata] = useState([]);
    var fetchfeatprods=async()=>
    {
        try {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchfeatprods`)
            if (resp.ok) 
            {
                var result = await resp.json();
                if (result.statuscode === 0) 
                {
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
        fetchfeatprods();
    },[])
    return (
        <>
            <div className="login">
            <div className="slide-container">
        <Slide>
         {slideImages.map((slideImage, index)=> (
            <div key={index}>
              <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
              </div>
            </div>
          ))} 
        </Slide>
      </div><br/>
                <div className="container">
                   

                    <h2>Featured Products</h2><br/>
                    {
                        prodsdata.length>0?
                        <>
                        {
                        prodsdata.map((data,index)=>
                            <div key={index} className="col-md-4 top_brand_left">
                                <div className="hover14 column">
                                    <div className="agile_top_brand_left_grid">
                                        <div className="agile_top_brand_left_grid1">
                                            <figure>
                                                <div className="snipcart-item block" >
                                                    <div className="snipcart-thumb">
                                                        <Link to={`/details?pid=${data._id}`}>
                                                            <img title=" " alt=" " height='150' src={`uploads/${data.picture}` }/>
                                                            <p>{data.prodname}</p>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                            )
                        }</>:<h3>No products Found</h3>
                    }


                </div>
            </div>
        </>
    )
}
export default Home