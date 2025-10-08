import axios from 'axios';
import './App.css';
import { useState } from 'react';
function App() {
  const [text, setText] = useState(null);
  const onClick = async () => {
    const token = 'acd4892e-0f94-4d49-ab83-e15049ea0f96';
    const headers = new Headers({
      Authorization: 'Bearer ' + token,
    });
    try{
      let apidata = await axios('https://api.wanikani.com/v2/subjects',{
        method: 'GET',
        headers: headers
      });
      setText(apidata.data);
      // let grab = (endpoint) => {
      // fetch('https://api.wanikani.com/v2/' + endpoint, {
      //     method: 'GET',
      //     headers: headers
      //   }
      // )
      //   .then(response => response.json())
      //   .then(responseBody => {
      //     console.log(responseBody);
      //     setText(responseBody);
      //   });
      // }
      // grab("subjects");
    }
    catch(e){
      console.log(e);
    }
  }
  return (
    <div>
      <button onClick={onClick}>시작</button>
      {text && <textarea rows={7} value={JSON.stringify(text, null, 2)} readOnly={true} />}
    </div>
  );
}

export default App;
