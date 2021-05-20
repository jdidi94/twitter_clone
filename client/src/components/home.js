import { React, useState, useEffect } from "react";
import "./home.css";
import axios from "axios";
import ReactDOM from "react-dom";
import moment from "moment";
function Home(props) {
  const [post, createPost] = useState("");
  const [photo, createPhoto] = useState("");
  const [kane, setPublic] = useState(false);
  const [user, setUser] = useState({});
  const [getPosts, setPosts] = useState([]);
  const [comment, createComment] = useState("");
  const [submit, setSubmit] = useState("");


 const currentDateTime=(date)=> {
    const dateNow = moment();

    if (dateNow.diff(date, "seconds") <= 60) {
      return moment(date)
        .startOf("seconds")
        .fromNow();
    } else if (dateNow.diff(date, "minutes") > 1) {
      return moment(date)
        .startOf("minutes")
        .fromNow();
    }
     else if (dateNow.diff(date, "hours") >= 1) {
      return moment()
        .endOf("day", "hours", "minutes")
        .fromNow();
    }
     else if(dateNow.diff(date, "days") >= 1) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    }
  }
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
  };
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
  const uploadImage = (event) => {
    console.log("hii");
    event.preventDefault();
    const image = new FormData();
    image.append("file", event.target.files[0]);
    image.append("upload_preset", "tyfhc3lt");
    console.log("photo", event.target.files[0]);
    axios
      .post("https://api.cloudinary.com/v1_1/dkcwqbl9d/image/upload", image)
      .then(({ data }) => {
        createPhoto(data.url);
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
  const handlePostChange = (e) => {
    e.preventDefault();
    createPost(e.target.value);
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
        console.log("your data is posted", res);
        setSubmit(!submit);
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
        });
    }
  };
  const handleTweetsClick = (id, retweets, e) => {
    e.preventDefault();

    const element = document.getElementById(id + "retweet");
    ReactDOM.findDOMNode(element).style.color = "green";
    console.log("here like", retweets);
    setSubmit(!submit);
    if (!retweets.includes(user._id)) {
      const data = {
        message: true,
        retweets: user._id,
      };
      axios
        .patch(`http://localhost:4000/api/post/retweet/${id}`, data)
        .then(({ data }) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (retweets.includes(user._id)) {
      const element = document.getElementById(id + "retweet");
      ReactDOM.findDOMNode(element).style.color = "black";
      const data = {
        message: false,
        retweets: user._id,
      };
      axios
        .patch(`http://localhost:4000/api/post/retweet/${id}`, data)
        .then(({ data }) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
        });
    }
  };
  const pushUserClick=(id)=>{
    props.history.push({
      pathname: `/profile/${id}`,
        state:{id:id,user:user} // your data array of objects
    })
  }

  // home post mapping
  const onePost = getPosts.map((element) => (
    <div key={element._id} style={{ background: "white" }} className="one_post">
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
            handleTweetsClick(element._id, element.retweets, e);
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
            <label htmlFor="file-input">
              <i
                className="far fa-image"
                style={{ fontSize: "40px", color: "grey" }}
              ></i>
            </label>

            <input id="file-input" type="file" />
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
                  <h6 className="comment_name" onClick={()=>{pushUserClick(comment.user)}}>{comment.userName}</h6>
                  <p className="comment_date">{currentDateTime(comment.createdAt)}</p>
                </div>
                <p className="comment_paragraph">{comment.comment}</p>
              </div>
            </div>

            <div className="comment_buttons">
              <button className="btn_like">
                <i className="far fa-heart"></i> Like
              </button>
              <p className="post_date">{comment.likes} likes</p>
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
        <div className="follow_container">
          <h5 className="tweet_title">who follows you</h5>
          <hr />
          <div className="follow_info">
            <img
              className="follow_img"
              src="https://i.pinimg.com/originals/50/f5/7c/50f57c9b434ca4ee7b12cc7728687fae.jpg"
            />
            <div>
              <h5 className="follow_name">jdidi daoud</h5>
              <p className="follow_numbers">245k followers</p>
            </div>
            <button className="follow_button">
              <i className="fas fa-user-plus"></i> Follow
            </button>
          </div>
          <p className="follow_paragraph">
            {" "}
            A paragraph is a series of related sentences developing a central
            idea, called the topic. Try to think about paragraphs in
          </p>
          <img
            className="big_img"
            src="https://i.pinimg.com/originals/50/f5/7c/50f57c9b434ca4ee7b12cc7728687fae.jpg"
          />
        </div>
      </div>
      {/* trends */}
      <div style={{ background: "white" }} className="trends">
        <h5 className="tweet_title">Trends for you</h5>
        <hr />
        <div className="trends_div">
          <h5 className="trends_title"># developers</h5>
          <p className="post_date">44 followers</p>
        </div>
        <div>
          <h5 className="trends_title"># developers</h5>
          <p className="post_date">44 followers</p>
        </div>
      </div>
      {/* home posts */}
      <div className="home_posts">{onePost}</div>

      {/* new tweets */}
      <div style={{ background: "white" }} className="new_tweets">
        <h5 className="tweet_title"> Tweet something</h5>
        <hr />

        <div className="new_tweets_container">
          <img
            className="photo_new_tweets"
            src="https://i.pinimg.com/originals/50/f5/7c/50f57c9b434ca4ee7b12cc7728687fae.jpg"
          />
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
