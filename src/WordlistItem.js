const WordlistItem = ({word}) => {
    const {meaning, hiragana, character, pronounciation,_} = word;
    return (
        <div className="WordlistItem">
            <div>
                {meaning}
            </div>
            <div>
                {hiragana}
            </div>
            <div>
                {character}
            </div>
            <div>
                {pronounciation}
            </div>
        </div>
    )
}
export default WordlistItem;