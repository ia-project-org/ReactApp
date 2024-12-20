import {useCallback, useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from 'react-router-dom';
import * as Toast from "@radix-ui/react-toast";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useAuth} from "@/keycloak/Authentification";

type LoginFormInputs = {
    username: string;
    password: string;
    rememberMe: boolean;
}

export function LoginForm() {
    const navigation = useNavigate();
    const [loginError, setLoginError] = useState<string | null>(null);
    const {userLogin} = useAuth();

    const form = useForm<LoginFormInputs>({
        defaultValues: {
            username: "",
            password: "",
            rememberMe: false,
        },
    });

    const onSubmit = useCallback<SubmitHandler<LoginFormInputs>>(async (data) => {
        try {
            const user = await userLogin(data.username, data.password);
            if (user) {
                navigation('/dashboard');
            }
        } catch (error) {
            setLoginError("Incorrect username or password");
        }
    }, [navigation]);

    const handleCloseToast = () => setLoginError(null);

    return (
        <Toast.Provider swipeDirection="right">
            <Card className="mx-auto max-w-md w-full px-4 py-6">
                <CardHeader className="mb-5">
                    <div className="flex justify-center mb-4">
                        <img
                            src="./src/assets/logo.png"
                            alt="App logo"
                            className="w-42"
                        />
                    </div>
                    <CardTitle className="text-2xl">Welcome back to Credify</CardTitle>
                    <CardDescription>
                        Enter your username and password to continue
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                name="username"
                                control={form.control}
                                rules={{ required: "Username is required" }}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel>Username</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="Enter your username"
                                            {...field}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="password"
                                control={form.control}
                                rules={{ required: "Password is required" }}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col items-start">
                                        <FormLabel>Password</FormLabel>
                                        <Input
                                            type="password"
                                            placeholder="Enter your password"
                                            {...field}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="rememberMe"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-2">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel>Remember me</FormLabel>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? 'Logging in...' : 'Login'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>

                {loginError && (
                    <Toast.Root
                        open={!!loginError}
                        onOpenChange={handleCloseToast}
                        className="my-4 p-4 rounded-lg bg-white border-2 border-red-200"
                    >
                        <Toast.Title className="text-red-600 font-semibold">
                            Login Failed
                        </Toast.Title>
                        <Toast.Description className="text-red-600">
                            {loginError}
                        </Toast.Description>
                        <Toast.Close className="text-red-600 hover:underline">
                            Dismiss
                        </Toast.Close>
                    </Toast.Root>
                )}
                <Toast.Viewport className="fixed top-0 right-20 z-[100] m-4" />
            </Card>
        </Toast.Provider>
    );
}