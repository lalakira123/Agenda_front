import { useState, useContext } from 'react';
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';

import { UserContext } from './../contexts/UserContext';

import PageContainer from "./../components/PageContainer";
import Input from './../components/Sign/Input';
import Button from './../components/Sign/Button';

import * as requestAuthApi from './../services/api/auth';

function SignIn(){
  const [ signIn, setSignIn ] = useState({email:"", password:""});
  const { setUser } = useContext(UserContext); 
  const navigate = useNavigate();

  function handleSignIn(e){
    e.preventDefault();
    const promise = requestAuthApi.signIn(signIn);
    promise.then((response) => {
        const { data } = response;
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/agenda');
    });
    promise.catch((e) => {
        console.log(e.message);
    });
  }

  return(
    <PageContainer>
      <Content>
        <h1>Agenda</h1>
        <form onSubmit={handleSignIn}>
          <Input 
            property={'email'} 
            type={'email'} 
            placeholder={'E-mail'} 
            value={signIn.email}
            setState={setSignIn}
            state={signIn}
            />
          <Input 
            property={'password'} 
            type={'password'} 
            placeholder={'Senha'} 
            value={signIn.password}
            setState={setSignIn}
            state={signIn}
            />  
          <Button title={'Entrar'}/>
        </form>
        <Link to='/signup'>
          <p>Ainda não possui uma conta? Cadastre-se aqui!</p>
        </Link>
      </Content>
    </PageContainer>
  );
}

export default SignIn;

const Content = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 30px;
    margin-bottom: 30px;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

