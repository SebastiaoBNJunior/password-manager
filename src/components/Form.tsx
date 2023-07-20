import React, { useState } from 'react';

function Form() {
  const [service, setService] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Aqui você pode testar e realizar a lógica para cadastrar os dados,
    // como enviar para um servidor, salvar no local storage, etc.
    // console.log('Dados cadastrados:');
    // console.log('Nome do serviço:', service);
    // console.log('Login:', login);
    // console.log('Senha:', password);
    // console.log('URL:', url);

    // Limpar os campos do formulário após o cadastro
    setService('');
    setLogin('');
    setPassword('');
    setUrl('');
  };

  const handleCancel = () => {
    // Limpar os campos do formulário ao cancelar
    setService('');
    setLogin('');
    setPassword('');
    setUrl('');
  };

  return (
    <form onSubmit={ handleSubmit }>
      <div>
        <label htmlFor="service">Nome do Serviço</label>
        <input
          type="text"
          id="service"
          value={ service }
          onChange={ (e) => setService(e.target.value) }
          required
        />
      </div>

      <div>
        <label htmlFor="login">Login</label>
        <input
          type="text"
          id="login"
          value={ login }
          onChange={ (e) => setLogin(e.target.value) }
          required
        />
      </div>

      <div>
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          required
        />
      </div>

      <div>
        <label htmlFor="url">URL</label>
        <input
          type="text"
          id="url"
          value={ url }
          onChange={ (e) => setUrl(e.target.value) }
          required
        />
      </div>

      <div>
        <button type="submit">Cadastrar</button>
        <button type="button" onClick={ handleCancel }>Cancelar</button>
      </div>
    </form>
  );
}

export default Form;
