import { useState } from 'react';
import styled from "styled-components";
import PageContainer from "./../components/PageContainer";

import Input from './../components/Sign/Input';
import Button from './../components/Sign/Button';

import * as requestAuthApi from './../services/api/auth';

function SignIn(){
  const [ signIn, setSignIn ] = useState({email:"", password:""});
  
  function handleSignIn(){
    const promise = requestAuthApi.signIn(signIn);
    promise.then();
    promise.catch();
  }

  return(
    <PageContainer>
      <Content>
        <h1>Agenda</h1>
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
        <Button title={'Entrar'} action={handleSignIn}/>
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
`

