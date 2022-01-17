import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { getSpecialties } from '../../../services/userService'
import { withRouter } from 'react-router'
import { useHistory } from "react-router-dom";




class Specialty extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrSpec: []
        }
    }


    async componentDidMount() {
        let res = await getSpecialties()
        this.setState({
            arrSpec: res.data
        })
    }

    handleViewDetailDoctor = (item) => {
        this.props.history.push(`/detail-specialty/${item.id}`)
    }
    render() {
        let { arrSpec } = this.state
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Chuyên khoa phổ biến</span>
                        <button className='btn-section'>xem thêm</button>
                    </div>

                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {arrSpec && arrSpec.length > 0 &&
                                arrSpec.map((item, index) => {
                                    return (
                                        <div
                                            onClick={() => this.handleViewDetailDoctor(item)}
                                            className='section-customize' key={index}>
                                            <div
                                                style={{ backgroundImage: `url(${item.image})`, cursor: 'pointer' }}
                                                className='bg-image section-specialty'></div>
                                            <div
                                                style={{ cursor: 'pointer' }}
                                            >{item.name}</div>
                                        </div>
                                    )
                                })
                            }

                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language10: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));