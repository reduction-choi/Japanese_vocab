function DBConnection(){
    async function connect() {
        try {
            console.log("working");
            fetch("https://japanese-vocab-4eoh.onrender.com/api/hello")
                .then(res => res.json())
                .then(data => console.log(data));

            fetch("https://japanese-vocab-4eoh.onrender.com/api/connect")
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