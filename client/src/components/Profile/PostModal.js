import React, { useState } from "react";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import './PostModal.css';
import { Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { createPost, getPost } from "../../redux/actions/postActions";
const customStyles = {

  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    
    height: '60%',
    transform: "translate(-50%, -50%)",
    backgroundColor:'rgb(238, 212, 241)',
    borderRadius: "10px",

  },

};


Modal.setAppElement("#root");

const AddNewPost=() => {
  let history = useHistory();
    const [newPost, setNewPost] = useState({
        title: "",
        message: "",
        keyword:"",
        picture:"",
      });
  

  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  function setModalIsOpenToTrue() {
    setModalIsOpen(true);
  }
  function setModalIsOpenToFalse() {
    setModalIsOpen(false);
  }
  function closeModal() {
    setModalIsOpen(false);
  }

  const dispatch = useDispatch()
  const handleChange = (e) =>
    setNewPost({ ...newPost, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', newPost.title);
        formData.append('message', newPost.message);
        formData.append('keyword', newPost.keyword);
        formData.append('picture',newPost.picture);
    
        dispatch(createPost(formData))
      
        {
            setModalIsOpenToFalse();
          }
          // dispatch(getPost())
        // history.push("/profile");
    }
    const handlePhoto = (e) => {
      setNewPost({...newPost, picture: e.target.files[0]});
    }

  return (
    <div className="add-post">
      <div className="heading">
      <button onClick={setModalIsOpenToTrue} data-title="AddPost" ><AddIcon/></button>
      </div>

      <div className="modal-post">
      <Modal isOpen={modalIsOpen} style={customStyles} >
      
        
      {/* <label className="custom-file-label" htmlFor="inputGroupFile01">
        Create post Title
      </label> */}
      <br />
      <input type="text" placeholder="Enter Title" className="custom-input" name="title" value={newPost.title} onChange={handleChange}/>
      <br />
      {/* <label className="custom-file-label" htmlFor="inputGroupFile01">
        Create post
      </label> */}
      <br />
      <input type="text" placeholder="Enter Texte" className="custom-input" name="message" value={newPost.message} onChange={handleChange}/>
      <br />
      {/* <label className="custom-file-label" htmlFor="inputGroupFile01">
        Enter Keyword
      </label> */}
      <br />
      <input type="text" placeholder="Enter Keyword" className="custom-input" name="keyword" value={newPost.keyword} onChange={handleChange}/>
      <br />
      <span></span>
      <br/>
      <label className="custom-file-label" htmlFor="inputGroupFile01">
        Add Photo
      </label>
      <br />
      <input
        type="file"
        className="custom-file-input"
        name="picture"  onChange={handlePhoto}
      />
      <br />
        {/* <Link to ="/profile"> */}
        <span></span>
        <br/>
        <div className="modal-button">
    <button type="submit"
          onClick={handleSubmit}
        >
          Add
        </button>
        {/* </Link> */}
        <button onClick={closeModal}>close</button>
        </div>
      </Modal>
      </div>
      
    </div>
  );
}

export default AddNewPost;