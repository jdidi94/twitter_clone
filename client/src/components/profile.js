import { React, useState, useEffect } from "react";
import "./profile.css";
import axios from "axios";
import ReactDOM from "react-dom";

function Profile(props) {
  const { state } = props.location;
  const [user, setUser] = useState({});
  
  const [followers, setfollowers] = useState("");
  const [following, setfollowing] = useState("");
  const [load, setload] = useState(false);
  
  const getUser = () => {
    console.log("this user state", state);
    axios
      .get(`http://localhost:4000/api/user/getUser/${state.id}`)
      .then(({ data }) => {
        // console.log("USERBEFORE", this.user);
        console.log("profile user", data);

        setUser(data);
        setfollowers(data.followers.length);
        console.log("")
        setfollowing(data.following.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUser();
  }, [load]);
  const handleTClickFollowing = (e) => {
    e.preventDefault();

    // let element = document.getElementById(id + "save");
    // ReactDOM.findDOMNode(element).style.color = "blue";

  
    if (!user.following.includes(state.user._id)) {
      const data = {
        message: true,
        following: state.user._id,
      };
      axios
        .patch(`http://localhost:4000/api/user/following/${state.id}`, data)
        .then(({ data }) => {
          console.log(data);
          setload(!load);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (user.following.includes(user._id)) {
      // let element = document.getElementById(id + "save");
      // ReactDOM.findDOMNode(element).style.color = "black";
      const data = {
        message: false,
        following: state.user._id,
      };
      axios
        .patch(`http://localhost:4000/api/user/following/${state.id}`, data)
        .then(({ data }) => {
          setload(!load);

          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const pushUserClick = (id) => {
    props.history.push({
      pathname: `/profile/${id}`,
      state: { id: id, user: user }, // your data array of objects
    });
  };

  return (
    <div className="profile_container">
      <div className="all_info">
        <div style={{ background: "red" }} className="photosize">
          <img
            className="profle_tof"
            src="https://i.pinimg.com/originals/50/f5/7c/50f57c9b434ca4ee7b12cc7728687fae.jpg"
          />
        </div>
        {/* group info */}
        <div className="info_group" style={{ background: "white" }}>
          <div className="image_div">
            <img
              className="photo_user"
            src={user.photo}
            />
          </div>

          <div>
            <div className="user_info">
              <h5 className="name_info">{user.name}</h5>
              <p className="follow_numbers">{followers} followers</p>
              <p className="follow_numbers">{following} following</p>
              <button className="follow_button" onClick={handleTClickFollowing}>
                <i class="fas fa-user-plus"></i> Follow
              </button>
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
          <button className="filter_item">Tweets</button>
          <button className="filter_item">Tweets & replies</button>
          <button className="filter_item">Media</button>
          <button className="filter_item">Likes</button>
        </div>
        {/* posts */}
        <div style={{ background: "white" }} className="post_profile_container">
          <div className="one_post">
            <div className="info">
              <img
                className="tof_post"
                src="https://i.pinimg.com/originals/50/f5/7c/50f57c9b434ca4ee7b12cc7728687fae.jpg"
              />
              <div>
                <h5 className="user_name">jdidi daoud</h5>
                <p className="post_date">14:15 13:00 pm</p>
              </div>
            </div>
            <div className="post_content">
              <p className="post_paragraph">
                {" "}
                A paragraph is a series of related sentences developing a
                central idea, called the topic. Try to think about paragraphs in
              </p>
              <img
                className="post_img"
                src="https://i.pinimg.com/originals/50/f5/7c/50f57c9b434ca4ee7b12cc7728687fae.jpg"
              />
            </div>
            <div className="numbers">
              <p className="post_date">455k comments</p>
              <p className="post_date">553 retweets</p>
              <p className="post_date">245k saved</p>
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
              <textarea
                className="text_comment"
                placeholder="write a comment"
              ></textarea>
            </div>
            <hr />
            <div className="all_comments">
              <div className="one_comments">
                <div className="div_flex">
                  <img
                    className="photo_comment"
                    src="https://i.pinimg.com/originals/50/f5/7c/50f57c9b434ca4ee7b12cc7728687fae.jpg"
                  />
                  <div className="comment_details">
                    <div className="div_name_date">
                      <h6 className="comment_name">jdidi daoud</h6>
                      <p className="comment_date">14:15 13:00 pm</p>
                    </div>
                    <p className="comment_paragraph">
                      A paragraph is a series of related sentences developing a
                      central idea, called the topic. Try to think about
                      paragraphs in
                    </p>
                  </div>
                </div>

                <div className="comment_buttons">
                  <button className="btn_like">
                    <i className="far fa-heart"></i> Like
                  </button>
                  <p className="post_date">553 retweets</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
