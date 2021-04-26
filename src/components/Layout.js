import styled from "styled-components";
import Header from "./Header";

const Content = styled.main`
  margin: 0 auto;
  margin-top: 45px;
  max-width: 930px;
  width: 100%;
`;

function Layout({children}){
    return (
        <>
            <Header/>
            <Content>{children}</Content>
        </>
    );
}
/*
<Layout>
    <Home/>
</Layout>
==> Home의 내용을 Layout에서 rendering이 가능하다
*/

export default Layout;