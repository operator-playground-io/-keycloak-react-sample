import Keycloak from 'keycloak-js';

const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV: 'development';
console.log('NODE_ENV: ', NODE_ENV);

const {REACT_APP_AUTH_SERVER_URL, REACT_APP_AUTH_REALM, REACT_APP_AUTH_CLIENT} = process.env;
console.log('REACT_APP_AUTH_SERVER_URL: ', REACT_APP_AUTH_SERVER_URL);
console.log('REACT_APP_AUTH_REALM: ', REACT_APP_AUTH_REALM);
console.log('REACT_APP_AUTH_CLIENT: ', REACT_APP_AUTH_CLIENT);

const {SERVER_URL, REALM, CLIENT} = window;
console.log('SERVER_URL: ', SERVER_URL);
console.log('REALM: ', REALM);
console.log('CLIENT: ', CLIENT);

const BACKEND_URL = NODE_ENV === 'development' ? REACT_APP_AUTH_SERVER_URL : SERVER_URL;
const BACKEND_REALM = NODE_ENV === 'development' ? REACT_APP_AUTH_REALM : REALM;
const BACKEND_CLIENT = NODE_ENV === 'development' ? REACT_APP_AUTH_CLIENT : CLIENT;
console.log('Backend URL: ', BACKEND_URL);
console.log('Backend REALM: ', BACKEND_REALM);
console.log('Backend CLIENT: ', BACKEND_CLIENT);

const kcConfig = {
    "realm": BACKEND_REALM,         //"myrealm", 
    "url": BACKEND_URL,          //"http://localhost:8080/auth/",
    "clientId": BACKEND_CLIENT      //"vanilla",
  }
console.log('Keycloak params: ', kcConfig);
const keycloak = new Keycloak(kcConfig);

export default keycloak;