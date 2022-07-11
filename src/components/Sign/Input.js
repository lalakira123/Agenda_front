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
`

