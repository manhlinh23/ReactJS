import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    initFacebookSDK() {
        if (window.FB) {
            window.FB.XFBML.parse();
        }

        let { language } = this.props;
        let locale = language === 'vi' ? 'vi_VN' : 'en_US'
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: process.env.REACT_APP_FACEBOOK_APP,
                cookie: true,  // enable cookies to allow the server to access
                // the session
                xfbml: true,  // parse social plugins on this page
                version: 'v2.5' // use version 2.1
            });
        };
        // Load the SDK asynchronously
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = `//connect.facebook.net/en_US/sdk.js`;
            // js.src = `https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v12.0&appId=962234828033125&autoLogAppEvents=1`;
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
    componentDidMount() {
        this.initFacebookSDK()
    }

    render() {
        let { dataHref, width, numPost } = this.props
        return (
            <div>
                <div class="fb-comments" data-href='https://developers.facebook.com/docs/plugins/comments#configurator' data-width="100%" data-numposts="5"></div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);