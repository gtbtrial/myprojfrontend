import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";

var UserRoutesProtector=(props)=>
{
    const {userinfo} = useContext(userContext);
    const mynavigate = useNavigate();
    useEffect(()=>
    {
        if(userinfo===null)
        {
            mynavigate("/login");
        }
    },[])

    return(
        <>
            <props.compname/>
        </>
    )
}
export default UserRoutesProtector;