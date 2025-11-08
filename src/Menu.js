function Menu({setStates}){
    const handleClick = (e) => {
        setStates(prevStates => {
            const {name} = e.target;
            return {
                ...prevStates,
                menu: name
            };
        });
    }
    return (
        <div>
            <button name="main" onClick={handleClick}>main</button>
            <button name="login" onClick={handleClick}>login</button>
            <button name="register" onClick={handleClick}>register</button>
            <button name="study" onClick={handleClick}>GO STUDYING!</button>
        </div>
    )
}
export default Menu;