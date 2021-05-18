import { React, useState, useEffect } from "react";
import "./home.css";
import axios from "axios";
// import moment from "moment";
function Home() {
  const [post, createPost] = useState("");
  const [photo, createPhoto] = useState("");
  const [kane, setPublic] = useState(false);
  const [user, setUser] = useState({});
  const [getPosts, setPosts] = useState([]);
  const [comment, createComment] = useState("");
  const [currentComment, setCurrent] = useState("");

  // const [pub,setPublic]=useState(false)
  const getUser = () => {
    const token = localStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    axios
      .get("http://localhost:3001/api/user/", headers)
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
    axios.get("http://localhost:3001/api/post/").then(({ data }) => {
      console.log("here all post", data);
      setPosts(data);
    });
  };
  useEffect(() => {
    getUser();
    getAllPosts();
  }, []);
  const uploadImage = (event) => {
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
      .post("http://localhost:3001/api/comment/", data)
      .then(({ data }) => {
        console.log("this is the comment id ", data);
        // setCurrent(data._id)
        comments.push(data._id);
      })
      .then(() => {
        console.log(comments);

        axios
          .patch(`http://localhost:3001/api/post/${id}`, { comments: comments })
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

    axios.post("http://localhost:3001/api/post/", data).then((res) => {
      console.log("your data is posted", res);
    });
  };
  // home post mapping
  const onePost = getPosts.map((element, i) => (
    <div key={i} style={{ background: "white" }} className="one_post">
      <div className="info">
        <img className="tof_post" src={element.user.photo} />
        <div>
          <h5 className="user_name">{element.user.name}</h5>
          <p className="post_date">14:15 13:00 pm</p>
        </div>
      </div>
      <div className="post_content">
        <p className="post_paragraph">{element.post}</p>
        <img className="post_img" src={element.photo} />
      </div>
      <div className="numbers">
        <p className="post_date">{element.comments.length} comments</p>
        <p className="post_date">{element.retweets} retweets</p>
        <p className="post_date">{element.saved} saved</p>
      </div>

      <div className="btn_control">
        <button className="btn_button">
          <i className="fab fa-rocketchat"></i> comment
        </button>
        <button className="btn_button">
          <i className="fa fa-retweet"></i> Retweet
        </button>
        <button className="btn_button">
          <i className="far fa-heart"></i> Like
        </button>
        <button className="btn_button">
          <i className="far fa-bookmark"></i> Save{" "}
        </button>
      </div>
      <div className="comment_div">
        <img
          className="tof_comment"
          src="https://i.pinimg.com/originals/50/f5/7c/50f57c9b434ca4ee7b12cc7728687fae.jpg"
        />
        <div className="tarea">
          <div className="image-upload">
            <label htmlFor="file-input">
            <i className='far fa-image' style={{fontSize:'36px', color:"grey"}}></i>
            </label>

            <input id="file-input" type="file" />
          </div>
          <textarea
            className="text_comment"
            placeholder="write a comment"
            name={element._id}
            onChange={handleCommentChange}
          ></textarea>
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
                  <h6 className="comment_name">{comment.userName}</h6>
                  <p className="comment_date">14:15 13:00 pm</p>
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
            <i className='far fa-image' style={{fontSize:'36px', color:"blue"}}></i>
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
