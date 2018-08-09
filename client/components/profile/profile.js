import React from 'react';
import { connect } from 'react-redux';
import { user } from '../../store/'

class Profile extends React.Component{
    constructor(){
        super()

    }

    componentDidMount() {
        // console.log("this.props ", this.props)
        this.props.fetchUser(+this.props.match.params.id)
    }

    render(){
        console.log("this.props in render", this.props)
        
        return(
            <div>
                <img src = "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.aiche.org%2Fsites%2Fdefault%2Ffiles%2Fprofile-photo-default%2Favatar.gif&f=1"/>
                <h1>{this.props.user.firstName + " " + this.props.user.lastName}</h1>
            </div>
        )
    }
}

const mapDispatch = dispatch => {
    return {
        fetchUser: (id) => dispatch(user(id))
    }
}

const mapState = state => {
    return {
        user: state.user
    }
}

export default connect(mapState, mapDispatch)(Profile)