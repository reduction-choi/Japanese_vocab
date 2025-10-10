const WordlistItem = ({word}) => {
    const {meaning, hiragana, _} = word;
    return (
        <div className="WordlistItem">
            <div>
                {meaning}
            </div>
            <div>
                {hiragana}
            </div>
        </div>
    )
}
export default WordlistItem;