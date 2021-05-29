import "./App.css";
import axios from "axios";

import { Redirect, BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Home from "./components/home.js";
import Bookmark from "./components/bookmarks.js";
import Explore from "./components/explore.js";
import { React, useState, useEffect } from "react";
import Profile from "./components/profile.js";

import Login from "./components/auth/login.js";
import EditUser from "./components/auth/edit.js";
import store from "./store";
import { Provider } from "react-redux";

// eslint-disable-next-line

function App(props) {

  const [user, setUser] = useState({});
  const [submit, setSubmit] = useState("");
  const [link ,setLink] = useState("")
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
};

  const getUser = () => {
 


    const headers = { headers: { Authorization: `Bearer ${token}` } };
    axios
      .get("http://localhost:4000/api/user/", headers)
      .then(({ data }) => {
        // console.log("USERBEFORE", this.user);

        console.log("use r susers ", data);
        setUser(data);
         
        setLink(`profile/${user._id}`)
        console.log(data._id)


      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {

    getUser();
  }, [token]);
  // const pushUserClick = () => {

  // };

  // const PrivateRoutes = ({ component: Component, ...rest }) => (
    
  //   <Route
  //     {...rest}
  //     render={(props) =>

  //      token!==null ?<Component {...props} />:  <Redirect to="/" /> 
  //     }
  //   />
  // );
  return (
    <div className="App">
         {token!==null ? 
       ( <nav className="wrapper">
      
            <div className="dropdown">
              <button className="dropbtn">
                <img className="photo" src={user.photo} />
                {user.name}
              </button>
             <div className="dropdown-content">
              <div className="icon">
                <span className="material-icons"> account_circle </span>
                <a className="routes" href={link}>
                <link to={{
      pathname: `/profile/${user._id}`,
      state: { id: user._id, user: user }, // your data array of objects
  }}/>
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
        </nav>)
        :(  <div className="dropdown">
        
    </div>



)
    
}

      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/edit" component={EditUser} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/profile/:id" component={Profile} />
            <Route exact path="/bookMarks" component={Bookmark} />
            <Route exact path="/explore" component={Explore} />
            <Route exact path="/" component={Login} />
          </Switch>
        </BrowserRouter>
      </Provider> 
    </div>
  );
}

export default App;
