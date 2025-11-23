function Main({states}){
    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",   // 화면 중간에 위치하도록 높이 확보
        textAlign: "center",
        fontSize: "28px"
    };

    return (
        <div style={containerStyle}>
            {(()=>{
                if(states.user == null){
                    return <h1>Login First, Please!</h1>
                }
                else{
                    return <h1>Welcome! {states.user}</h1>
                }
            })()}
        </div>
    )
}
export default Main;