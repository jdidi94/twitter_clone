import { React, useState, useEffect } from "react";
import "./home.css";
import axios from "axios";
import ReactDOM from "react-dom";
import moment from "moment";
import swal from "sweetalert";

function Home(props) {
  const [allUsers, setUsers] = useState([]);
  const [post, createPost] = useState("");
  const [photo, createPhoto] = useState("");
  const [kane, setPublic] = useState(false);
  const [user, setUser] = useState({});
  const [getPosts, setPosts] = useState([]);
  const [comment, createComment] = useState("");
  const [submit, setSubmit] = useState("");
  const [photoComment, setphotoComment] = useState("");
  const [color, setColor] = useState(false);
  const [followersUser, setfollowers] = useState([]);
  const [userTrends, setTrends] = useState([]);
  const saveState = () => {
    getPosts.map((element) => {
     
      if (element.saved.includes(user._id)) {
        const attribute = document.getElementById(element._id + "save");
        ReactDOM.findDOMNode(attribute).style.color = "blue";
      } else {
        const attribute = document.getElementById(element._id + "save");
        ReactDOM.findDOMNode(attribute).style.color = "black";
      }
    });
  };
  const likesState = () => {
    getPosts.map((element) => {
      if (element.likes.includes(user._id)) {
        const attribute = document.getElementById(element._id + "like");
        ReactDOM.findDOMNode(attribute).style.color = "pink";
      } else {
        const attribute = document.getElementById(element._id + "like");
        ReactDOM.findDOMNode(attribute).style.color = "black";
      }
    });
  };
  const retweetsState = () => {

    getPosts.map((element) => {
 
      if (element.retweets.includes(user._id)) {
        const attribute = document.getElementById(element._id + "retweet");
        ReactDOM.findDOMNode(attribute).style.color = "green";
      } else {
        const attribute = document.getElementById(element._id + "retweet");
        ReactDOM.findDOMNode(attribute).style.color = "black";
      }
    });
  };
  useEffect(() => {
    saveState();
    likesState();
    retweetsState();
  }, [color]);
  const currentDateTime = (date) => {
    const dateNow = moment();

    if (dateNow.diff(date, "seconds") <= 60) {
      return moment(date).startOf("seconds").fromNow();
    } else if (dateNow.diff(date, "minutes") > 1) {
      return moment(date).startOf("minutes").fromNow();
    } else if (dateNow.diff(date, "hours") >= 1) {
      return moment().endOf("day", "hours", "minutes").fromNow();
    } else if (dateNow.diff(date, "days") >= 1) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    }
  };
  const filterFollowers = (data1, data2) => {
    const arr = [];

    data1.map((element) => {
      if (!data2.includes(element._id)) {
        arr.push(element);
      }
    });
    return arr;
  };

  const getUser = () => {
    const token = localStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    axios
      .get("http://localhost:4000/api/user/", headers)
      .then(({ data }) => {

     
        setUser(data);

        setfollowers(filterFollowers(data.followers, data.following));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterTrends = (data) => {
    const arr = [];

    data.map((element) => {
      if (element._id !== user._id && !element.followers.includes(user._id)) {
        arr.push(element);
      }
    });
    return arr.slice(0, 4);
  };
  const getAllPosts = () => {
    axios
      .get(`http://localhost:4000/api/post/user/follower/${user._id}`)
      .then((data) => {
 
        setPosts(data.data);
      });
  };

  const getallUsers = () => {
    axios
      .get("http://localhost:4000/api/user/users")
      .then(({ data }) => {

        setUsers(filterTrends(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllPosts();
    getallUsers();
  }, [user._id, submit]);
  useEffect(() => {
    getUser();
  }, [submit]);
  const uploadImage = (event) => {
    event.preventDefault();
    const image = new FormData();
    image.append("file", event.target.files[0]);
    image.append("upload_preset", "tyfhc3lt");

    axios
      .post("https://api.cloudinary.com/v1_1/dkcwqbl9d/image/upload", image)
      .then(({ data }) => {
        createPhoto(data.url);

      })
      .catch((err) => {
        console.log(err);
      });
  };

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
  const handlePostChange = (e) => {
    e.preventDefault();
    createPost(e.target.value);
  };
  const handleClickComment = (e, id) => {
    e.preventDefault();


    const comments = [];
    const data = {
      userPhoto: user.photo,
      userName: user.name,
      post: id,
      user: user._id,
      comment: comment,
      photoComment: photoComment,
    };
    axios
      .post("http://localhost:4000/api/comment/", data)
      .then(({ data }) => {
        

        comments.push(data._id);
        setSubmit(!submit);
      })
      .then(() => {


        axios
          .patch(`http://localhost:4000/api/post/${id}`, { comments: comments })
          .then((data) => {
            console.log(data);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   const handleKeypress =(e,id)  => {
  //     //it triggers by pressing the enter key
  //   if (e.keyCode === 13) {
  //     handleClickComment(id);
  //   }
  // };
  const handleClickPost = () => {
    const data = {
      user: user._id,
      post: post,
      photo: photo,
      public: kane,
    };

    axios
      .post("http://localhost:4000/api/post/", data)
      .then((res) => {
     
        setSubmit(!submit);
        swal("Done!", " your tweets is setted ,go and check in explore !");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLikesClick = (id, like, e) => {
    e.preventDefault();

    setSubmit(!submit);
    if (!like.includes(user._id)) {
      const element = document.getElementById(id + "like");
      ReactDOM.findDOMNode(element).style.color = "red";

      const data = {
        message: true,
        likes: user._id,
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
            .patch(`http://localhost:4000/api/user/likes/${user._id}`, data2)
            .then(({ data }) => {
              console.log(data);
            })
            .catch((err) => {
              console.log(err);
            });
        });
    } else if (like.includes(user._id)) {
      const element = document.getElementById(id + "like");
      ReactDOM.findDOMNode(element).style.color = "black";
      const data2 = {
        message: false,
        likes: id,
      };
      const data = {
        message: false,
        likes: user._id,
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
            .patch(`http://localhost:4000/api/user/likes/${user._id}`, data2)
            .then(({ data }) => {
              console.log(data);
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
      user: user._id,
      post: postuser,
      photo: photouser,
      public: false,
    };

    const data = {
      retweets: user._id,
    };
    axios
      .patch(`http://localhost:4000/api/post/retweet/${id}`, data)
      .then(({ data }) => {
        console.log(data);
        const element = document.getElementById(id + "retweet");
        ReactDOM.findDOMNode(element).style.color = "green";
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        axios
          .post(`http://localhost:4000/api/post/`, data1)
          .then(({ data }) => {
            console.log("posted done", data);
            setSubmit(!submit);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  };

  const handleTClickSaved = (id, save, e) => {
    e.preventDefault();

    let element = document.getElementById(id + "save");
    ReactDOM.findDOMNode(element).style.color = "blue";

    if (!save.includes(user._id)) {
      const data = {
        message: true,
        saved: user._id,
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
            .patch(`http://localhost:4000/api/user/saved/${user._id}`, data2)
            .then(({ data }) => {
              console.log(data);
              setSubmit(!submit);
            })
            .catch((err) => {
              console.log(err);
            });
        });
    } else if (save.includes(user._id)) {
      let element = document.getElementById(id + "save");
      ReactDOM.findDOMNode(element).style.color = "black";
      const data = {
        message: false,
        saved: user._id,
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
            .patch(`http://localhost:4000/api/user/saved/${user._id}`, data)
            .then(({ data }) => {
              console.log(data);
              setSubmit(!submit);
            })
            .catch((err) => {
              console.log(err);
            });
        });
    }
  };

  const pushUserClick = (id) => {
    props.history.push({
      pathname: `/profile/${id}`,
      state: { id: id, user: user }, // your data array of objects
    });
  };
  const handleTClickFollowing = (e, id) => {
    e.preventDefault();

    // let element = document.getElementById(id + "save");
    // ReactDOM.findDOMNode(element).style.color = "blue";

    if (!user.following.includes(id)) {
      const data = {
        message: true,
        following: id,
      };
      axios
        .patch(`http://localhost:4000/api/user/following/${user._id}`, data)
        .then(({ data }) => {
          console.log(data);
          setSubmit(!submit);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (user.following.includes(id)) {
      // let element = document.getElementById(id + "save");
      // ReactDOM.findDOMNode(element).style.color = "black";

      const data = {
        message: false,
        following: id,
      };
      axios
        .patch(`http://localhost:4000/api/user/following/${user._id}`, data)
        .then(({ data }) => {
          setSubmit(!submit);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleCommentLikesClick = (e, id, element) => {
    e.preventDefault();

    if (!element.includes(user._id)) {
      const data = {
        likes: user._id,
        message: true,
      };

      axios
        .patch(`http://localhost:4000/api/comment/${id}`, data)
        .then(({ data }) => {
          console.log(data);
          setSubmit(!submit);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const data = {
        likes: user._id,
        message: false,
      };
      axios
        .patch(`http://localhost:4000/api/comment/${id}`, data)
        .then(({ data }) => {
          console.log("posted done", data);
          setSubmit(!submit);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // home post mapping
  const onePost = getPosts.map((element) => (
    <div key={element._id} style={{ background: "white" }} className="one_post">
      <div className="info">
        <img className="tof_post" src={element.user.photo} />
        <div>
          <h5
            className="user_name"
            onClick={() => {
              pushUserClick(element.user._id);
            }}
          >
            {element.user.name}
          </h5>
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
            handleTweetsClick(element._id, e, element.post, element.photo);
          }}
          id={element._id + "retweet"}
        >
          <i className="fa fa-retweet"></i> Retweet
        </button>
        <button
          onClick={(e) => {
            handleLikesClick(element._id, element.likes, e);
          }}
          id={element._id + "like"}
          className="btn_button"
        >
          <i className="far fa-heart"></i> Like
        </button>
        <button
          className="btn_button"
          onClick={(e) => {
            handleTClickSaved(element._id, element.saved, e);
          }}
          id={element._id + "save"}
        >
          <i className="far fa-bookmark"></i> Save{" "}
        </button>
      </div>
      <div className="comment_div">
        <img className="tof_comment" src={user.photo} />
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
        {element.comments.map((comment, i) => (
          <div key={i} className="one_comments">
            <div className="div_flex">
              <img className="photo_comment" src={comment.userPhoto} />
              <div className="comment_details">
                <div className="div_name_date">
                  <h6
                    className="comment_name"
                    onClick={() => {
                      pushUserClick(comment.user);
                    }}
                  >
                    {comment.userName}
                  </h6>
                  <p className="comment_date">
                    {currentDateTime(comment.createdAt)}
                  </p>
                </div>
                <p className="comment_paragraph">{comment.comment}</p>
                {comment.photoComment ? (
                  <div className="photo_comment_div">
                    <img className="photo_shown" src={comment.photoComment} />
                  </div>
                ) : (
                  <div className="photo_comment_div"></div>
                )}
              </div>
            </div>

            <div className="comment_buttons">
              <button
                className="btn_like"
                onClick={(e) => {
                  handleCommentLikesClick(
                    e,
                    comment._id,
                    comment.Commentslikes
                  );
                }}
              >
                <i className="far fa-heart"></i> Like
              </button>

              <p className="post_date">{comment.Commentslikes.length} likes</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ));
  return (
    <div className="home_contain">
      {/* who follows */}
      <div style={{ background: "white" }} className="who_follow">
        <h5 className="tweet_title">who follows you</h5>
        <hr />
        {followersUser.map((element) => (
          <div key={element._id} className="follow_container">
            <div className="follow_info">
              <img className="follow_img" src={element.photo} />
              <div>
                <h5
                  className="follow_name"
                  onClick={() => {
                    pushUserClick(element._id);
                  }}
                >
                  {element.name}
                </h5>
                <p className="follow_numbers">
                  {element.followers.length}followers
                </p>
              </div>
              <button
                className="follow_button"
                onClick={(e) => {
                  handleTClickFollowing(e, element._id);
                }}
              >
                <i className="fas fa-user-plus"></i> Follow
              </button>
            </div>
            <p className="follow_paragraph"> {element.bio}</p>
            <img className="big_img" src={element.cover} />
            <hr />
          </div>
        ))}
      </div>
      {/* trends */}
      <div style={{ background: "white" }} className="trends">
        <h5 className="tweet_title">Trends for you</h5>
        <hr />
        {allUsers.map((element, i) => (
          <div
            key={i}
            className="trends_div"
            onClick={() => {
              pushUserClick(element._id);
            }}
          >
            <h5 className="trends_title">#{element.name}</h5>
            <p className="post_date">{element.followers.length}followers</p>
          </div>
        ))}
      </div>
      {/* home posts */}
      <div className="home_posts">{onePost}</div>

      {/* new tweets */}
      <div style={{ background: "white" }} className="new_tweets">
        <h5 className="tweet_title"> Tweet something</h5>
        <hr />

        <div className="new_tweets_container">
          { user.photo?
          (
            <img
            className="photo_new_tweets"
            src={user.photo}
          />
          ):(

            <img
              className="photo_new_tweets"
              src="https://i.pinimg.com/originals/50/f5/7c/50f57c9b434ca4ee7b12cc7728687fae.jpg"
            />
          )

          }
          <textarea
            onChange={handlePostChange}
            name="post"
            value={post}
            className="text_tweet"
            placeholder="write a comment"
          >
            {" "}
          </textarea>
        </div>

        <div className="button_newtweets">
          <div className="image-upload">
            <label htmlFor="file-input">
              <i
                className="far fa-image"
                style={{ fontSize: "40px", color: "#1e90ff" }}
              ></i>
            </label>

            <input
              id="file-input"
              type="file"
              onChange={(event) => uploadImage(event)}
            />
          </div>

          <div className="btn-group">
            <button
              type="button"
              className="btn btn-secondary dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                className="btn_tof"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3feqg7eZWeyEFcJv5pk8l2Mti2CgSMAmK3Q&usqp=CAU"
              />
              everyone can reply
            </button>
            <div className="dropdown-menu dropdown-menu-right">
              <h6 className="Whocanreply">Who can reply?</h6>
              <p className="canseeyou²">choose who can see you</p>
              <button
                className="dropdown-item"
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  console.log(kane);
                  setPublic(true);
                }}
              >
                everyone
              </button>
              <button
                className="dropdown-item"
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  setPublic(false);
                  console.log(kane);
                }}
              >
                poeple who follow
              </button>
            </div>
          </div>
          <button className="follow_button" onClick={handleClickPost}>
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
