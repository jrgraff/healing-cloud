import { IChildrenType } from '../types/IReactChildrenType';
import { ErrorHandlerProvider } from './errorHandler';

export const AppProvider = ({ children }: IChildrenType) => {
  return <ErrorHandlerProvider>{children}</ErrorHandlerProvider>;
};
