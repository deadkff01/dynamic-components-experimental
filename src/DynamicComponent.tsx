import React, { FC } from "react";

interface Props {
  component: string;
  propValues?: any;
  classNames?: any;
  children?: any;
}

export const DynamicComponent: FC<Props> = ({
  component,
  propValues,
  classNames,
  children,
}) => {
  const LazyComponent = React.lazy(() => import(`./components/${component}`));
  return (
    <LazyComponent {...propValues} classNames={classNames}>
      {children}
    </LazyComponent>
  );
};
