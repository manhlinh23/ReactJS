import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { FormattedMessage } from 'react-intl';

class HomeHeader extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className='left-content'>
                            <i class="fas fa-bars"></i>
                            <div className='header-logo'></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b> <FormattedMessage id='homeheader.speciality' /></b></div>
                                <div className='subtitle'><FormattedMessage id='homeheader.searchdoctor' /></div>
                            </div>

                            <div className='child-content'>
                                <div><b> <FormattedMessage id="homeheader.facilities" /></b></div>
                                <div className='subtitle'><FormattedMessage id="homeheader.choooseclinic" /></div>
                            </div>

                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.doctor" /></b></div>
                                <div className='subtitle'><FormattedMessage id="homeheader.gooddoctor" /></div>
                            </div>

                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.packages" /></b></div>
                                <div className='subtitle'><FormattedMessage id="homeheader.packagescheck" /></div>
                            </div>
                        </div>

                        <div className='right-content'>

                            <div className="support">
                                <i class="fas fa-question"></i>
                                <FormattedMessage id='homeheader.navsupport' />
                            </div>
                            <div className='language-vn'>VN</div>
                            <div className='language-en'>EN</div>
                        </div>

                    </div>
                </div>

                <div className="home-header-banner">
                    <div className='title-banner'>
                        <div className='title1'><FormattedMessage id='homeheader.base' /></div>
                        <div className='title2'><FormattedMessage id='homeheader.takecare' /></div>
                    </div>
                    <div className='search'>
                        <i class="fas fa-search"></i>
                        <input type='text' placeholder=''></input>
                    </div>
                    <div className='download-app'>
                        <a href='' className='icon-download-app'>
                            <i class="fab fa-android"></i>
                        </a>
                        <a href='' className='icon-download-app'>
                            <i class="fab fa-app-store-ios"></i>
                        </a>

                    </div>
                    <div className='options'>
                        <div className='bottom-banner'>
                            <div><i class="fas fa-building"></i></div>
                            <div className='bottom-banner-sub'><FormattedMessage id='homeheader.spec' /></div>
                        </div>

                        <div className='bottom-banner'>
                            <div><i class="fas fa-building"></i></div>
                            <div className='bottom-banner-sub'><FormattedMessage id='homeheader.spec' /></div>
                        </div>

                        <div className='bottom-banner'>
                            <div><i class="fas fa-building"></i></div>
                            <div className='bottom-banner-sub'><FormattedMessage id='homeheader.spec' /></div>
                        </div>

                        <div className='bottom-banner'>
                            <div><i class="fas fa-building"></i></div>
                            <div className='bottom-banner-sub'><FormattedMessage id='homeheader.spec' /></div>
                        </div>

                        <div className='bottom-banner'>
                            <div><i class="fas fa-building"></i></div>
                            <div className='bottom-banner-sub'><FormattedMessage id='homeheader.spec' /></div>
                        </div>

                        <div className='bottom-banner'>
                            <div><i class="fas fa-building"></i></div>
                            <div className='bottom-banner-sub'><FormattedMessage id='homeheader.spec' /></div>
                        </div>
                    </div>

                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
