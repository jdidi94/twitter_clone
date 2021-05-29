import axios from "axios";
import ReactDOM from "react-dom";
import moment from "moment";
import { React, useState, useEffect } from "react";
import "./explore.css";
function Explore(props) {
  const [getPosts, setPosts] = useState([]);
  const [comment, createComment] = useState("");
  const [submit, setSubmit] = useState("");
  const [photoComment, setphotoComment] = useState("");
  const [user, setUser] = useState({});
  const [color, setColor] = useState(false);
  const [sort, setSort] = useState(false);
  const [sortlatest, setSortLatest] = useState(false);
  const [sortMedia, setSortMedia] = useState(false);
  const [top, setTop] = useState([]);
  const [latest, setLatest] = useState([]);
  const [media, setMedia] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState(false);
  const saveState = () => {
    getPosts.map((element) => {
      if (element) {
        console.log(element);
        if (element.saved.includes(user._id)) {
          const attribute = document.getElementById(element._id + "save");
          ReactDOM.findDOMNode(attribute).style.color = "blue";
          document.getElementById(element._id + "save_span").innerHTML =
            "saved";
        } else {
          const attribute = document.getElementById(element._id + "save");
          ReactDOM.findDOMNode(attribute).style.color = "black";
          document.getElementById(element._id + "save_span").innerHTML = "save";
        }
      } else {
        return;
      }
    });
  };
  const commentState=(()=>{
    getPosts.map((element) => {
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
  const likesState = () => {
    getPosts.map((element) => {
      if (element) {
        if (element.likes.includes(user._id)) {
          const attribute = document.getElementById(element._id + "likes");
          ReactDOM.findDOMNode(attribute).style.color = "pink";
          document.getElementById(element._id + "like_span").innerHTML =
            "liked";
        } else {
          const attribute = document.getElementById(element._id + "likes");
          ReactDOM.findDOMNode(attribute).style.color = "black";
          document.getElementById(element._id + "like_span").innerHTML = "like";
        }
      } else {
        return;
      }
    });
  };
  const retweetsState = () => {
    console.log("hiiiiii");
    getPosts.map((element) => {
      if (element) {
        if (element.retweets.includes(user._id)) {
          const attribute = document.getElementById(element._id + "retweet");
          ReactDOM.findDOMNode(attribute).style.color = "green";
          document.getElementById(element._id + "retweet_span").innerHTML =
            "retweeted";
        } else {
          const attribute = document.getElementById(element._id + "retweet");
          ReactDOM.findDOMNode(attribute).style.color = "black";
          document.getElementById(element._id + "retweet_span").innerHTML =
            "retweet";
        }
      } else {
        return;
      }
    });
  };
  useEffect(() => {
    saveState();
    likesState();
    retweetsState();
    commentState();
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
    const token = localStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    axios
      .get("http://localhost:4000/api/user/", headers)
      .then(({ data }) => {
        // console.log("USERBEFORE", this.user);

        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllPosts = () => {
    axios.get("http://localhost:4000/api/post/").then(({ data }) => {
      const all = data.filter((element) => element.public === true);
      setPosts(all);

      setColor(!color);
    });
  };
  useEffect(() => {
    getUser();
    getAllPosts();
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
  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    const results = getPosts.filter((person) =>
      person.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPosts(results);
  }, [search]);
  const handlesearchClick = () => {
    setSearch(!search);
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
      })
      .then(() => {
        axios
          .patch(`http://localhost:4000/api/post/${id}`, { comments: comments })
          .then((data) => {
            console.log(data);
            setSubmit(!submit);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setPosts(top);
  }, [sort]);
  const clickTop = () => {

    setTop(
      getPosts.sort((a, b) =>
        a.likesNumber < b.likesNumber
          ? 11
          : a.likesNumber === b.likesNumber
          ? a.post > b.post
            ? 1
            : -1
          : -1
      )
    );
    setSort(!sort);
  };
  useEffect(() => {
    setPosts(latest);
  }, [sortlatest]);

  const clicklatest = () => {
    
    setLatest(getPosts.sort((a, b) => (a.date < b.date ? 1 : -1)));
    setSortLatest(!sortlatest);
  };
  useEffect(() => {
    setPosts(media);
  }, [sortMedia]);
  const clickMedia = () => {
    const post = [];
    getPosts.map((element) => {
      element.comments.map((comment) => {
        if (comment.userPhoto !== "") {
          post.push(element);
        }
      });
    });
    setMedia(post);
    setSortMedia(!sortMedia);
  };
  const handleLikesClick = (id, like, e) => {
    e.preventDefault();

    if (!like.includes(user._id)) {


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
              setSubmit(!submit);
            })
            .catch((err) => {
              console.log(err);
            });
        });
    } else if (like.includes(user._id)) {


      const data = {
        message: false,
        likes: user._id,
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
            .patch(`http://localhost:4000/api/user/likes/${user._id}`, data2)
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
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        axios
          .post(`http://localhost:4000/api/post/`, data1)
          .then(({ data }) => {
            setSubmit(!submit);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  };

  const handleTClickSaved = (id, save, e) => {
    e.preventDefault();



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
            .patch(`http://localhost:4000/api/user/saved/${user._id}`, data2)
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

  return (
    <div className="explore_container">
      {/* filter  */}
      <div style={{ background: "white" }} className="filter_container">
        <button className="filter_item" onClick={clickTop}>
          Top
        </button>
        <button className="filter_item" onClick={clicklatest}>
          Latest
        </button>
        <button className="filter_item" onClick={clickMedia}>
          Media
        </button>
      </div>
      {/* search_container */}
      <div style={{ background: "white" }} className="search_container">
        <i className="fas fa-search"></i>
        <input
          className="search_bar"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChangeSearch}
        />
        <button className="btn_search" onClick={handlesearchClick}>
          Search
        </button>
      </div>
      {/* post_container */}

      {/* post_container */}
      <div className="post_container">
        {getPosts.map((element) => (
          <div
            key={element._id}
            style={{ background: "white" }}
            className="one_post"
          >
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
                <span id={element._id + "retweet_span"}>Retweet</span>
              </button>
              <button
                className="btn_button"
                onClick={(e) => {
                  handleLikesClick(element._id, element.likes, e);
                }}
                id={element._id + "likes"}
              >
                <i className="far fa-heart"></i>
                <span id={element._id + "like_span"}>Like</span>
              </button>
              <button
                className="btn_button"
                onClick={(e) => {
                  handleTClickSaved(element._id, element.saved, e);
                }}
                id={element._id + "save"}
              >
                <i className="far fa-bookmark"></i>
                <span id={element._id + "save_span"}>Save</span>
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
              {element.comments.map((comment) => (
                <div key={comment._id} className="one_comments">
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
                      {comment.Commentslikes.length} likes
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;
