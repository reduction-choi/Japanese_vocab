import { useState } from 'react';
import './Mypage.scss';
function Mypage({ states, setStates }) {
    const [values, setValues] = useState({
        original: "",
        new: "",
        new_check: "",
        level_criteria_shown: states.user.level_criteria.num_shown,
        level_criteria_correct: states.user.level_criteria.num_correct,
        vocab_criteria_shown: states.user.vocab_criteria.num_shown,
        vocab_criteria_correct: states.user.vocab_criteria.num_correct,
    });
    const Unregister = () => {
        if (window.confirm("정말로 탈퇴하시겠습니까? (계정 탈퇴 이후에는 계정을 복구할 수 없습니다.)")) {
            fetch(process.env.REACT_APP_API_URL + "/api/unregister", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: states.user.username
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
        else {
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
        if (values.new === values.new_check) {
            fetch(process.env.REACT_APP_API_URL + "/api/changepassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: states.user.username,
                    original_passwd: values.original,
                    new_passwd: values.new
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success === true) {
                        localStorage.removeItem("token");
                        setStates(prevStates => {
                            return {
                                ...prevStates,
                                menu: "main",
                                user: null
                            };
                        });
                    }
                    alert(data.message);
                })
                .catch(() => {
                    console.log("error");
                });
        }
        else {
            alert("비밀번호 확인이 일치하지 않습니다.");
        }
    };
    const CriteriaChange = (e) => {
        fetch(process.env.REACT_APP_API_URL + "/api/changecriteria", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: states.user.username,
                new_criteria: {
                    level_criteria_shown: values.level_criteria_shown,
                    level_criteria_correct: values.level_criteria_correct,
                    vocab_criteria_shown: values.vocab_criteria_shown,
                    vocab_criteria_correct: values.vocab_criteria_correct
                }
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    setStates(prevStates => {
                        return {
                            ...prevStates,
                            menu: "main"
                        };
                    });
                    window.location.reload();
                }
                alert(data.message);
            })
            .catch(() => {
                console.log("error");
            });
    };
    return (
        <div className="mypage-container">
            <div className='information'>
                <h1>내 레벨</h1>
                <p>{states.user.maxLevel}</p>
            </div>
            <div className='criteria-change'>
                <h1>레벨업 기준</h1>

                <div className="criteria-row">
                    <span>레벨 기준</span>
                    <input type="text" name="level_criteria_shown" value={values.level_criteria_shown} onChange={handleChange} />
                    <span>중</span>
                    <input type="text" name="level_criteria_correct" value={values.level_criteria_correct} onChange={handleChange} />
                    <span>회 이상</span>
                </div>

                <div className="criteria-row">
                    <span>단어 기준</span>
                    <input type="text" name="vocab_criteria_shown" value={values.vocab_criteria_shown} onChange={handleChange} />
                    <span>중</span>
                    <input type="text" name="vocab_criteria_correct" value={values.vocab_criteria_correct} onChange={handleChange} />
                    <span>회 이상</span>
                </div>

                <button onClick={CriteriaChange}>레벨업 기준 변경</button>
            </div>

            <div className='password-change'>
                <h1>이전 비밀번호</h1>
                <input type="password" name="original" value={values.original} onChange={handleChange} />
                <h1>변경할 비밀번호</h1>
                <input type="password" name="new" value={values.new} onChange={handleChange} />
                <h1>변경할 비밀번호 확인</h1>
                <input type="password" name="new_check" value={values.new_check} onChange={handleChange} />
                <br />
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