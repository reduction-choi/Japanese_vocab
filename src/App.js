import './App.css';
import { useEffect, useState} from 'react';
import Menu from './Menu';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import Somepage from './Somepage';
import Mypage from './Mypage';
import Loading from './Loading';
function App() {
  const [states, setStates] = useState({
      menu: "loading",
      user: null
    });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      fetch(process.env.REACT_APP_API_URL + "/api/verify", {
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
          console.log(data.user);
          setStates(prevStates => {
            return {
              ...prevStates,
              user: data.user,
              menu: "main"
            }
          });
      })
      .catch(() => {
        localStorage.removeItem("token");
        setStates(prevStates => {
          return {
            ...prevStates,
            user: null,
            menu: "main"
          }
        });
      });
    }
    else{
      setStates(prevStates => {
        return {
          ...prevStates,
          menu: "main"
        }
      });
    }
  }, []);
  return (
    <div>
      {states.menu === "loading" ? "" : <Menu states={states} setStates={setStates}/>}
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
        else if(states.menu === "mypage"){
          return <Mypage states={states} setStates={setStates}/>
        }
        else if(states.menu === "loading"){
          return <Loading/>
        }
        
      })()}
    </div>
  );
}

export default App;
