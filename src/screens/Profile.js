import { useParams } from "react-router-dom";

function Profile() {
    const { username } = useParams();
    //useParams --> Route에 :val_name의 val_name 값을 가져올 수 있음
    return "Profile";
}

export default Profile;