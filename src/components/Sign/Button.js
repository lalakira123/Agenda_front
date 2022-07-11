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
`