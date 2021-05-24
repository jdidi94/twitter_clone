import { React, useState, useEffect } from "react";
import "./profile.css";
import axios from "axios";
import ReactDOM from "react-dom";
import moment from "moment";

function Profile(props) {
  const { state } = props.location;
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [followers, setfollowers] = useState("");
  const [following, setfollowing] = useState("");
  const [submit, setload] = useState(false);
  const [comment, createComment] = useState("");

  const [photoComment, setphotoComment] = useState("");
  const [color, setColor] = useState(false);
  const [replies, setReplies] = useState([]);
  const [sortReplies, setSortReplies] = useState("false");

  const [media, setMedia] = useState([]);
  const [sortMedia, setSortMedia] = useState(false);
  const [likes, setLikes] = useState([]);
  const [sortLikes, setSortLikes] = useState(false);
  // tweets replies
  const handletweetclick = () => {
    setload(!submit);
  };
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
      } else {
        const attribute = document.getElementById(element._id + "save");
        ReactDOM.findDOMNode(attribute).style.color = "black";
      }
    });
  };
  const likesState = () => {
    posts.map((element) => {
      if (element.likes.includes(state.user._id)) {
        const attribute = document.getElementById(element._id + "like");
        ReactDOM.findDOMNode(attribute).style.color = "pink";
      } else {
        const attribute = document.getElementById(element._id + "like");
        ReactDOM.findDOMNode(attribute).style.color = "black";
      }
    });
  };
  const retweetsState = () => {
    posts.map((element) => {
      if (element.retweets.includes(state.user._id)) {
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
  const getUser = () => {
    console.log("this user state", state);
    axios
      .get(`http://localhost:4000/api/user/getUser/${state.id}`)
      .then(({ data }) => {
        // console.log("USERBEFORE", this.user);
        console.log("profile user", data);

        setUser(data);
        setfollowers(data.followers.length);
        console.log("");
        setfollowing(data.following.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getPosts = () => {
    axios
      .get(`http://localhost:4000/api/post/user/${state.id}`)
      .then(({ data }) => {
        console.log("here your post", data);
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
  }, [submit]);

  const uploadImageComment = (event) => {
    event.preventDefault();
    const image = new FormData();
    image.append("file", event.target.files[0]);
    image.append("upload_preset", "tyfhc3lt");
    console.log("photo", event.target.files[0]);
    axios
      .post("https://api.cloudinary.com/v1_1/dkcwqbl9d/image/upload", image)
      .then(({ data }) => {
        setphotoComment(data.url);
        console.log("this is the photo uploaded", data);
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
      const element = document.getElementById(id + "like");
      ReactDOM.findDOMNode(element).style.color = "red";

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
      const element = document.getElementById(id + "like");
      ReactDOM.findDOMNode(element).style.color = "black";

      const data = {
        message: false,
        likes: state.user._id,
      };
      const data2 = {
        message: false,
        likes: id,
      };
      console.log("here like posts ", data);
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
    const element = document.getElementById(id + "retweet");
    ReactDOM.findDOMNode(element).style.color = "green";

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

    let element = document.getElementById(id + "save");
    ReactDOM.findDOMNode(element).style.color = "blue";

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
      let element = document.getElementById(id + "save");
      ReactDOM.findDOMNode(element).style.color = "black";
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

    // let element = document.getElementById(id + "save");
    // ReactDOM.findDOMNode(element).style.color = "blue";

    if (!user.followers.includes(state.user._id)) {
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
            });
        });
    } else {
      // let element = document.getElementById(id + "save");
      // ReactDOM.findDOMNode(element).style.color = "black";
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
              setload(!submit);
            });
        });
    }
  };
  const handleClickComment = (e, id) => {
    e.preventDefault();
    console.log("user.photo", user.photo);

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
        console.log("this is the comment id ", data);

        comments.push(data._id);
      })
      .then(() => {
        console.log(comments);

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
              <p className="follow_numbers">{followers} followers</p>
              <p className="follow_numbers">{following} following</p>
              {state.id !== state.user._id ? (
                <button
                  className="follow_button"
                  onClick={handleTClickFollowing}
                >
                  <i class="fas fa-user-plus"></i> Follow
                </button>
              ) : (
                <div></div>
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
                  <i className="fa fa-retweet"></i> Retweet
                </button>
                <button
                  className="btn_button"
                  onClick={(e) => {
                    handleLikesClick(element._id, element.likes, e);
                  }}
                  id={element._id + "like"}
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
                      <button className="btn_like">
                        <i className="far fa-heart"></i> Like
                      </button>
                      <p className="post_date">553 retweets</p>
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
