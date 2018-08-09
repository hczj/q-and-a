import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../store/'

class Profile extends React.Component{
    constructor(){
        super()

    }

    componentDidMount() {
        this.props.getUser(+this.props.match.params.id)
    }

    render(){
        console.log(this.props.viewedUser)
        const {
            firstName,
            lastName,
            isActive,
            email,
            topics
        } = this.props.viewedUser

        let status = "Inactive"
        if(isActive) status = "Active"
        console.log(topics)
        if(!this.props.viewedUser.firstName){
            return (<React.Fragment/>)
        } else {
        return(

            <React.Fragment>
                <img src = "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.aiche.org%2Fsites%2Fdefault%2Ffiles%2Fprofile-photo-default%2Favatar.gif&f=1"/>
                <h1>{firstName} {lastName}</h1>
                <h2>Status: {status}</h2>
                <h2>Email: {email}</h2>
                {topics.map(topic => (
                    <h2 key={topic.id}>{topic.name}: {topic.userTopic.proficiency}</h2>   
                ))}
            </React.Fragment>

        )}
    }
}

const mapDispatch = dispatch => {
    return {
        getUser: (id) => dispatch(fetchUser(id))
    }
}

const mapState = state => {
    return {
        viewedUser: state.users.active,
    }
}

export default connect(mapState, mapDispatch)(Profile)