import { faFacebookSquare, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react"
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import PageTitle from "../components/PageTitle";
import routes from "../routes";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

function Login() {
    const [username,setUsername] = useState("");
    const [usernameError,setUsernameError] = useState("");
    const onUsernameChange = (event) => {
        setUsernameError("");
        setUsername(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if(username===""){
            setUsernameError("Not Empty");
        }
        if(username.length<10){
            setUsernameError("too short");
        }
    }
    return (
        <AuthLayout>
            <PageTitle title="Login" />
            <FormBox>
                <div>
                    <FontAwesomeIcon icon={faInstagram} size="3x"/>
                </div>
                <form onSubmit={handleSubmit}>
                    <Input onChange={onUsernameChange} value={username} type="text" placeholder="Username"/>
                    <Input type="password" placeholder="Password"/>
                    <Button type="submit" value="Login" disabled={username==="" && username.length<10}/>
                </form>
                <Separator>
                    <div></div>
                    <span>Or</span>
                    <div></div>
                </Separator>
                <FacebookLogin>
                    <FontAwesomeIcon icon={faFacebookSquare}/>
                </FacebookLogin>
            </FormBox>
            <BottomBox
                cta="Don't have an account?"
                linkText="Sign up"
                link={routes.signUp}
            />
        </AuthLayout>
    );
}
export default Login;