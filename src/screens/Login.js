import { faFacebookSquare, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import PageTitle from "../components/PageTitle";
import routes from "../routes";
import { logUserIn } from "../apollo";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const LOGIN_MUTATION = gql`
    mutation login($username:String!,$password:String!){
        login(username:$username,password:$password){
            ok
            token
            error
        }
    }
`;

function Login() {
    const {register,handleSubmit,errors,formState,getValues,setError,clearErrors} = useForm({
        mode:"onChange",
    });//mode --> form의 유효성을 검증하는 많은 모드 존재
    //register --> 태그에 ref 사용 각각 태그 식별을 위해 name 사용
    //watch --> value 확인
    //error --> 태그에 만들어논 제한 조건(valid)에 위반하면 실시간으로 에러 데이터 저장 
    //formState --> data 변경이 일어나면 전부 확인 formState.isValid 유효성 검사 후 맞으면 true
    // mode가 onChange 이므로 Input data 값이 유효하게 입력되었는지 확인 유효하면 true 반환 아니면 false 반환
    //getValues --> useForm안에 받아놓은 value 반환
    //setError--> error custumizing
    //clearErrors --> 원하는 에러 삭제
    const onCompleted = (data) => {
        const {
            login:{ok,error,token}
        } = data;
        if(!ok){
            return setError("result",{
                message:error
            });
        }
        if(token){
            logUserIn(token);
        }
    };
    const [login,{loading}] = useMutation(LOGIN_MUTATION,{
        onCompleted,
    });
    const clearLoginError = () => {
        clearErrors("result");
    }
    const onSubmitValid = (data) => {
        if(loading){
            return;
        }
        const {username,password} = getValues();
        login({
            variables:{username,password}
        });
    };
    return (
        <AuthLayout>
            <PageTitle title="Login" />
            <FormBox>
                <div>
                    <FontAwesomeIcon icon={faInstagram} size="3x"/>
                </div>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input 
                        ref={register({
                            required:"Username is required",
                            minLength:{
                                value:5,
                                message:"Username should be longer than 5 chars.",
                            }
                        })}
                        onChange={clearLoginError} 
                        name="username" 
                        type="text" 
                        placeholder="Username"
                        hasError={Boolean(errors?.username?.message)}
                    />
                    <FormError message={errors?.username?.message}/>
                    <Input 
                        ref={register({
                            required:"Password is required"
                        })}
                        onChange={clearLoginError} 
                        name="password" 
                        type="password" 
                        placeholder="Password"
                        hasError={Boolean(errors?.username?.message)}
                    />
                    <FormError message={errors?.username?.message}/>
                    <Button 
                        type="submit" 
                        value={loading ? "Loading..." : "Log in"} 
                        disabled={!formState.isValid||loading} 
                    />
                    <FormError message={errors?.result?.message}/>
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