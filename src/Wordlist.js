import WordlistItem from "./WordlistItem";
const Wordlist = ({words}) => {
    return (
        <div>
            {words.map(word => (<WordlistItem word={word}></WordlistItem>))}
        </div>
    )
}
export default Wordlist;