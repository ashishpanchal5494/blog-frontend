import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRegComments, FaRegThumbsUp, FaRegUser } from "react-icons/fa";
import { LuClock4 } from "react-icons/lu";
import { FaAnglesRight } from "react-icons/fa6";

const BlogPostItem: React.FC<{
  id: number;
  imgSrc: string;
  date: string;
  title: string;
  description: string;
  author: string;
  likes: number;
  comments: number;
}> = ({ id, imgSrc, date, title, description, author, likes, comments }) => {
  console.log(id);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/${id}`);
  };

  return (
    <div className="blog-post-item">
      <div className="blog-post-thumb">
        <img
          style={{ height: "400px", width: "740px" }}
          src={imgSrc}
          alt="Blog post thumbnail"
        />
      </div>
      <div className="blog-post-content">
        <span className="date">
          <i className="far fa-clock">
            <LuClock4 />
          </i>
          {date}
        </span>
        <h2 onClick={handleNavigate} className="title">
          {title}
        </h2>
        <p>{description}</p>
        <div className="blog-post-meta">
          <ul>
            <li>
              <i className="far fa-user">
                <FaRegUser />
              </i>{" "}
              by <a href="#">{author}</a>
            </li>
            <li>
              <i className="far fa-thumbs-up">
                <FaRegThumbsUp />
              </i>{" "}
              {likes}
            </li>
            <li>
              <i className="far fa-comments">
                <FaRegComments />
              </i>
              <a href="#">{comments} Comments</a>
            </li>
          </ul>
          <div className="read-more">
            <a onClick={handleNavigate} style={{ cursor: "pointer" }}>
              Read More{" "}
              <i className="fas fa-angle-double-right">
                <FaAnglesRight />
              </i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostItem;
