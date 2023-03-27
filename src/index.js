import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Watchlist from "./pages/Watchlist";
import Lists from "./pages/Lists";
import Favorites from "./pages/Favorites";
import Collections from "./pages/Collections";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home/>,
        loader: async () => {
          const trendings = await (await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=08a7337c36b62d4a8a9dfafd26b3afb6')).json();
          const discovers = await (await fetch('https://api.themoviedb.org/3/discover/movie?api_key=08a7337c36b62d4a8a9dfafd26b3afb6')).json();
          return {trendings, discovers};
        }
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'watchlist',
        element: <Watchlist />
      },
      {
        path: 'lists',
        element: <Lists />
      },
      {
        path: 'favorites',
        element: <Favorites />
      },
      {
        path: 'collections',
        element: <Collections />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
