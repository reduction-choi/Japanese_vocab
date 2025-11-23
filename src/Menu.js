import './Menu.scss';
function Menu({states, setStates}){
    const handleClick = (e) => {
        setStates(prevStates => {
            const {name} = e.target;
            return {
                ...prevStates,
                menu: name
            };
        });
    }
    const handleLogout = () => {
        localStorage.removeItem("token");
        setStates(prevStates => {
            return {
                menu: "main",
                user: null
            };
        });
    }
    return (
        <div className='menu-container'>
            <button name="main" onClick={handleClick}>main</button>
            {states.user === null ? <button name="login" onClick={handleClick}>login</button> : <button name="logout" onClick={handleLogout}>logout</button>}
            {states.user === null ? <button name="register" onClick={handleClick}>register</button> : ""}
            <button name="study" onClick={handleClick}>GO STUDYING!</button>
        </div>
    )
}
export default Menu;