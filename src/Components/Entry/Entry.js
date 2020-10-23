import React from 'react'

function Entry() {
    return <h1>Entry</h1>;
}

export default Entry;


// import React, {Component} from 'react'
// import axios from 'axios'
// import {connect} from 'react-redux'
// import './Post.css';


// class Post extends Component {
//     constructor(props){
//         super(props)
//         this.state = {
//             post: {}
//         }
//     }
//     componentDidMount() {
//         if(!this.props.user.username){
//             this.props.history.push('/')
//         }
//         else{
//             const {postId} = this.props.match.params;
//             console.log(postId)
//             axios
//             .get(`/api/posts/single/${postId}`)
//             .then(res => this.setState({ post: res.data }))
//             .catch(err => console.log(err.request));
//         }
        
//      }

//      handleDelete = () => {
//         axios.delete(`/api/posts/${this.state.post.post_id}`)
//         .then(() => this.props.history.push('/dashboard'))
//         .catch(err => console.log(err))
//      }

//     render(){
    
//         const {title, img, content, username, profile_picture, author_id} = this.state.post;

//         return(
//             <div className='post-flex'>
//                 <div className='title-header'>
//                     <h1 className='title'>{title}</h1>
//                     <div className="author-flex">
//                         <p>by {username}</p>
//                         <img src={profile_picture} alt='User-pic' />
//                     </div>
//                 </div>
//                 <div className='post'>
//                     <img src={img} alt='post-img' />
//                     <p>{content}</p>
//                 </div>
//                 {this.props.user.user_id === author_id
//                 ?
//                 (<button onClick={this.handleDelete}>Delete Post</button>)
//                 :
//                 (<button>Not User: Cannot Delete</button>)}
//          </div>
//         )
//     }
// }
// const mapStateToProps = reduxState => reduxState;
// export default connect(mapStateToProps)(Post);