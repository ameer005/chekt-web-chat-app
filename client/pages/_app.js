import "../styles/globals.css";
import Layout from "@/components/layout/Layout";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
          {process.env.NODE_ENV !== "production" && (
            <ReactQueryDevtools
              initialIsOpen={false}
              position={"bottom-right"}
            />
          )}
        </Layout>
      </QueryClientProvider>
    </>
  );
}
