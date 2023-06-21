import React, { createContext, useContext } from 'react';
import { AxiosError } from 'axios';
import { IChildrenType } from '../types/IReactChildrenType';

type ErrorHandlerType = {
  handleError: (error: AxiosError) => void;
};

const ErrorHandlerContext = createContext<ErrorHandlerType | undefined>(
  undefined
);

export const ErrorHandlerProvider = ({ children }: IChildrenType) => {
  const handleError = (error: AxiosError<any>) => {
    if (error.response?.data?.message) {
      alert(error.response.data.message);
    } else {
      alert('Caso o erro persista entre em contato com um administrador');
    }
  };

  return (
    <ErrorHandlerContext.Provider
      value={{
        handleError,
      }}
    >
      {children}
    </ErrorHandlerContext.Provider>
  );
};

export function useErrorHandler() {
  const context = useContext(ErrorHandlerContext);

  if (!context)
    throw new Error(
      'useErrorHandler must be used within a ErrorHandlerProvider'
    );

  return context;
}
