import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import GlobalStyle from "./styles/global.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            cacheTime: 10 * 60 * 1000,
            refetchOnWindowFocus: false,
        },
    },
});

createRoot(document.getElementById("root")).render(
    <>
        <QueryClientProvider client={queryClient}>
            <GlobalStyle />
            <App />
        </QueryClientProvider>
    </>,
);
