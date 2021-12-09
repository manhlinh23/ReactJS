import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from 'react-slick';

class HanBook extends Component {

    render() {

        return (
            <div className='section-share section-hanbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cẩm nang</span>
                        <button className='btn-section'>xem thêm</button>
                    </div>

                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image section-hanbook'></div>
                                <div>Phòng khám đa khoa Singapore Indochina Healthcare Group</div>
                            </div>

                            <div className='section-customize'>
                                <div className='bg-image section-hanbook'></div>
                                <div>Phòng khám đa khoa Singapore Indochina Healthcare Group</div>
                            </div>

                            <div className='section-customize'>
                                <div className='bg-image section-hanbook'></div>
                                <div>Phòng khám đa khoa Singapore Indochina Healthcare Group</div>
                            </div>

                            <div className='section-customize'>
                                <div className='bg-image section-hanbook'></div>
                                <div>Phòng khám đa khoa Singapore Indochina Healthcare Group</div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HanBook);
