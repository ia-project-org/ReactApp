import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://localhost:9999/',
    realm: 'e-banking',
    clientId: 'react-client',

});

export default keycloak;
