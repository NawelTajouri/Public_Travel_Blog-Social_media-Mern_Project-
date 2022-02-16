import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
// import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from "react-redux";
import {
  makeComment,
  deletepost,

} from "../../redux/actions/postActions";

import { Link } from 'react-router-dom';
import LikeButton from "./LikeButton";


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const AllPosts = ({ item }) => {
  const token =localStorage.getItem('token')
  const user= useSelector((state) => state.authReducer.user);
console.log(item.comments)
  const dispatch = useDispatch();
  const submitComment = (e) => {
    e.preventDefault();
    dispatch(makeComment(e.target[0].value, item._id));
  
  };
  const deletePost=()=>{
    dispatch(deletepost(item._id))
  }

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  

  return (
    <>
    {token ?
    <Card className={classes.root}>
      <CardHeader
        avatar={
         <Link to={'/profile/'+item.postedBy._id}><Avatar aria-label="recipe" src={`/${item.postedBy.picture}`}>
          </Avatar>
          </Link> 
        }
        action={
          <IconButton aria-label="settings">
            {/* <MoreVertIcon /> */}
            {item.postedBy._id == user._id ?
            
              <DeleteIcon onClick={deletePost}/> : ""
            }
          </IconButton>
        }
        title={item.title}
        subheader="September 14, 2016"
      />
      <CardMedia
        className={classes.media}
        image={`/${item.picture}`}
        title="Paella dish"
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {item.message}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>

        <LikeButton item={item} />


        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <h6>{item.likes.length} Likes</h6>

          <Typography paragraph>
            {item.comments.map((record) => {
              return (
                <h6 key={record._id}>
                  <span style={{ fontWeight: "500" }}>
                    {record.postedBy.name}
                  </span>{" "}
                  {record.text}
                </h6>
                
              );
            })}
            <form onSubmit={submitComment}>
              <input type="text" placeholder="add a comment" />
            </form>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    : <h1>loading...</h1>}
    </>
  );
};

export default AllPosts;
