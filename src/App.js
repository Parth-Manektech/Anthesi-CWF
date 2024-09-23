import React, { Suspense } from 'react';

// import Component
import { Loader } from './Components/Loader';
import AllRoutes from './Routes/index'

//import stylesheet 
import './Assets/styles/main.scss'
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const queryClient = new QueryClient()
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loader />}>
          <AllRoutes />
        </Suspense>
      </QueryClientProvider>
    </div>
  );
}

export default App;
