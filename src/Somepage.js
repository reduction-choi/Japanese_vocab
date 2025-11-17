import { useState } from "react";

function Somepage({states}){
    const [vocab_idx, setVocab_idx] = useState(0);
    const [vocab, setVocab] = useState([]);
    const handleClick = (e) => {
        console.log(states.user);
        fetch("https://super-space-zebra-6666vj9gjqvcjx7-3001.app.github.dev/api/loadvocab",{
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
            console.log(data.message);
            setVocab(prev => {
                return data.message;
            })
        });
    }
    const inc_idx = () => {
        setVocab_idx(prevIdx => {
            if(prevIdx + 1 < vocab.length)
                return prevIdx + 1;
            else
                return prevIdx;
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
    
    return (
        <div>
            <h1>NOTHING YET</h1>
            <button onClick={handleClick}>LoadVocab</button>
            {vocab.length === 0 ? <div/> : <div>
                <h1>{vocab[vocab_idx].hiragana}</h1>
                <h1>{vocab[vocab_idx].meaning}</h1>
                <button onClick={inc_idx}>다음</button>
                <h1>{vocab_idx}</h1>
                <button onClick={dec_idx}>이전</button>
            </div>}
        </div>
    )
}
export default Somepage;