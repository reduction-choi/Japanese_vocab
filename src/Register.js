import { useState } from "react";

function Register(){
    const [values, setValues] = useState({
        id: "",
        passwd: "",
        number: 0
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
        fetch("https://crispy-space-acorn-5666vwggqg4hvjj9-3001.app.github.dev/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: values.id,
                passwd: values.passwd,
                number: parseInt(values.number)
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
            <h1>SOME_NUMBER: </h1>
            <input type="text" name="number" value={values.number} onChange={handleChange} />
            <button onClick={handleClick}>Register</button>
        </div>
    )
}
export default Register;