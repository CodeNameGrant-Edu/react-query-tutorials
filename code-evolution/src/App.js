import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import DynamicParallelQueries from './components/DynamicParallelQueries';
import Home from './components/Home';
import ParallelQueries from './components/ParallelQueries';
import RQSuperheroes from './components/RQSuperheroes';
import Superheros from './components/Superheros';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/super-heroes">Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to="/rq-super-heroes">RQ Super Heroes</Link>
            </li>
            <li>
              <Link to="/rq-parallel">Parallel Queries</Link>
            </li>
            <li>
              <Link to="/rq-dyn-parallel">Dynamic Parallel Queries</Link>
            </li>
          </ul>
        </nav>

        <main>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/super-heroes" element={<Superheros />} />
            <Route path="/rq-super-heroes/*" element={<RQSuperheroes />} />
            <Route path="/rq-parallel" element={<ParallelQueries />} />
            <Route
              path="/rq-dyn-parallel"
              element={<DynamicParallelQueries heroIds={[1, 2, 3]} />}
            />
          </Routes>
        </main>
      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
