import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss'
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';


const mdParser = new MarkdownIt(/* Markdown-it options */);





class ManageDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contentHtml: '',
            contentMarkDown: '',
            selectedOption: '',
            desc: '',
            listDoctors: [],
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors()

    }


    builtDataInputSelect = (data) => {
        let result = []
        let { language } = this.props
        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {}
                let labelEn = `${item.lastName} ${item.firstName}`
                let labelVi = `${item.firstName} ${item.lastName}`

                object.label = language === LANGUAGES.EN ? labelEn : labelVi
                object.id = item.id

                result.push(object)
            })
        }
        return result
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listDoctorsRedux !== this.props.listDoctorsRedux ||
            prevProps.language !== this.props.language) {
            let dataSelect = this.builtDataInputSelect(this.props.listDoctorsRedux)
            this.setState({
                listDoctors: dataSelect
            })
        }

        // if (prevProps.language !== this.props.language) {
        //     let dataSelect = this.builtDataInputSelect(this.props.listDoctorsRedux)
        //     this.setState({
        //         listDoctors: dataSelect
        //     })
        // }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHtml: html,
            contentMarkDown: text,
        })
    }

    handleSaveContentMarkdown = () => {
        this.props.createInfoDoctorActions({
            contentHTML: this.state.contentHtml,
            contentMarkdown: this.state.contentMarkDown,
            description: this.state.desc,
            doctorId: this.state.selectedOption.id
        })
        // this.setState({
        //     selectedOption: this.state.selectedOption.value
        // })
        // console.log('sO: ', this.state.selectedOption);
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
    };

    handleChangeDesc = (event) => {
        this.setState({
            desc: event.target.value
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
                            options={this.state.listDoctors}
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
        listDoctorsRedux: state.admin.listDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        createInfoDoctorActions: (data) => dispatch(actions.createInfoDoctorActions(data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
