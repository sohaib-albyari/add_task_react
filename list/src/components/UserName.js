import { useLocation } from "react-router-dom";

function UserName(props) {

    const userName = useLocation();

    return (
        <>
            <h1>Welcome {userName.state.user}</h1>
        </>
    )
}
export default UserName;