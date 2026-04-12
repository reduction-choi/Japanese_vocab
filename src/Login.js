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
        fetch(process.env.REACT_APP_API_URL + "/api/japanese/login", {
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
                alert("ID/PW invalid");
                throw new Error("error");
            }
            else{
                return res.json();
            }
        })
        .then(data => {
            localStorage.setItem("token", data.token);
            setStates(prevStates => {
                return {
                    menu: "study",
                    user: data.user
                };
            });
        })
        .catch(() => {
            console.log("error");
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