import { useState, useEffect } from "react";
import DropdownComponent from "./DropdownComponent";
import './Studypage.scss';

function Studypage({ states }) {
    const [vocab_idx, setVocab_idx] = useState(0);
    const [vocab, setVocab] = useState([]);
    const [setting, setSetting] = useState(states.user.setting);
    const [level, setLevel] = useState({
        max: states.user.maxLevel,
        min: states.user.maxLevel
    });
    useEffect(() => {
        if (level.min <= level.max) {
            fetch(process.env.REACT_APP_API_URL + "/api/loadvocab", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: states.user.username,
                    level: level,
                    num_vocab: 20
                })
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error("Internal Server Error");
                    }
                    return res.json()
                })
                .then(data => {
                    if (data.success === true) {
                        //data.message.sort(() => Math.random() - 0.5);
                        setVocab(prev => {
                            return data.message;
                        });
                        setVocab_idx(prev => {
                            return 0;
                        });
                    }
                    else {
                        alert(data.message);
                    }
                })
                .catch(e => console.log(e));
        }
        else {
            alert("범위가 맞지 않습니다.");
        }
    }, [states.user, level]);
    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + "/api/changesetting", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: states.user.username,
                new_setting: setting
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Internal Server Error");
                }
                return res.json()
            })
            .then(data => {
                if (data.success !== true) {
                    alert(data.message);
                }
            })
            .catch(e => console.log(e));
    }, [states.user, setting]);
    const setLevel_max = (newLevel) => {
        setLevel(prevLevel => {
            return {
                ...prevLevel,
                max: parseInt(newLevel)
            }
        })
    }
    const setLevel_min = (newLevel) => {
        setLevel(prevLevel => {
            return {
                ...prevLevel,
                min: parseInt(newLevel)
            }
        })
    }
    const mark_correct = () => {
        setVocab(prevVocab => {
            let newVocab = JSON.parse(JSON.stringify(prevVocab));
            newVocab[vocab_idx].num_correct++;
            newVocab[vocab_idx].num_shown++;
            save([newVocab[vocab_idx]]);
            return newVocab;
        });
        inc_idx();
    }
    const mark_incorrect = () => {
        setVocab(prevVocab => {
            let newVocab = JSON.parse(JSON.stringify(prevVocab));
            newVocab[vocab_idx].num_shown++;
            save([newVocab[vocab_idx]]);
            return newVocab;
        });
        inc_idx();
    }
    const inc_idx = () => {
        setVocab_idx(prevIdx => {
            if (prevIdx + 1 < vocab.length && prevIdx > vocab.length - 5) {
                extendVocab();
                return prevIdx + 1;
            }
            else if (prevIdx + 1 < vocab.length) {
                return prevIdx + 1;
            }
            else {
                return prevIdx;
            }
        });
    }
    const dec_idx = () => {
        setVocab_idx(prevIdx => {
            if (prevIdx - 1 >= 0)
                return prevIdx - 1;
            else
                return prevIdx;
        });
    }
    const extendVocab = () => {
        fetch(process.env.REACT_APP_API_URL + "/api/loadvocab", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: states.user.username,
                level: level,
                num_vocab: 10
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Internal Server Error");
                }
                return res.json()
            })
            .then(data => {
                if (data.success === true) {
                    //data.message.sort(() => Math.random() - 0.5);
                    setVocab(prev => {
                        return prev.concat(data.message);
                    });
                    // setVocab_idx(prev => {
                    //     return 0;
                    // });
                }
                else {
                    alert(data.message);
                }
            })
            .catch(e => console.log(e));
    }
    const save = (vocabList) => {
        fetch(process.env.REACT_APP_API_URL + "/api/savevocab", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: states.user.username,
                vocabs: vocabList
            })
        });
    }
    const levelUp = () => {
        fetch(process.env.REACT_APP_API_URL + "/api/levelUp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: states.user.username
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Internal Server Error");
                }
                return res.json()
            })
            .then(data => {
                if (data.success === true) {
                    window.location.reload();
                }
                alert(data.message);
            })
            .catch(e => console.log(e));
    }
    const handleChange = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;
        setSetting(prevSetting => {
            return {
                ...prevSetting,
                [name]: checked
            }
        })
    }
    return (
        <div className="somepage-container">
            <div className="somepage-header">
                <div className="range-group">
                    <span>range:</span>
                    <DropdownComponent level={level.min} setLevel={setLevel_min} states={states} />
                    <span>to</span>
                    <DropdownComponent level={level.max} setLevel={setLevel_max} states={states} />
                </div>
                <button onClick={levelUp}>levelUp</button>
            </div>
            {vocab.length === 0 ? <div /> : <div className="vocab-card">
                <div className="vocab">
                    {setting.show_character ? <h1>{vocab[vocab_idx].character}</h1> : <h1>[HIDDEN]</h1>}
                    <input type="checkbox" name="show_character" checked={setting.show_character} onChange={handleChange}></input>
                </div>
                <div className="vocab">
                    {setting.show_hiragana ? <h1>{vocab[vocab_idx].hiragana}</h1> : <h1>[HIDDEN]</h1>}
                    <input type="checkbox" name="show_hiragana" checked={setting.show_hiragana} onChange={handleChange}></input>
                </div>
                <div className="vocab">
                    {setting.show_meaning ? <h1>{vocab[vocab_idx].meaning}</h1> : <h1>[HIDDEN]</h1>}
                    <input type="checkbox" name="show_meaning" checked={setting.show_meaning} onChange={handleChange}></input>
                </div>
                <div className="vocab">
                    {setting.show_pronounciation ? <h3>[{vocab[vocab_idx].pronounciation}]</h3> : <h3>[hidden]</h3>}
                    <input type="checkbox" name="show_pronounciation" checked={setting.show_pronounciation} onChange={handleChange}></input>
                </div>
                <div className="vocab-info">
                    <p>level: {vocab[vocab_idx].level}</p>
                    <p>correct: {vocab[vocab_idx].num_correct}</p>
                    <p>incorrect: {vocab[vocab_idx].num_shown - vocab[vocab_idx].num_correct}</p>
                </div>
                <div className="answer-buttons">
                    <button onClick={mark_correct}>정답</button>
                    <button onClick={mark_incorrect}>오답</button>
                </div>
                <div className="navigation-buttons">
                    <button onClick={dec_idx}>이전</button>
                    <h1>{vocab_idx + 1}</h1>
                    <button onClick={inc_idx}>다음</button>
                </div>
                {/* <button className="save-button" onClick={() => save(vocab)}>저장</button> */}
            </div>}
        </div>
    )
}
export default Studypage;