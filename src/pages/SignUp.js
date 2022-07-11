import { useState } from 'react';
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';

import PageContainer from "./../components/PageContainer";
import Input from './../components/Sign/Input';
import Button from './../components/Sign/Button';

import * as requestAuthApi from './../services/api/auth';

function SignUp(){
  const [ signUp, setSignUp ] = useState({name:"", email:"", password:"", confirmPassword:""});
  const navigate = useNavigate();

  function handleSignUp(){
    const promise = requestAuthApi.signUp(signUp);
    promise.then((response) => {
      console.log(response.data);
      navigate('/');
    });
    promise.catch((e) => {
      console.log(e.message);
    })
  }

  return(
    <PageContainer>
      <Content>
        <h1>Agenda</h1>
        <Input 
          property={'name'} 
          type={'text'} 
          placeholder={'Nome'} 
          value={signUp.name}
          setState={setSignUp}
          state={signUp}
          />
        <Input 
          property={'email'} 
          type={'email'} 
          placeholder={'E-mail'} 
          value={signUp.email}
          setState={setSignUp}
          state={signUp}
          /> 
        <Input 
          property={'password'} 
          type={'password'} 
          placeholder={'Senha'} 
          value={signUp.password}
          setState={setSignUp}
          state={signUp}
          />
        <Input 
          property={'confirmPassword'} 
          type={'password'} 
          placeholder={'Confirmar Senha'} 
          value={signUp.confirmPassword}
          setState={setSignUp}
          state={signUp}
          /> 
        <Button title={'Cadastre-se'} action={handleSignUp}/>
        <Link to='/'>
          <p>Já possui uma conta? Entre aqui!</p>
        </Link>
      </Content>
    </PageContainer>
  );
}

export default SignUp;

const Content = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 30px;
    margin-bottom: 30px;
  }
`