import React, { Suspense } from 'react';

// import Component
import { Loader } from './Components/Loader';
import AllRoutes from './Routes/index'

//import stylesheet 
import './Assets/styles/main.scss'

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <AllRoutes />
      </Suspense>
    </div>
  );
}

export default App;
