import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from 'react-slick';



class Specialty extends Component {

    render() {

        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Chuyên khoa phổ biến</span>
                        <button className='btn-section'>xem thêm</button>
                    </div>

                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty'></div>
                                <div>Cơ xương khớp</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty'></div>
                                <div>Cơ xương khớp1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty'></div>
                                <div>Cơ xương khớp2</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty'></div>
                                <div>Cơ xương khớp3</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty'></div>
                                <div>Cơ xương khớp4</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty'></div>
                                <div>Cơ xương khớp5</div>
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);