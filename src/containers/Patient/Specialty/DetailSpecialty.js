import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './DetailSpecialty.scss'
import HomeHeader from '../../HomePage/HomeHeader';


class DetailSpecialty extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    async componentDidMount() {
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {
        return (
            <>
                <HomeHeader />
                hello world
            </>
        )
    }

}


const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);


