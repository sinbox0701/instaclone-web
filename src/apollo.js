import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN = "token";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token) => {
    localStorage.setItem(TOKEN, token);
    isLoggedInVar(true);
};

export const logUserOut = () => {
    localStorage.removeItem(TOKEN);
    isLoggedInVar(false);
};

export const darkModeVar = makeVar(false);

export const client = new ApolloClient({
    uri:"http://localhost:4000/graphql",
    cache: new InMemoryCache(),
});
//cache --> Apollo가 한번 가져온 정보를 기억해서 다시 안가져와도 되게 도와줌