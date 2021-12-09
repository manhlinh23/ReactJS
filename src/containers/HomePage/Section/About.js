import React, { Component } from 'react';
import { connect } from 'react-redux';

class About extends Component {

    render() {

        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyền thông nói gì về Mạnh Linh
                </div>

                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="400" src="https://www.youtube.com/embed/NZfwTOognFQ"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                        </iframe>
                    </div>

                    <div className='content-right'>
                        <p>"Chúng ta phải học, phải cố gắng học nhiều. Không chịu khó học thì không tiến bộ được. Không tiến bộ là thoái bộ. Xã hội càng đi tới, công việc càng nhiều, máy móc càng tinh xảo. Mình không chịu học thì lạc hậu, mà lạc hậu là bị đào thải, tự mình đào thải mình" - Hồ Chí Minh</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
