import styled from 'styled-components';

function Input({property, type, placeholder, value, setState, state}){
  return(
    <Style>  
      <input 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setState({...state, [property]: e.target.value})}
        required
      />
    </Style>
  )
}

export default Input;

const Style = styled.div`
  input {
    width: 200px;
    height: 20px;
    margin-bottom: 10px;
    border-radius: 12px;
    border: 1px solid rgba(120, 177, 89, 0.25);
    box-shadow: 0px 4px 24px 0px rgba(120, 177, 89, 0.12);
    font-size: 14px;
    padding: 21px;
    color: #000000;
    font-weight: 400;
    &::placeholder {
      color: #9C9C9C;
      font-weight: 400;
    }
  }
`