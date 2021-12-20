import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss'
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';


const mdParser = new MarkdownIt(/* Markdown-it options */);

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];



class ManageDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contentHtml: '',
            contentMarkdown: '',
            selectedOption: '',
            desc: '',
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHtml: html,
            contentMarkdown: text,
        })
    }

    handleSaveContentMarkdown = () => {
        console.log('check state: ', this.state);
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
    };

    handleChangeDesc = (event) => {
        this.setState({
            desc: event.target.value
        }, () => {
            console.log('check: ', this.state.desc);
        })
    }
    render() {
        let { selectedOption } = this.state;
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title title'> Create information doctor</div>
                <div className='manage-doctor-content'>
                    <div className='left-content'>
                        <label>Choose Doctor</label>
                        <Select
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={options}
                        />
                    </div>
                    <div className='right-content form-group'>
                        <label>Description:</label>
                        <textarea className='form-control' rows='4'
                            onChange={(event) => this.handleChangeDesc(event)}
                            value={this.state.desc}
                        ></textarea>
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange} />
                    <button className='save-btn'
                        onClick={() => this.handleSaveContentMarkdown()}
                    >Save</button>
                </div>

            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
