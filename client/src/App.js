import "./App.css";

import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Home from "./components/home.js";
import Bookmark from "./components/bookmarks.js";
import Explore from "./components/explore.js";
import { Redirect } from "react-router-dom";
import Profile from "./components/profile.js";

import Login from "./components/auth/login.js";
import EditUser from "./components/auth/edit.js";
import store from "./store";
import { Provider } from "react-redux";

// eslint-disable-next-line
function App(props) {
  const logout = () => {
    localStorage.removeItem("token");
  };
  return (
    <div className="App">
      <nav className="wrapper">
        <div className="dropdown">
          <button className="dropbtn">
            <img
              className="photo"
              src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
            />
            jdidi daoud
          </button>
          <div className="dropdown-content">
            <div className="icon">
              <span className="material-icons"> account_circle </span>
              <a className="routes" href="#">
                profile
              </a>
            </div>
            <div className="icon">
              <span className="material-icons"> groups </span>

              <a className="routes" href="/profile">
                profile
              </a>
            </div>
            <div className="icon">
              <span className="material-icons"> groups </span>

              <a className="routes" href="/edit">
                settings
              </a>
            </div>
            <div className="icon">
              <span className="material-icons"> logout </span>
              <a className="routes" href="/" onClick={logout}>
                log out
              </a>
            </div>
          </div>
        </div>

        <img
          className="log_twit"
          src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
        />
        <div className="shadow">
          <ul>
            <li className="li_nav">
              <a className="nav_routes" href="/home">
                home
              </a>
            </li>
            <li className="li_nav">
              <a href="/explore" className="nav_routes">
                explore
              </a>
            </li>
            <li className="li_nav">
              <a href="/bookMarks" className="nav_routes">
                bookmarks
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/profile/:id" component={Profile} />
            <Route exact path="/bookMarks" component={Bookmark} />
            <Route exact path="/explore" component={Explore} />
            <Route exact path="/edit" component={EditUser} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
