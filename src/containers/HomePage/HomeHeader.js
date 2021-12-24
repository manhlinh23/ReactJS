import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils'
import { withRouter } from 'react-router'
import { changeLanguageApp } from '../../store/actions'

class HomeHeader extends Component {


    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    goHome = () => {
        this.props.history.push(`/home`) //link dan ve home
    }

    render() {
        let language3 = this.props.language10
        console.log('check language of language 3: ', this.props.language10)
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <div className='header-logo' onClick={() => this.goHome()}></div>
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
                                <i className="fas fa-question"></i>
                                <FormattedMessage id='homeheader.navsupport' />
                            </div>
                            <div className={language3 === LANGUAGES.VI ? 'language-vi action' : 'language-vi'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                                    VN
                                </span>
                            </div>
                            <div className={language3 === LANGUAGES.EN ? 'language-en action' : 'language-en'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                                    EN
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
                {/* neu isShowBanner la true -> render div banner */}
                {this.props.isShowBanner === true &&
                    <div className="home-header-banner">
                        <div className='title-banner'>
                            <div className='title1'><FormattedMessage id='homeheader.base' /></div>
                            <div className='title2'><FormattedMessage id='homeheader.takecare' /></div>
                        </div>
                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <input type='text' placeholder=''></input>
                        </div>
                        <div className='download-app'>
                            <a href='' className='icon-download-app'>
                                <i className="fab fa-android"></i>
                            </a>
                            <a href='' className='icon-download-app'>
                                <i className="fab fa-app-store-ios"></i>
                            </a>

                        </div>
                        <div className='options'>
                            <div className='bottom-banner'>
                                <div><i className="fas fa-building"></i></div>
                                <div className='bottom-banner-sub'><FormattedMessage id='homeheader.spec' /></div>
                            </div>

                            <div className='bottom-banner'>
                                <div><i className="fas fa-building"></i></div>
                                <div className='bottom-banner-sub'><FormattedMessage id='homeheader.spec' /></div>
                            </div>

                            <div className='bottom-banner'>
                                <div><i className="fas fa-building"></i></div>
                                <div className='bottom-banner-sub'><FormattedMessage id='homeheader.spec' /></div>
                            </div>

                            <div className='bottom-banner'>
                                <div><i className="fas fa-building"></i></div>
                                <div className='bottom-banner-sub'><FormattedMessage id='homeheader.spec' /></div>
                            </div>

                            <div className='bottom-banner'>
                                <div><i className="fas fa-building"></i></div>
                                <div className='bottom-banner-sub'><FormattedMessage id='homeheader.spec' /></div>
                            </div>

                            <div className='bottom-banner'>
                                <div><i className="fas fa-building"></i></div>
                                <div className='bottom-banner-sub'><FormattedMessage id='homeheader.spec' /></div>
                            </div>
                        </div>

                    </div>
                }
            </React.Fragment>
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
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));