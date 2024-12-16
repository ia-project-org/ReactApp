import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import "./index.css"
import App from './App.tsx'
import {AppProvider} from "@/context/AppContext.tsx";
import {Authentification} from "@/keycloak/Authentification.tsx";


createRoot(document.getElementById('root')!).render(
    <AppProvider>
        <Authentification>
            <StrictMode>
                <App />
            </StrictMode>
        </Authentification>
    </AppProvider>

)
