import { useState } from "react";

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
        fetch("https://super-space-zebra-6666vj9gjqvcjx7-3001.app.github.dev/api/login", {
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
                    menu: "main",
                    user: values.id
                };
            });
        });
        setValues({
            id: "",
            passwd: ""
        });
    }
    return (
        <div>
            <h1>ID: </h1>
            <input type="text" name="id" value={values.id} onChange={handleChange} />
            <h1>PW: </h1>
            <input type="text" name="passwd" value={values.passwd} onChange={handleChange} />
            <button onClick={handleClick}>Login</button>
        </div>
    )
}
export default Login;