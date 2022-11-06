import React from "react";

type LoadingWrapperProps = {
  loading: boolean;
  fallback: React.ReactNode;
  children: React.ReactNode;
};

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  loading,
  fallback,
  children,
  ...rest
}) => {
  return <div {...rest}>{loading ? fallback : children}</div>;
};

export default LoadingWrapper;
