import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import DeleteIcon from '@material-ui/icons/Delete';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, makeComment } from '../../redux/actions/postActions';
import LikeButton from './../Home/LikeButton';
import { deletepost } from './../../redux/actions/postActions';
import { Link } from 'react-router-dom';
import { getAuthUser } from '../../redux/actions/authAction';


const useStyles = makeStyles((theme) => ({

  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const UserPost=({item}) =>{
  console.log(item);
const user= useSelector((state) => state.authReducer.user);
console.log(user);

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const submitComment = (e) => {
    e.preventDefault();
    dispatch(makeComment(e.target[0].value, item._id));
  };


  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Link to={'/profile'}><Avatar aria-label="recipe" src={`/${item.postedBy.picture}`}>
           </Avatar>
           </Link> 
         }
        
        title={item.title}
        subheader="September 14, 2016"
      />
      <CardMedia
        className={classes.media}
        image={`/${item.picture}`}
        
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
        
 
        { item.postedBy._id == user._id ?
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
          : ''}
        

        </CardContent>
      </Collapse>
    </Card>
  );
}

export default UserPost