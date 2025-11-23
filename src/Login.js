import { useState } from "react";
import "./Login.scss";
function Login({setStates}){
    const [values, setValues] = useState({
        id: "",
        passwd: ""
    });

    const handleChange = (e) => {
        setValues(prevValues => {
            const { name, value } = e.target;
            return {
            ...prevValues,
            [name]: value
            };
        });
    }
    const handleClick = (e) => {
        fetch("https://japanese-vocab-backend.onrender.com/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: values.id,
                passwd: values.passwd
            })
        })
        .then(res => {
            if(!res.ok){
                throw new Error("ID/PW invalid");
            }
            return res.json();
        })
        .then(data => {
            localStorage.setItem("token", data.token);
            setStates(prevStates => {
                return {
                    menu: "study",
                    user: values.id
                };
            });
        });
        setValues({
            id: "",
            passwd: ""
        });
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          handleClick(); // Trigger the button's action
        }
    };
    return (
        <div className="login-container">
            <h1>ID: </h1>
            <input type="text" name="id" value={values.id} onChange={handleChange} onKeyDown={handleKeyDown}/>
            <h1>PW: </h1>
            <input type="password" name="passwd" value={values.passwd} onChange={handleChange} onKeyDown={handleKeyDown}/>
            <button onClick={handleClick}>Login</button>
        </div>
    )
}
export default Login;