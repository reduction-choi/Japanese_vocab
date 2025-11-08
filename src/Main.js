function Main({states}){
    return (
        <div>
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