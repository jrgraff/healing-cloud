import './style.css';

type ErrorProps = {
  error: string | number;
};

type ErrorMessage = {
  [key: number]: string;
};

export const Error = ({ error }: ErrorProps) => {
  const errorMessages: ErrorMessage = {
    404: 'Página não encontrada!',
    204: 'Conteúdo inexistente, atualize a página e tente novamente!',
  };

  const errorStatus = typeof error === 'number' ? error : 'Erro';
  const errorMessage =
    typeof error === 'number'
      ? errorMessages[error] || 'Erro ao acessar a página!'
      : error;

  return (
    <div className="error">
      <span className="errorCode">{errorStatus}</span>
      <div className="errorSeparator"></div>
      <span className="errorMessage">{errorMessage}</span>
    </div>
  );
};
