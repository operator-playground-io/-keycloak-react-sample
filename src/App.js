import AppState from './context/AppState';
import KeycloakApp from './components/KeycloakApp';

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  return (
      <AppState>
        <KeycloakApp />
      </AppState>
  );
}

export default App;
