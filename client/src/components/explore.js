
import axios from "axios";
import ReactDOM from "react-dom";
import moment from "moment";
import { React, useState, useEffect } from "react";
import "./explore.css";
function Explore() {
  const [getPosts, setPosts] = useState([]);
  const [comment, createComment] = useState("");
  const [submit, setSubmit] = useState("");
  const [photoComment, setphotoComment] = useState("");
  const [user, setUser] = useState({});
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
        console.log("here", data);
        setUser(data);

      
      })
      .catch((err) => {
        console.log(err);
      });
    }
    const getAllPosts = () => {
      axios.get("http://localhost:4000/api/post/").then(({ data }) => {
        console.log("here all post", data);
        setPosts(data);
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
    const handleClickComment = (e, id) => {
      e.preventDefault();
      console.log("user.photo", user.photo);
  
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
          console.log("this is the comment id ", data);
  
          comments.push(data._id);
        })
        .then(() => {
          console.log(comments);
  
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
              .patch(`http://localhost:4000/api/user/likes/${user._id}`, data)
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
              .patch(`http://localhost:4000/api/user/likes/${user._id}`, data)
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
      const element = document.getElementById(id + "retweet");
      ReactDOM.findDOMNode(element).style.color = "green";
  
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
          
              console.log("posted done",data);
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
  
      setSubmit(!submit);
      if (!save.includes(user._id)) {
        const data = {
          message: true,
          saved: user._id,
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
              })
              .catch((err) => {
                console.log(err);
              });
          });
      }
    };
  return (
    <div className="explore_container">
      {/* filter  */}
      <div  style={{ background: "white" }}  className="filter_container">
      <button className="filter_item">Top</button>
      <button className="filter_item">Latest</button>
      <button className="filter_item">People</button>
      <button className="filter_item">Media</button>
      
      </div>
      {/* search_container */}
      <div  style={{ background: "white" }}  className="search_container">
      <i class='fas fa-search'></i>
       <input className="search_bar"  placeholder="Search"/>
       <button className="btn_search">Search</button>
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
                <button className="btn_button"         onClick={(e) => {
            handleTweetsClick(element._id, e, element.post, element.photo);
          }}
          id={element._id + "retweet"}
        >
                  <i className="fa fa-retweet"></i> Retweet
                </button>
                <button className="btn_button"          onClick={(e) => {
             handleLikesClick(element._id, element.likes, e);
          }}
          id={element._id + "like"}>
                  <i className="far fa-heart"></i> Like
                </button>
                <button className="btn_button"
                     onClick={(e) => {
                      handleTClickSaved(element._id, element.saved, e);
                    }}
                    id={element._id + "save"}>
                  <i className="far fa-bookmark"></i> Save{" "}
                </button>
              </div>
              <div className="comment_div">
          <img
          className="tof_comment"
          src="https://i.pinimg.com/originals/50/f5/7c/50f57c9b434ca4ee7b12cc7728687fae.jpg"
        />
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

  );
}

export default Explore;
