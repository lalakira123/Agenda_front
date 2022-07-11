import styled from 'styled-components';

function PageContainer({children}){
    return(
        <Container>
            {children}
        </Container>
    )
}

export default PageContainer;

const Container = styled.main`
    padding: 120px;
`