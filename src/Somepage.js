import { useState, useEffect } from "react";

function Somepage({states}){
    const [vocab_idx, setVocab_idx] = useState(0);
    const [vocab, setVocab] = useState([]);
    useEffect(() => {
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
            data.message.sort(() => Math.random() - 0.5);
            setVocab(prev => {
                return data.message;
            });
        });
    }, [states.user]);
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
    const save = () => {
        fetch("https://super-space-zebra-6666vj9gjqvcjx7-3001.app.github.dev/api/savevocab",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: states.user,
                vocabs: vocab
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.success === true){
                console.log("저장 완료!");
            }
        });
    }
    return (
        <div>
            {vocab.length === 0 ? <div/> : <div>
                <h1>{vocab[vocab_idx].hiragana}</h1>
                <h1>{vocab[vocab_idx].meaning}</h1>
                <div>
                    <button onClick={mark_correct}>정답</button>
                    <button onClick={mark_incorrect}>오답</button>
                </div>
                <div>
                    <button onClick={inc_idx}>다음</button>
                    <h1>{vocab_idx}</h1>
                    <button onClick={dec_idx}>이전</button>
                </div>
                <button onClick={save}>저장</button>
            </div>}
        </div>
    )
}
export default Somepage;