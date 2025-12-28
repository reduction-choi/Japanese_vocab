import { useState, useEffect } from "react";
import DropdownComponent from "./DropdownComponent";
import './Somepage.scss';

function Somepage({states}){
    const [vocab_idx, setVocab_idx] = useState(0);
    const [vocab, setVocab] = useState([]);
    const [level, setLevel] = useState(states.user.maxLevel);
    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + "/api/loadvocab",{
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
            if(!res.ok){
                throw new Error("Internal Server Error");
            }
            return res.json()
        })
        .then(data => {
            if(data.success === true){
                //data.message.sort(() => Math.random() - 0.5);
                setVocab(prev => {
                    return data.message;
                });
                setVocab_idx(prev => {
                    return 0;
                });
            }
            else{
                alert(data.message);
            }
        })
        .catch(e => console.log(e));
    }, [states.user, level]);
    const mark_correct = () => {
        setVocab(prevVocab => {
            let newVocab = JSON.parse(JSON.stringify(prevVocab));
            newVocab[vocab_idx].num_correct++;
            newVocab[vocab_idx].num_shown++;
            return newVocab;
        });
        inc_idx();
        console.log(vocab);
    }
    const mark_incorrect = () => {
        setVocab(prevVocab => {
            let newVocab = JSON.parse(JSON.stringify(prevVocab));
            newVocab[vocab_idx].num_shown++;
            return newVocab;
        });
        inc_idx();
        console.log(vocab);
    }
    const inc_idx = () => {
        setVocab_idx(prevIdx => {
            if(prevIdx + 1 < vocab.length && prevIdx > vocab.length - 5){
                extendVocab();
                save([vocab[prevIdx]]);
                console.log(vocab[prevIdx]);
                return prevIdx + 1;
            }
            else if(prevIdx + 1 < vocab.length){
                console.log(vocab[prevIdx]);
                save([vocab[prevIdx]]);
                return prevIdx + 1;
            }
            else{
                return prevIdx;
            }
                
        });
    }
    const dec_idx = () => {
        setVocab_idx(prevIdx => {
            if(prevIdx - 1 >= 0)
                return prevIdx - 1;
            else
                return prevIdx;
        });
    }
    const extendVocab = () => {
        console.log("extend called");
        fetch(process.env.REACT_APP_API_URL + "/api/loadvocab",{
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
            if(!res.ok){
                throw new Error("Internal Server Error");
            }
            return res.json()
        })
        .then(data => {
            if(data.success === true){
                //data.message.sort(() => Math.random() - 0.5);
                setVocab(prev => {
                    return prev.concat(data.message);
                });
                // setVocab_idx(prev => {
                //     return 0;
                // });
            }
            else{
                alert(data.message);
            }
        })
        .catch(e => console.log(e));
    }
    const save = (vocabList) => {
        console.log(vocabList);
        fetch(process.env.REACT_APP_API_URL + "/api/savevocab",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: states.user.username,
                vocabs: vocabList
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.success === true){
                console.log("저장 완료!");
            }
        });
    }
    const levelUp = () => {
        fetch(process.env.REACT_APP_API_URL + "/api/levelUp",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: states.user.username
            })
        })
        .then(res => {
            if(!res.ok){
                throw new Error("Internal Server Error");
            }
            return res.json()
        })
        .then(data => {
            if(data.success === true){
                window.location.reload();
            }
            alert(data.message);
        })
        .catch(e => console.log(e));
    }
    return (
        <div className="somepage-container">
            <div className="somepage-header">
                <DropdownComponent setLevel={setLevel} states={states}></DropdownComponent>
                <button onClick={levelUp}>levelUp</button>
            </div>
            {vocab.length === 0 ? <div/> : <div className="vocab-card">
                <h1>{vocab[vocab_idx].character}</h1>
                <h1>{vocab[vocab_idx].hiragana}</h1>
                <h1>{vocab[vocab_idx].meaning}</h1>
                <h3>[{vocab[vocab_idx].pronounciation}]</h3>
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
                <button className="save-button" onClick={() => save(vocab)}>저장</button>
            </div>}
        </div>
    )
}
export default Somepage;