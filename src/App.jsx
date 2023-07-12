import { QueryClient, QueryClientProvider } from 'react-query';
import Router from 'shared/Router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false
    }
  }
});

function App() {
  console.log('✏️리렌더링: APP.jsx');

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
