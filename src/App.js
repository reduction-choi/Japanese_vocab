import './App.css';
import { useState} from 'react';
import Menu from './Menu';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import Somepage from './Somepage';
function App() {
  const [states, setStates] = useState({
    menu: "main",
    user: null
  });
  return (
    <div>
      <Menu setStates={setStates}/>
      {(()=>{
        if(states.menu === "main"){
          return <Main states={states}/>
        }
        else if(states.menu === "login"){
          return <Login setStates={setStates}/>
        }
        else if(states.menu === "register"){
          return <Register/>
        }
        else{
          return <Somepage/>
        }
      })()}
    </div>
  );
}

export default App;
