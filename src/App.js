import './App.css';
import { useEffect, useState} from 'react';
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
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      fetch("https://super-space-zebra-6666vj9gjqvcjx7-3001.app.github.dev/api/verify", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if(!res.ok){
          throw new Error("Token Invalid");
        }
        return res.json()
      })
      .then(data => {
          console.log(data.user.id);
          setStates(prevStates => {
            return {
              ...prevStates,
              user: data.user.id
            }
          });
      })
      .catch(() => {
        localStorage.removeItem("token");
        setStates(prevStates => {
          return {
            ...prevStates,
            user: null
          }
        });
      });
    }
    else{
      return;
    }
  }, []);
  return (
    <div>
      <Menu states={states} setStates={setStates}/>
      {(()=>{
        if(states.menu === "main"){
          return <Main states={states}/>
        }
        else if(states.menu === "login"){
          return <Login setStates={setStates}/>
        }
        else if(states.menu === "register"){
          return <Register setStates={setStates}/>
        }
        else if(states.menu === "study"){
          return <Somepage states={states}/>
        }
      })()}
    </div>
  );
}

export default App;
