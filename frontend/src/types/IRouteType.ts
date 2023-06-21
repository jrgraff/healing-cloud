import React from 'react';

export interface IRouteType {
  path: string;
  element?: React.ReactNode;
  children?: IChildrenRoute[];
}

interface IChildrenRoute extends Omit<IRouteType, 'children'> {}

export interface IBaseRoute extends IRouteType {
  children: IChildrenRoute[];
}
