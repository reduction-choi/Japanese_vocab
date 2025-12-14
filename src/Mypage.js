import { useState } from 'react';
import './Mypage.scss';
function Mypage({states, setStates}) {
    const [values, setValues] = useState({
        original: "",
        new: "",
        new_check: ""
    });
    const Unregister = () => {
        if(window.confirm("정말로 탈퇴하시겠습니까? (계정 탈퇴 이후에는 계정을 복구할 수 없습니다.)")){
            fetch(process.env.REACT_APP_API_URL + "/api/unregister", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: states.user
                })
            })
            .then(res => res.json())
            .then(data => {
                setStates(prevStates => {
                    return {
                        menu: "main",
                        user: null
                    };
                });
                localStorage.removeItem("token");
                alert(data.message);
            })
        }
        else{
            return;
        }
    };
    const handleChange = (e) => {
        setValues(prevValues => {
            const { name, value } = e.target;
            return {
            ...prevValues,
            [name]: value
            };
        });
    };
    const PasswordChange = (e) => {
        if(values.new === values.new_check){
            fetch(process.env.REACT_APP_API_URL + "/api/changepassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: states.user,
                    original_passwd: values.original,
                    new_passwd: values.new
                })
            })
            .then(res => res.json())
            .then(data => {
                if(data.success === true){
                    setStates(prevStates => {
                        return {
                            ...prevStates,
                            menu: "main"
                        };
                    });
                }
                alert(data.message);
            })
            .catch(() => {
                console.log("error");
            });
        }
        else{
            alert("비밀번호 확인이 일치하지 않습니다.");
        }
    };
    return (
        <div className="mypage-container">
            <div className='information'>
                <h1>내 레벨</h1>
                <p>todo</p>
            </div>
            <div className='password-change'>
                <h1>이전 비밀번호</h1>
                <input type="text" name="original" value={values.original} onChange={handleChange} />
                <h1>변경할 비밀번호</h1>
                <input type="text" name="new" value={values.new} onChange={handleChange} />
                <h1>변경할 비밀번호 확인</h1>
                <input type="text" name="new_check" value={values.new_check} onChange={handleChange} />
                <br/>
                <button onClick={PasswordChange}>비밀번호 변경</button>
            </div>
            <div className='danger'>
                <h1>위험구역</h1>
                <button onClick={Unregister}>탈퇴</button>
            </div>
        </div>
    )
}
export default Mypage;