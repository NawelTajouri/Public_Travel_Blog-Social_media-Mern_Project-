import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import { likePost, unlikePost } from '../../redux/actions/postActions';
import { UserContext } from './../../App';

const LikeButton = ({ item }) => {
  //item : rahi post
  console.log(item);
  const user = useSelector(state => state.authReducer.user)
  console.log(user);
  const token = localStorage.getItem("token")
  const [liked, setLiked] = useState(false);

  const dispatch = useDispatch();
  const like = () => {
    dispatch(likePost(item._id))
    setLiked(true);
  };

  const unlike = () => {
    dispatch(unlikePost(item._id))
    setLiked(false);
  };


  return (
    <div className="like-container">
        
      {/* {user._id === null && (
        <Popup
          trigger={<img src="/img/icons/heart.svg" alt="like" />}
          position={["bottom center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
          <div>Connectez-vous pour aimer un post !</div>
        </Popup>
      )} */}
{item.likes.includes(user._id) || liked ?
        <img src="/img/icons/heart-filled.svg" onClick={unlike} alt="unlike" />
        :
        <img src="/img/icons/heart.svg" onClick={like} alt="like" />
      }
      
    </div>
  );
};

export default LikeButton;