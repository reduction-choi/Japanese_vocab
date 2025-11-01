import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

function LoginRegister(){
    const [login, setLogin] = useState(true);
    const handleClick = (e) => {
        setLogin(prevLogin => {return !prevLogin});
    }
    return (
        <div>
            <button onClick={handleClick}>전환</button>
            {login ? <Login/> : <Register/>}
        </div>
    )
}
export default LoginRegister;