import './Mypage.scss';
function Mypage({states, setStates}) {
    const Unregister = () => {
        console.log(states.user);
        if(window.confirm("정말로 탈퇴하시겠습니까? (계정 탈퇴 이후에는 계정을 복구할 수 없습니다.)")){
            fetch("https://super-space-zebra-6666vj9gjqvcjx7-3001.app.github.dev/api/unregister", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: states.user
                })
            })
            .then(res => res.json())
            .then(data => {
                setStates(prevStates => {
                    return {
                        menu: "main",
                        user: null
                    };
                });
                localStorage.removeItem("token");
                alert(data.message);
            })
        }
        else{
            return;
        }
    };
    return (
        
        <div className="mypage-container">
            {/* TODO: 비밀번호 변경 */}
            <h1>위험구역</h1>
            <button onClick={Unregister}>탈퇴</button>
        </div>
    )
}
export default Mypage;