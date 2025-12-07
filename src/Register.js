import { useState } from "react";
import "./Register.scss"
function Register({setStates}){
    const [values, setValues] = useState({
        id: "",
        passwd: "",
        passwd_chk: "",
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
        if(values.passwd === values.passwd_chk){
            fetch(process.env.REACT_APP_API_URL + "/api/register", {
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
            .then(data => {
                console.log(data);
                if(data.success === true){
                    setStates(prevStates => {
                        return {
                            ...prevStates,
                            menu: "main"
                        };
                    });
                    alert(data.message);
                }
                else{
                    alert(data.message);
                }
            });
        }
        else{
            alert("비밀번호가 일치하지 않습니다.");
            setValues(prev => {
                return {
                    id: "",
                    passwd: "",
                    passwd_chk: ""
                };
            });
        }
    }
    return (
        <div className="register-container">
            <h1>ID: </h1>
            <input type="text" name="id" value={values.id} onChange={handleChange} />
            <h1>PW: </h1>
            <input type="password" name="passwd" value={values.passwd} onChange={handleChange} />
            <h1>RETYPE PW: </h1>
            <input type="password" name="passwd_chk" value={values.passwd_chk} onChange={handleChange} />
            <button onClick={handleClick}>Register</button>
        </div>
    )
}
export default Register;