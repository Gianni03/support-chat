import { Navigate } from "react-router";

interface Props {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

export const PrivateRoute = ({ children, isAuthenticated }: Props) => {
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  
  return (
    <div>{children}</div>
  )
}
