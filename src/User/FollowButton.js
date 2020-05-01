import React,{Component} from 'react';

class FollowButton extends Component{

    render(){
        return (
            <div className = 'container'>
            <div className = 'd-inline-block'>
                
                { !this.props.following ?
               ( <button onClick = {this.props.onClickFollow} className = 'btn btn-raised btn-primary mr-5'>Follow</button> ):
               ( <button onClick = {this.props.onClickUnFollow} className = 'btn btn-raised btn-warning'>UnFollow</button> )
                }

            </div>
            </div>
        );
    }

}

export default FollowButton;