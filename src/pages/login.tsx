import {LoginForm} from "@/components/login-form.tsx";

function Login() {

    return(
        <>
            <div className="bg-[url('./src/assets/login-background.jpg')]
                        bg-cover bg-center
                        flex items-center justify-center
                        min-h-screen min-w-full">
                <LoginForm/>
                <footer
                    className="fixed bottom-0 left-0 w-full
                    flex justify-between items-center
                    p-2
                    text-opacity-50"
                >
                    <p className="text-xs">© Credify Inc. All rights reserved</p>
                    <p className="text-xs">Contact support</p>
                </footer>
            </div>
        </>

    )


}
export default Login;