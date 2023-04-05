import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Rated from "./pages/Rated";
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
          const storedSession = JSON.parse(localStorage.getItem('guestSession'));
          if(storedSession == null) {
            const createGuestSession = await (await fetch('https://api.themoviedb.org/3/authentication/guest_session/new?api_key=08a7337c36b62d4a8a9dfafd26b3afb6')).json();
            localStorage.setItem('guestSession', JSON.stringify(createGuestSession))
          }
          const guestSession = await (await fetch(`https://api.themoviedb.org/3/guest_session/${storedSession["guest_session_id"]}/rated/movies?api_key=08a7337c36b62d4a8a9dfafd26b3afb6`)).json();
          const sessionRatedMovies = guestSession.results;
          const trendings = await (await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=08a7337c36b62d4a8a9dfafd26b3afb6')).json();
          const discovers = await (await fetch('https://api.themoviedb.org/3/discover/movie?api_key=08a7337c36b62d4a8a9dfafd26b3afb6')).json();
          return {trendings, discovers, sessionRatedMovies};
        }
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'rated',
        element: <Rated />
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
