import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './VerifyEmail.scss'
import { postVerifyBookAppointment } from '../../services/userService'
import HomeHeader from '../HomePage/HomeHeader';


class VerifyEmail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            statusVerify: false,
            errCode: '',
        }
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');

            let res = await postVerifyBookAppointment({
                token, doctorId
            })
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : ''
                })
            }
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {
        let { statusVerify, errCode } = this.state
        return (
            <>
                <HomeHeader />
                {statusVerify === false ?
                    <div className='false'>Loading data...</div>
                    :
                    <div className='true'>
                        {+errCode === 0 ?
                            <div className='confrimed'>Confirmed ! Thanks for your confidence in us</div>
                            :
                            <div className='failed'>This appointment had comfirmed or doesnt exist, please check again</div>
                        }
                    </div>
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);


