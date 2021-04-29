import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";
import {setContext} from"@apollo/client/link/context"

const TOKEN = "TOKEN";
const DARK_MODE = "DARK_MODE";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const logUserIn = (token) => {
    localStorage.setItem(TOKEN, token);
    isLoggedInVar(true);
};
export const logUserOut = () => {
    localStorage.removeItem(TOKEN);
    window.location.reload();
};

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));
export const enableDarkMode = () => {
    localStorage.setItem(DARK_MODE, "enabled");
    darkModeVar(true);
};
  export const disableDarkMode = () => {
    localStorage.removeItem(DARK_MODE);
    darkModeVar(false);
};

const httpLink = createHttpLink({
    uri:"http://localhost:4000/graphql",
});

const authLink = setContext((_,{headers})=>{
    return {
        headers:{
            ...headers,
            token:localStorage.getItem(TOKEN)
        }
    };
});//request의 context 설정

export const client = new ApolloClient({
    link:authLink.concat(httpLink),
    cache: new InMemoryCache({
        typePolicies:{
            User:{
                keyFields: (obj) => `User:${obj.username}`
            }
        }
    }),
});
//typePolicies --> 변경하고자하는 타입 지정
//keyFields --> key값을 무엇으로 하시겠나요? ==> username