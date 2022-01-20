import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getClinic } from '../../../services/userService'
import Slider from 'react-slick';
import { withRouter } from 'react-router'
import { useHistory } from "react-router-dom";


class MedicalFacility extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrClinic: []
        }
    }

    async componentDidMount() {
        let res = await getClinic()
        this.setState({
            arrClinic: res.data
        })
    }

    handleViewDetailDoctor = (item) => {
        this.props.history.push(`/detail-clinic/${item.id}`)
    }
    render() {
        let { arrClinic } = this.state
        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cơ sở y tế nổi bật</span>
                        <button className='btn-section'>xem thêm</button>
                    </div>

                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {arrClinic && arrClinic.length > 0 &&
                                arrClinic.map((item, index) => {
                                    return (
                                        <div className='section-customize' key={index}>
                                            <div
                                                onClick={() => this.handleViewDetailDoctor(item)}
                                                style={{ backgroundImage: `url(${item.image})`, cursor: 'pointer' }}
                                                className='bg-image section-medical-facility'></div>
                                            <div>{item.name}</div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
