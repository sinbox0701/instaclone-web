import {gql, useQuery, useReactiveVar} from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";

const ME_QUERY = gql`
    query me {
        me {
            username
            avatar
        }
    }
`;

function useUser(){
    const hasToken = useReactiveVar(isLoggedInVar);
    const {data} = useQuery(ME_QUERY,{
        skip:!hasToken
    });//Local Storage를 통해 로그인 한 경우에만 실행되는 query
    useEffect(()=>{
        if(data?.me===null){
            logUserOut();
        }
    },[data]);
    return ;
}

export default useUser;