function DBConnection(){
    async function connect() {
        try {
            console.log("working");
            fetch("https://integrated-backend.onrender.com/api/japanese/hello")
                .then(res => res.json())
                .then(data => console.log(data));

            fetch("https://integrated-backend.onrender.com/api/japanese/connect")
                .then(res => res.json())
                .then(data => console.log(data));
        } catch(e) {
            console.log(e);
        }
    }
    return (
        <div>
            <button onClick={connect}>DB 연결</button>
        </div>
    )
}
export default DBConnection;