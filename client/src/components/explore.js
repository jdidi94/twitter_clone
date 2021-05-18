import React from "react";
import "./explore.css";
function Explore() {
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
      <div  style={{ background: "white" }}  className="post_container">
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
              A paragraph is a series of related sentences developing a central
              idea, called the topic. Try to think about paragraphs in
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
                  <i class="far fa-heart"></i> Like
                </button>
                <p className="post_date">553 retweets</p>
              </div>
            </div>
          </div>
      </div>
      
    </div>
    </div>

  );
}

export default Explore;
