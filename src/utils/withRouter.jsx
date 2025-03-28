import { useNavigate, useParams, useLocation } from 'react-router-dom';

export function withRouter(Component) {
  return props => (
    <Component
      {...props}
      navigate={useNavigate()}
      params={useParams()}
      location={useLocation()}
    />
  );
}