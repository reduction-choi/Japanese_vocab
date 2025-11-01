import { useState } from "react";

function Login(){
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
        fetch("https://japanese-vocab-4eoh.onrender.com/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: values.id,
                passwd: values.passwd
            })
        })
        .then(res => res.json())
        .then(data => console.log(data));

    }
    return (
        <div>
            <h1>ID: </h1>
            <input type="text" name="id" value={values.title} onChange={handleChange} />
            <h1>PW: </h1>
            <input type="text" name="passwd" value={values.passwd} onChange={handleChange} />
            <button onClick={handleClick}>Login</button>
        </div>
    )
}
export default Login;