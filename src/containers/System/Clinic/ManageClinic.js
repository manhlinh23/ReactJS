import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageClinic.scss'
import MarkdownIt from 'markdown-it';
import { CommonUtils } from '../../../utils'
import MdEditor from 'react-markdown-editor-lite';
import { createClinic } from '../../../services/userService'
import { toast } from "react-toastify";


const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageClinic extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            imageBase64: '',
            contentHTML: '',
            contentMarkDown: '',
            address: '',
        }
    }

    async componentDidMount() {
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
    }


    handleChangeImage = async (event) => {
        let data = event.target.files //lay file
        let file = data[0] //lay file anh dau tien
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imageBase64: base64,
            })
        }
    }

    handleOnchangeInput = (e, id) => {
        let cpState = { ...this.state }
        cpState[id] = e.target.value
        this.setState({
            ...cpState
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkDown: text,
        })
    }

    handleSave = async () => {
        console.log('save', this.state);
        let res = await createClinic(this.state)
        if (res && res.errCode == 0) {
            toast.success("Succeed");
            this.setState({
                name: '',
                imageBase64: '',
                contentHTML: '',
                contentMarkDown: '',
                address: '',
            })
        } else {
            toast.warn("Failed");
        }
    }

    render() {
        return (
            <>
                <div className='manage-specialty-container'>
                    <div className='title'>manage clinic</div>
                    <div className='manage-specialty-content row'>
                        <div className='col-6 form-group'>
                            <label>Name of clinic</label>
                            <input
                                value={this.state.name}
                                onChange={(e) => this.handleOnchangeInput(e, 'name')}
                                className='form-control' type='text' />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Picture of clinic</label>
                            <input
                                onChange={(event) => this.handleChangeImage(event)}
                                className='form-control-file' type='file' />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Address of clinic</label>
                            <input
                                value={this.state.address}
                                onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                className='form-control' type='text' />
                        </div>
                        <div className='col-12 form-group'>
                            <MdEditor style={{ height: '500px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.contentMarkDown} //set default value
                            />
                        </div>
                    </div>
                    <button
                        onClick={() => this.handleSave()}
                        className='btn btn-secondary '>SAVE</button>
                </div>


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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);


