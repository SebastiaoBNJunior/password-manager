// Importando o hook useState do React
import { useState } from 'react';

// Definindo o tipo de estado inicial para as informações do serviço
type EstadoInicial = {
  url: string;
  nameService: string;
  login: string;
  password: string;
};

export default function Form() {
  // Definindo os estados para cada campo do formulário
  const [nameService, setnameService] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [formVisible, setformVisible] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [infos, setInfos] = useState<EstadoInicial[]>([]);
  const [hidePassword, setHidePassword] = useState(false);
  const [typePassword, setTypePassword] = useState('password');

  // Função para exibir o formulário ao clicar no botão "Cadastrar nova senha"
  const handleCadastrarButton = () => {
    setformVisible(true);
  };

  // Função para cancelar o cadastro e esconder o formulário
  const handleCancelarButton = () => {
    setformVisible(false);
  };

  // Função para submeter o formulário ao clicar no botão "Cadastrar"
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newService: EstadoInicial = {
      nameService,
      login,
      password,
      url,
    };
    setInfos([newService, ...infos.slice().reverse()]);
    setformVisible(false);
    resetForm();
  };

  // Função para remover um serviço da lista de informações
  const deleteService = (index: number) => {
    const updatedinfos = [...infos];
    updatedinfos.splice(index, 1);
    setInfos(updatedinfos);
  };

  // Função para alternar a visibilidade da senha
  const passwordHideorNot = () => {
    setHidePassword(!hidePassword);
  };

  // Função para alternar o tipo de input da senha (password/text)
  const passwordType = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (typePassword === 'password') {
      setTypePassword('text');
    } else {
      setTypePassword('password');
    }
  };

  // Função utilitária para verificar se uma string é válida (não vazia)
  const stringValid = (value: string) => value !== '';

  // Verifica se todos os campos obrigatórios estão preenchidos
  const validEverthing = stringValid(nameService) && stringValid(login);

  // Verifica se a senha atende aos requisitos mínimos
  const isPasswordValid = () => {
    const passwordMin = password.length >= 8;
    const passwordMax = password.length <= 16;
    const hasNumberandLetters = /[0-9]/.test(password) && /[a-zA-Z]/.test(password);
    const caracteresEspeciais = /\W|_/.test(password);

    return (
      passwordMin
      && passwordMax
      && hasNumberandLetters
      && caracteresEspeciais
    );
  };

  // Verifica se todo o formulário é válido
  const isFormValid = () => {
    setFormValid(validEverthing && isPasswordValid);
  };

  // Constantes para controlar a estilização do feedback da senha
  const valid = 'valid-password-check';
  const invalid = 'invalid-password-check';

  // Reseta os campos do formulário
  const resetForm = () => {
    setnameService('');
    setLogin('');
    setPassword('');
    setUrl('');
    setTypePassword('password');
  };

  // Atualiza o estado da senha e verifica a validade do formulário
  const handleTargetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    isFormValid();
  };

  return (
    <div>
      {formVisible ? (
        // Formulário para cadastrar nova senha
        <form>
          <label htmlFor="nameService">Nome do Serviço</label>
          <input
            id="nameService"
            type="text"
            value={ nameService }
            onChange={ ({ target }) => setnameService(target.value) }
          />
          <label htmlFor="login">Login</label>
          <input
            id="login"
            type="text"
            value={ login }
            onChange={ ({ target }) => setLogin(target.value) }
          />
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type={ typePassword }
            value={ password }
            onChange={ handleTargetPassword }
          />

          <button
            data-testid="show-hide-form-password"
            onClick={ passwordType }
          >
            Mostrar/Esconder senha
          </button>

          <div>
            <p className={ password.length >= 8 ? valid : invalid }>
              Possuir 8 ou mais caracteres
            </p>
            <p className={ password.length <= 16 ? valid : invalid }>
              Possuir até 16 caracteres
            </p>
            <p className={ /[0-9]/.test(password) && /[a-zA-Z]/.test(password) ? valid : invalid }>
              Possuir letras e números
            </p>
            <p className={ /\W|_/.test(password) ? valid : invalid }>
              Possuir algum caractere especial
            </p>
          </div>

          <label htmlFor="url">URL</label>
          <input
            type="text"
            name="url"
            id="url"
            value={ url }
            onChange={ ({ target }) => setUrl(target.value) }
          />

          <button type="submit" disabled={ !formValid } onClick={ handleSubmit }>
            Cadastrar
          </button>
          <button onClick={ handleCancelarButton }>Cancelar</button>
        </form>
      ) : (
        // Tela de visualização dos serviços cadastrados
        <>
          <label htmlFor="hidePassword">
            <input
              type="checkbox"
              id="hidePassword"
              checked={ hidePassword }
              onChange={ passwordHideorNot }
            />
            Esconder senhas
          </label>

          {infos.length === 0 ? (
            <p>Nenhuma senha cadastrada</p>
          ) : (
            <>
              <h4>Serviços cadastrados:</h4>
              <ul>
                {infos.reverse().map((estadoInicial, index) => (
                  <li key={ index }>
                    <a
                      href={ estadoInicial.url }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {estadoInicial.nameService}
                    </a>
                    <p>{estadoInicial.login}</p>
                    <p>{hidePassword ? '******' : estadoInicial.password}</p>
                    <button
                      data-testid="remove-btn"
                      onClick={ () => deleteService(index) }
                    >
                      Excluir
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
          <button onClick={ handleCadastrarButton } name="Cadastrar nova senha">
            Cadastrar nova senha
          </button>
        </>
      )}
    </div>
  );
}
