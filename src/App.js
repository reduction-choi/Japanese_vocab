import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
function App() {
  const [text, setText] = useState(null);
  function increment(number) {
    const promise = new Promise((resolve, reject) => {
      // resolve는 성공, reject는 실패
      setTimeout(() => {
        const result = number + 10;
        if (result > 50) { // 50보다 높으면 에러 발생시키기
          const e = new Error('NumberTooBig');
          return reject(e);
        }
        resolve(result); // number 값에 +10 후 성공 처리
      }, 1000)
    });
    return promise;
  }
  const onClick = async () => {
    try { // try/catch 구문을 사용하여 에러를 처리합니다.
    let result = await increment(0);
    console.log(result);
    setText(result);
    result = await increment(result);
    console.log(result);
    setText(result);
    result = await increment(result);
    console.log(result);
    setText(result);
    result = await increment(result);
    console.log(result);
    setText(result);
    result = await increment(result);
    console.log(result);
    setText(result);
    result = await increment(result);
    console.log(result);
    setText(result);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div>
      <button onClick={onClick}>시작</button>
      <h1>{text}</h1>
    </div>
  );
}

export default App;
