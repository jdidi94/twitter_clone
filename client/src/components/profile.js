import { React, useState, useEffect } from "react";
import "./profile.css";
import axios from "axios";
import ReactDOM from "react-dom";
import moment from "moment";

function Profile(props) {
  const { state } = props.location;
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [followers, setfollowers] = useState([]);
  const [following, setfollowing] = useState([]);
  const [submit, setload] = useState(false);
  const [comment, createComment] = useState("");
  const [text, setText] = useState("user");
  const [photoComment, setphotoComment] = useState("");
  const [color, setColor] = useState(false);
  const [replies, setReplies] = useState([]);
  const [sortReplies, setSortReplies] = useState("false");
  const [followerChecker, setFollowerChecker] = useState([]);
  const [media, setMedia] = useState([]);
  const [sortMedia, setSortMedia] = useState(false);
  const [likes, setLikes] = useState([]);
  const [sortLikes, setSortLikes] = useState(false);
  const [currentUser, setCurrentUser] = useState({});



  // tweets replies
  const handletweetclick = () => {
    setload(!submit);
  };
  const commentState=(()=>{
    posts.map((element) => {
      console.log("element",element)
     element.comments.map((comment) =>{
      console.log( "element.comments", element.comments)
     if(comment.Commentslikes.includes(user._id)){
    const attribute = document.getElementById(comment._id + "comment");
    ReactDOM.findDOMNode(attribute).style.color = "pink";
    document.getElementById(comment._id + "span_comment").innerHTML = "liked";
      }else{
        const attribute = document.getElementById(comment._id + "comment");
        ReactDOM.findDOMNode(attribute).style.color = "black";
        document.getElementById(comment._id + "span_comment").innerHTML = "like";
      }
    })
      
    })
   })
  const followes=(followerss)=>{
    console.log("followesr",followerss)
    followerss.map((follow)=>{
      if(follow._id===state.user._id){
        const attribute = document.getElementById(state.user._id + "followers");
        ReactDOM.findDOMNode(attribute).style.display = "none";
      }
    })

  }
  const followings=(followings)=>{

    followings.map((follow)=>{
      if(follow._id===state.user._id){
        const attribute = document.getElementById(state.user._id + "following");
        ReactDOM.findDOMNode(attribute).style.display = "none";
      }
    })

  }

  //replies sort
  const handlerepliesClick = () => {
    const post = [];
    posts.map((element) => {
      element.comments.map((comment) => {
        if (comment.comment !== "") {
          post.push(element);
        }
      });
    });

    setReplies(post);
    setSortReplies(!sortReplies);
    console.log(replies);
  };
  useEffect(() => {
    setPosts(replies);
  }, [sortReplies]);

  //media sort
  const handleMediaClick = () => {
    const post = [];
    posts.map((element) => {
      element.comments.map((comment) => {
        if (comment.userPhoto !== "") {
          post.push(element);
        }
      });
    });
    setMedia(post);
    setSortMedia(!sortMedia);
  };
  useEffect(() => {
    setPosts(media);
  }, [sortMedia]);

  //likes sort
  useEffect(() => {
    setPosts(likes);
  }, [sortLikes]);
  const handleLikeClick = () => {
    setLikes(
      posts.sort((a, b) =>
        a.likesNumber < b.likesNumber
          ? 11
          : a.likesNumber === b.likesNumber
          ? a.post > b.post
            ? 1
            : -1
          : -1
      )
    );
    setSortLikes(!sortLikes);
  };

  const saveState = () => {
    posts.map((element) => {
      if (element.saved.includes(state.user._id)) {
        const attribute = document.getElementById(element._id + "save");
        ReactDOM.findDOMNode(attribute).style.color = "blue";
        document.getElementById(element._id + "save_span").innerHTML = "saved";
      } else {
        const attribute = document.getElementById(element._id + "save");
        ReactDOM.findDOMNode(attribute).style.color = "black";
        document.getElementById(element._id + "save_span").innerHTML = "save";
      }
    });
  };
  const followersState=(followers)=>{
  followers.map((element)=>{
    if(element.followers.includes(state.user._id)){
      document.getElementById(element._id + "followers").innerHTML = "UnFollow";
  
    }else{
     document.getElementById(element._id + "span_followers").innerHTML = "follow";
    }
  })
  }
  const followingState=(followers)=>{
    followers.map((element)=>{
      if(element.followers.includes(state.user._id)){
        document.getElementById(element._id + "following").innerHTML = "UnFollow";
      }else{
        document.getElementById(element._id + "span_following").innerHTML = "Follow";
      }
    })
    }

  const likesState = () => {
    posts.map((element) => {
      if (element.likes.includes(state.user._id)) {
        const attribute = document.getElementById(element._id + "like");
        ReactDOM.findDOMNode(attribute).style.color = "pink";
        document.getElementById(element._id + "like_span").innerHTML = "liked";
      } else {
        const attribute = document.getElementById(element._id + "like");
        ReactDOM.findDOMNode(attribute).style.color = "black";
        document.getElementById(element._id + "like_span").innerHTML = "like";
      }
    });
  };
  const retweetsState = () => {
    posts.map((element) => {
      if (element.retweets.includes(state.user._id)) {
        const attribute = document.getElementById(element._id + "retweet");
        ReactDOM.findDOMNode(attribute).style.color = "green";
        document.getElementById(element._id + "retweet_span").innerHTML = "retweeted";

      } else {
        const attribute = document.getElementById(element._id + "retweet");
        ReactDOM.findDOMNode(attribute).style.color = "black";
        document.getElementById(element._id + "retweet_span").innerHTML = "retweet";

      }
    });
  };

  useEffect(() => {
    saveState();
    likesState();
    retweetsState();
    commentState()
  }, [color]);

  const currentDateTime = (date) => {
    const dateNow = moment();

    if (dateNow.diff(date, "seconds") <= 60) {
      return moment(date).startOf("seconds").fromNow();
    }
    if (dateNow.diff(date, "minutes") > 1) {
      return moment(date).startOf("minutes").fromNow();
    }
    if (dateNow.diff(date, "hours") >= 1) {
      return moment().endOf("day", "hours", "minutes").fromNow();
    }
    if (dateNow.diff(date, "days") >= 1) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    }
  };
  const getUser = () => {
    console.log("this user state", state);
    axios
      .get(`http://localhost:4000/api/user/getUser/${state.id}`)
      .then(({ data }) => {
        setUser(data.populate);
 
        setfollowers(data.populate.followers);
        setfollowing(data.populate.following);
        setFollowerChecker(data.user.followers);
        followes(data.populate.followers)
        followersState(data.populate.followers)
        followings(data.populate.following)
        followingState(data.populate.following)
        if (state.id !== state.user._id) {
          console.log("followerCheckerdata", data.user.followers);
          if (!data.user.followers.includes(state.user._id)) {
            setText("follow");
          } else {
            setText("unfollow");
          }
        } else {
          setText("user");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCurrentUsers = () => {
    const token = localStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    axios
      .get("http://localhost:4000/api/user/", headers)
      .then(({ data }) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getPosts = () => {
    axios
      .get(`http://localhost:4000/api/post/user/${state.id}`)
      .then(({ data }) => {
        setPosts(data);
        setColor(!color);
      })

      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUser();
    getPosts();
    getCurrentUsers();
  }, [submit]);

  const uploadImageComment = (event) => {
    event.preventDefault();
    const image = new FormData();
    image.append("file", event.target.files[0]);
    image.append("upload_preset", "tyfhc3lt");

    axios
      .post("https://api.cloudinary.com/v1_1/dkcwqbl9d/image/upload", image)
      .then(({ data }) => {
        setphotoComment(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCommentChange = (e) => {
    e.preventDefault();
    createComment(e.target.value);
  };
  const handleLikesClick = (id, like, e) => {
    e.preventDefault();

    setload(!submit);
    if (!like.includes(state.user._id)) {


      const data = {
        message: true,
        likes: state.user._id,
      };
      const data2 = {
        message: true,
        likes: id,
      };
      axios
        .patch(`http://localhost:4000/api/post/likes/${id}`, data)
        .then(({ data }) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .then(() => {
          axios
            .patch(
              `http://localhost:4000/api/user/likes/${state.user._id}`,
              data2
            )
            .then(({ data }) => {
              console.log(data);
              setload(!submit);
            })
            .catch((err) => {
              console.log(err);
            });
        });
    } else if (like.includes(state.user._id)) {


      const data = {
        message: false,
        likes: state.user._id,
      };
      const data2 = {
        message: false,
        likes: id,
      };

      axios
        .patch(`http://localhost:4000/api/post/likes/${id}`, data)
        .then(({ data }) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .then(() => {
          axios
            .patch(
              `http://localhost:4000/api/user/likes/${state.user._id}`,
              data2
            )
            .then(({ data }) => {
              console.log(data);
              setload(!submit);
            })
            .catch((err) => {
              console.log(err);
            });
        });
    }
  };

  const handleTweetsClick = (id, e, postuser, photouser) => {
    e.preventDefault();
    const data1 = {
      user: state.user._id,
      post: postuser,
      photo: photouser,
      public: false,
    };


    const data = {
      retweets: state.user._id,
    };
    axios
      .patch(`http://localhost:4000/api/post/retweet/${id}`, data)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        axios
          .post(`http://localhost:4000/api/post/`, data1)
          .then(({ data }) => {
            setload(!submit);
            console.log("posted done", data);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  };

  
  const handleTClickSaved = (id, save, e) => {
    e.preventDefault();



    setload(!submit);
    if (!save.includes(state.user._id)) {
      const data = {
        message: true,
        saved: state.user._id,
      };
      const data2 = {
        message: true,
        saved: id,
      };
      axios
        .patch(`http://localhost:4000/api/post/saved/${id}`, data)
        .then(({ data }) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .then(() => {
          axios
            .patch(
              `http://localhost:4000/api/user/saved/${state.user._id}`,
              data2
            )
            .then(({ data }) => {
              console.log(data);
              setload(!submit);
            })
            .catch((err) => {
              console.log(err);
            });
        });
    } else if (save.includes(state.user._id)) {


      const data = {
        message: false,
        saved: state.user._id,
      };
      const data2 = {
        message: false,
        saved: id,
      };
      axios
        .patch(`http://localhost:4000/api/post/saved/${id}`, data)
        .then(({ data }) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .then(() => {
          axios
            .patch(
              `http://localhost:4000/api/user/saved/${state.user._id}`,
              data2
            )
            .then(({ data }) => {
              console.log(data);
              setload(!submit);
            })
            .catch((err) => {
              console.log(err);
            });
        });
    }
  };
  const handleTClickFollowing = (e) => {
    e.preventDefault();

    if (!followerChecker.includes(state.user._id)) {
      const data1 = {
        message: true,
        followers: state.user._id,
      };
      const data = {
        message: true,
        following: state.id,
      };
      axios
        .patch(
          `http://localhost:4000/api/user/following/${state.user._id}`,
          data
        )
        .then(({ data }) => {
          console.log(data);
        })

        .then(() => {
          axios
            .patch(
              `http://localhost:4000/api/user/followers/${state.id}`,
              data1
            )
            .then(({ data }) => {
              console.log(data);
              setload(!submit);
              setText("unfollow");
            });
        });
    } else {
      console.log("hiii");
      const data1 = {
        message: false,
        followers: state.user._id,
      };
      const data = {
        message: false,
        following: state.id,
      };
      axios
        .patch(
          `http://localhost:4000/api/user/following/${state.user._id}`,
          data
        )
        .then(({ data }) => {
          console.log(data);
        })

        .then(() => {
          axios
            .patch(
              `http://localhost:4000/api/user/followers/${state.id}`,
              data1
            )
            .then(({ data }) => {
              console.log(data);
              setText("follow");
              setload(!submit);
            });
        });
    }
  };
  const handleClickComment = (e, id) => {
    e.preventDefault();

    const comments = [];
    const data = {
      userPhoto: user.photo,
      userName: user.name,
      post: id,
      user: state.user._id,
      comment: comment,
      photoComment: photoComment,
    };
    axios
      .post("http://localhost:4000/api/comment/", data)
      .then(({ data }) => {
        comments.push(data._id);
      })
      .then(() => {
        axios
          .patch(`http://localhost:4000/api/post/${id}`, { comments: comments })
          .then((data) => {
            console.log(data);
            setload(!submit);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCommentLikesClick = (e, id, element) => {
    e.preventDefault();

    if (!element.includes(user._id)) {
      const data = {
        likes: state.user._id,
        message: true,
      };

      axios
        .patch(`http://localhost:4000/api/comment/${id}`, data)
        .then(({ data }) => {
          console.log(data);
          setload(!submit);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const data = {
        likes: state.user._id,
        message: false,
      };
      axios
        .patch(`http://localhost:4000/api/comment/${id}`, data)
        .then(({ data }) => {
          console.log("posted done", data);
          setload(!submit);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleTClickUpdateFollowing = (e, element) => {
    e.preventDefault();

    if (!element.followers.includes(state.user._id)) {
      document.getElementById(element._id + "followers").innerHTML = "UnFollow";

      const data1 = {
        message: true,
        followers: state.user._id,
      };
      const data = {
        message: true,
        following: element._id,
      };
      axios
        .patch(
          `http://localhost:4000/api/user/following/${state.user._id}`,
          data
        )
        .then(({ data }) => {
          console.log(data);
        })

        .then(() => {
          axios
            .patch(
              `http://localhost:4000/api/user/followers/${element._id}`,
              data1
            )
            .then(({ data }) => {
              console.log(data);
              setload(!submit);
            });
        });
    } else {
      document.getElementById(element._id + "followers").innerHTML = "Follow";

      console.log("hiii");
      const data1 = {
        message: false,
        followers: state.user._id,
      };
      const data = {
        message: false,
        following: element._id,
      };
      axios
        .patch(
          `http://localhost:4000/api/user/following/${state.user._id}`,
          data
        )
        .then(({ data }) => {
          console.log(data);
        })

        .then(() => {
          axios
            .patch(
              `http://localhost:4000/api/user/followers/${element._id}`,
              data1
            )
            .then(({ data }) => {
              console.log(data);
              setload(!submit);
            });
        });
    }
  };
  const handleTClickUpdateFollowers= (e, element) => {
    e.preventDefault();

    if (!element.followers.includes(state.user._id)) {
      document.getElementById(element._id + "following").innerHTML = "UnFollow";

      const data1 = {
        message: true,
        followers: state.user._id,
      };
      const data = {
        message: true,
        following: element._id,
      };
      axios
        .patch(
          `http://localhost:4000/api/user/following/${state.user._id}`,
          data
        )
        .then(({ data }) => {
          console.log(data);
        })

        .then(() => {
          axios
            .patch(
              `http://localhost:4000/api/user/followers/${element._id}`,
              data1
            )
            .then(({ data }) => {
              console.log(data);
              setload(!submit);
            });
        });
    } else {
      document.getElementById(element._id + "following").innerHTML = "Follow";

      console.log("hiii");
      const data1 = {
        message: false,
        followers: state.user._id,
      };
      const data = {
        message: false,
        following: element._id,
      };
      axios
        .patch(
          `http://localhost:4000/api/user/following/${state.user._id}`,
          data
        )
        .then(({ data }) => {
          console.log(data);
        })

        .then(() => {
          axios
            .patch(
              `http://localhost:4000/api/user/followers/${element._id}`,
              data1
            )
            .then(({ data }) => {
              console.log(data);
              setload(!submit);
            });
        });
    }
  };


  return (
    <div className="profile_container">
      <div className="all_info">
        {user.cover ? (
          <div style={{ background: "red" }} className="photosize">
            <img className="profle_tof" src={user.cover} />
          </div>
        ) : (
          <div style={{ background: "red" }} className="photosize">
            <img
              className="profle_tof"
              src="https://i.pinimg.com/originals/50/f5/7c/50f57c9b434ca4ee7b12cc7728687fae.jpg"
            />
          </div>
        )}
        {/* group info */}
        <div className="info_group" style={{ background: "white" }}>
          <div className="image_div">
            <img className="photo_user" src={user.photo} />
          </div>

          <div>
            <div className="user_info">
              <h5 className="name_info">{user.name}</h5>
              <button
                type="button"
                ClassName="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModalCenter"
                id="followers"
              >
                {followers.length} followers
              </button>
              <div
                className="modal fade"
                id="exampleModalCenter"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLongTitle">
                        {user.name} followers
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      {followers.map((element) => (
                        <div key={element._id} className="follow_container">
                          <div className="follow_info">
                            <img className="follow_img" src={element.photo} />
                            <div>
                              <h5 className="follow_name">{element.name}</h5>
                              <p className="follow_numbers">
                                {element.followers.length} followers
                              </p>
                            </div>
                            <button
                              className="follow_button"
                              onClick={(e) => {
                                handleTClickUpdateFollowing(e, element);
                              }}
                              id={element._id + "followers"}
                            >
                              <i className="fas fa-user-plus"></i>
                              <span id={element._id+"span_followers"}>Folllow</span>
                            </button>
                          </div>
                          <p className="follow_paragraph"> {element.bio}</p>

                          <hr />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModal"
                id="followers"
              >
                {following.length} following
              </button>
              <div
                className="modal fade"
                id="exampleModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLongTitle">
                        {user.name} is following
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      {following.map((element) => (
                        <div key={element._id} className="follow_container">
                          <div className="follow_info">
                            <img className="follow_img" src={element.photo} />
                            <div>
                              <h5 className="follow_name">{element.name}</h5>
                              <p className="follow_numbers">
                                {element.followers.length} followers
                              </p>
                            </div>
                            <button
                              className="follow_button"
                              onClick={(e) => {
                                handleTClickUpdateFollowers(e, element);
                              }}
                              id={element._id + "following"}
                            >
                               <i className="fas fa-user-plus"></i>
                              <span id={element._id+"span_following"}>Folllow</span>
                         
                            </button>
                          </div> 
                          <p className="follow_paragraph"> {element.bio}</p>

                          <hr />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {text === "follow" ? (
                <button
                  className="follow_button"
                  onClick={handleTClickFollowing}
                >
                  <i className="fas fa-user-plus"></i>Follow
                </button>
              ) : text === "unfollow" ? (
                <button
                  className="follow_button"
                  onClick={handleTClickFollowing}
                >
                  Unfollow
                </button>
              ) : text === "user" ? (
                <div className="empthy"></div>
              ) : (
                <div className="empthy"></div>
              )}
            </div>
            <div className="paragraph_div">
              <p className="post_paragraph"> {user.bio}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="Bookmark_container">
        {/* filter  */}
        <div style={{ background: "white" }} className="filter_container">
          <button className="filter_item" onClick={handletweetclick}>
            Tweets
          </button>
          <button className="filter_item" onClick={handlerepliesClick}>
            Tweets & replies
          </button>
          <button className="filter_item" onClick={handleMediaClick}>
            Media
          </button>
          <button className="filter_item" onClick={handleLikeClick}>
            Likes
          </button>
        </div>
        {/* posts */}
        <div className="post_profile_container">
          {posts.map((element) => (
            <div
              key={element._id}
              style={{ background: "white" }}
              className="one_post"
            >
              <div className="info">
                <img className="tof_post" src={element.user.photo} />
                <div>
                  <h5 className="user_name">{element.user.name}</h5>
                  <p className="post_date">{currentDateTime(element.date)}</p>
                </div>
              </div>
              <div className="post_content">
                <p className="post_paragraph">{element.post}</p>

                <img className="post_img" src={element.photo} />
              </div>
              <div className="numbers">
                <p className="post_date">{element.comments.length} comments</p>
                <p className="post_date">{element.retweets.length} retweets</p>
                <p className="post_date">{element.saved.length} saved</p>
              </div>

              <div className="btn_control">
                <button className="btn_button">
                  <i className="fab fa-rocketchat"></i> comment
                </button>
                <button
                  className="btn_button"
                  onClick={(e) => {
                    handleTweetsClick(
                      element._id,
                      e,
                      element.post,
                      element.photo
                    );
                  }}
                  id={element._id + "retweet"}
                >
                  <i className="fa fa-retweet"></i>
          <span  id={element._id+"retweet_span"}>Retweet</span>

                </button>
                <button
                  className="btn_button"
                  onClick={(e) => {
                    handleLikesClick(element._id, element.likes, e);
                  }}
                  id={element._id + "like"}
                >
                  <i className="far fa-heart"></i> 
                  <span id={element._id+"like_span"}>Like</span>
                </button>
                <button
                  className="btn_button"
                  onClick={(e) => {
                    handleTClickSaved(element._id, element.saved, e);
                  }}
                  id={element._id + "save"}
                >
                  <i className="far fa-bookmark"></i>
                  <span id={element._id+"save_span"}>Save</span>
                </button>
              </div>
              <div className="comment_div">
                <img className="tof_comment" src={state.user.photo} />
                <div className="tarea">
                  <textarea
                    className="text_comment"
                    placeholder="write a comment"
                    name={element._id}
                    onChange={handleCommentChange}
                  ></textarea>
                  <div className="image-upload">
                    <label htmlFor="files">
                      <i
                        className="far fa-image"
                        style={{ fontSize: "40px", color: "grey" }}
                      ></i>
                    </label>

                    <input
                      id="files"
                      type="file"
                      onChange={(event) => uploadImageComment(event)}
                    />
                  </div>
                </div>
                <button
                  className="btn_button"
                  onClick={(e) => {
                    handleClickComment(e, element._id);
                  }}
                >
                  Save
                </button>
              </div>

              <hr />
              <div className="all_comments">
                {element.comments.map((comment) => (
                  <div key={comment._id} className="one_comments">
                    <div className="div_flex">
                      <img className="photo_comment" src={comment.userPhoto} />

                      <div className="comment_details">
                        <div className="div_name_date">
                          <h6 className="comment_name">{comment.userName}</h6>
                          <p className="comment_date">
                            {currentDateTime(comment.createdAt)}
                          </p>
                        </div>
                        <p className="comment_paragraph">{comment.comment}</p>
                        {comment.photoComment ? (
                          <div className="photo_comment_div">
                            <img
                              className="photo_shown"
                              src={comment.photoComment}
                            />
                          </div>
                        ) : (
                          <div className="photo_comment_div"></div>
                        )}
                      </div>
                    </div>

                    <div className="comment_buttons">
                      <button
                             id={ comment._id+"comment"}
                        className="btn_like"
                        onClick={(e) => {
                          handleCommentLikesClick(
                            e,
                            comment._id,
                            comment.Commentslikes
                          );
                        }}
                      >
                        <i className="far fa-heart"></i>
                        <span id={comment._id+"span_comment"}>Like</span>
                      </button>
                      <p className="post_date">
                        {comment.Commentslikes.length} retweets
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
