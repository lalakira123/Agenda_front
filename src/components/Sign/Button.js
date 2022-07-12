import styled from 'styled-components';

function Button({title}){
  return(
    <Style>
      <button type='submit'>{title}</button>
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
    background-color: #000000;
    border-radius: 12px;
    border: none;
    font-family: 'Lexend Deca', sans-serif;
  }
`