import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Layout from './components/Layout.jsx';
import Home from './components/Home/Home.jsx';
import Details from './components/Details/Details.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


let router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'meal/:id', element: <Details /> },
    ],
  },
]);

const queryClient = new QueryClient()

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      


    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    </>
  );
}

export default App;
