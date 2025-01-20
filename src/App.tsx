import './App.css'
import Route from "./routes/Route.tsx";
import {AuthProvider} from "./store/context/AuthProvider.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <Route/>
                </AuthProvider>
            </QueryClientProvider>
        </>
    )
}

export default App
