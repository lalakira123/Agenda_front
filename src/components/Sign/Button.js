import styled from 'styled-components';

function Button({title, action}){
  return(
    <Style>
      <button onClick={action}>{title}</button>
    </Style>
  );
}

export default Button;

const Style = styled.div`
  button {
    height: 60px;
    width: 182px;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 40px;
    color: #FFFFFF;
    background-color: #007BF7;
    border-radius: 12px;
    border: none;
    font-family: 'Lexend Deca', sans-serif;
  }
`