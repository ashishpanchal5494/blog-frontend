import React from "react";
import { useNavigate } from "react-router-dom";

import { LuClock4 } from "react-icons/lu";

const RecentPostItem: React.FC<{
  postId: number;
  imgSrc: string;
  title: string;
  date: string;
}> = ({ imgSrc, title, date, postId }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/${postId}`);
  };

  return (
    <li className="rc-post-item">
      <div className="thumb">
        <img
          className="img-fluid mt-2"
          src={imgSrc}
          alt="Recent post thumbnail"
        />
      </div>
      <div className="content">
        <h5 onClick={handleNavigate} className="title">
          <p>{title.length > 30 ? title.slice(0, 30) : title}</p>
        </h5>
        <span className="date">
          <i className="far fa-clock">
            {" "}
            <LuClock4 />
          </i>{" "}
          {date}
        </span>
      </div>
    </li>
  );
};

export default RecentPostItem;
