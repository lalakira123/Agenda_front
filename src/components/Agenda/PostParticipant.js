import styled from 'styled-components';
import Modal from 'react-modal';
import { useContext, useState } from 'react';
import { FaTimes } from "react-icons/fa";

import * as requestParticipantApi from './../../services/api/participants';

import { UserContext } from '../../contexts/UserContext';

import Input from './Input';

function PostParticipant({isOpen, setOpenModal, commitmentId}){
  const [ participant, setParticipant ] = useState({commitmentId: commitmentId, name:"", email:""});
  const { user } = useContext(UserContext);

  const config = {
    headers: {Authorization: `Bearer ${user.token}`}
  };

  const customStyles = {
    content: {
      flexDirection: "column",
      justifyContent: "space-evenly",
      background: "#000000",
      top: '170px',
      right: 'auto',
      left: '40%',
      bottom: '40%'
    }
  };

  function postParticipant(e){
    e.preventDefault();
    const promise = requestParticipantApi.postParticipant(participant, config);
    promise.then(() => {
      setOpenModal(false);
      setParticipant({commitmentId:"", name:"", email:""});
    })
    promise.catch((e) => {
      console.log(e.message);
    })
  };

  return(
    <Modal isOpen={isOpen} style={customStyles}>
      <Div>
        <p>Novo Participante</p>
        <p onClick={() => setOpenModal(false)}><FaTimes/></p>
      </Div>
      <Form onSubmit={postParticipant}>
        <Input 
          placeholder='Participante'
          property={'name'} 
          type={'text'} 
          value={participant.name}
          setState={setParticipant}
          state={participant}
          />
        <Input 
          placeholder='Email'
          property={'email'} 
          type={'email'} 
          value={participant.email}
          setState={setParticipant}
          state={participant}
          />
        <button type='submit'>Adicionar</button>
      </Form>
    </Modal>
  );
}

export default PostParticipant;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  p {
    color: #FFFFFF;
    font-weight: 700;
    margin-bottom: 20px;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  button {
    margin-top: 10px;
    border-radius: 50px;
    height: 50px;
    background-color: #000000;
    font-weight: 700;
    color: #FFFFFF;
    border: 2px solid #FFFFFF;
    font-size: 15px;
  }
`

