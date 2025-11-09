import { useState, useRef } from "react";
import Wordlist from "./Wordlist";
import axios from "axios";
function LoadVocab() {
const [words, setWords] = useState([]);
  const nextID = useRef(0);
  const appendWords = (element) => {
    setWords(prevWords => prevWords.concat(element));
    nextID.currnet = nextID.currnet + 1;
  };
  const onClick = async () => {
    const token = 'acd4892e-0f94-4d49-ab83-e15049ea0f96';
    const headers = new Headers({
      Authorization: 'Bearer ' + token,
    });
    try{
        for(let level = 1 ; level <= 5 ; level++){
            let apidata = await axios('https://api.wanikani.com/v2/subjects?types=vocabulary&levels='+level.toString(),{
                method: 'GET',
                headers: headers
            });
            console.log(apidata);
            for(const wordinfo of apidata.data["data"]){
                const object = {
                meaning: wordinfo["data"]["meanings"]["0"]["meaning"],
                hiragana: wordinfo["data"]["readings"]["0"]["reading"],
                id: nextID.currnet
                };
                appendWords(object);
            }
        }
      
    }
    catch(e){
      console.log(e);
    }
  }
  return (
    <div>
      <button onClick={onClick}>시작</button>
      <Wordlist words={words}></Wordlist>
    </div>
  );
}
export default LoadVocab;