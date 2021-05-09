import { lazy, Suspense } from 'react';
import './App.css';
import Hero from './Hero';
const Form = lazy(() => import('./Form'));
function App() {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <div className="App">
        <Hero />
        <Form />
      </div>
    </Suspense>
  );
}

export default App;
