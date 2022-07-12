import styled from "styled-components";

function Header(){
  return(
    <Content>Agenda</Content>
  );
}

export default Header;

const Content = styled.header`
  background-color: #000000;
  height: 100px;
  color: #FFFFFF;
  font-weight: 700;
  font-size: 50px;
  padding: 20px;
  padding-left: 120px;
`

