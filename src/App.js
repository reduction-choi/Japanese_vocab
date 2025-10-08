import axios from 'axios';
import './App.css';
import { useState } from 'react';
function App() {
  const [words, setWords] = useState([]);
  const appendWords = (element) => {
    setWords(words + element);
    //this may not work. Look for the book to solve prob.
  }
  const onClick = async () => {
    const token = 'acd4892e-0f94-4d49-ab83-e15049ea0f96';
    const headers = new Headers({
      Authorization: 'Bearer ' + token,
    });
    try{
      let apidata = await axios('https://api.wanikani.com/v2/subjects?types=vocabulary&levels=1',{
        method: 'GET',
        headers: headers
      });
      console.log(apidata.data["data"]);
      for(const wordinfo of apidata.data["data"]){
        const object = {
          meaning: wordinfo["data"]["meanings"][0]["meaning"],
          hiragana: wordinfo["data"]["readings"][0]["reading"]
        };
        appendWords(object);
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

export default App;
