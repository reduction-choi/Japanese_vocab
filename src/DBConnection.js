function DBConnection(){
    async function connect() {
        try {
            console.log("working");
            fetch("https://crispy-space-acorn-5666vwggqg4hvjj9-3001.app.github.dev/api/hello")
                .then(res => res.json())
                .then(data => console.log(data));

            fetch("https://crispy-space-acorn-5666vwggqg4hvjj9-3001.app.github.dev/api/connect")
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