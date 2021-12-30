import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss'
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailDoctor } from '../../../services/userService'

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
            hasOldData: false,
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
        let { hasOldData } = this.state
        this.props.createInfoDoctorActions({
            contentHTML: this.state.contentHtml,
            contentMarkdown: this.state.contentMarkDown,
            description: this.state.desc,
            doctorId: this.state.selectedOption.id,
            //neu da co data thi se 'update' con chua co thi 'create'
            action: hasOldData === true ? CRUD_ACTIONS.UPDATE : CRUD_ACTIONS.CREATE
        })
        console.log('check ', this.state);
        // this.setState({
        //     selectedOption: this.state.selectedOption.value
        // })
        // console.log('sO: ', this.state.selectedOption);
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let res = await getDetailDoctor(selectedOption.id)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkDown: markdown.contentMarkdown,
                desc: markdown.description,
                hasOldData: true,
            })
            console.log('check ', this.state);
        } else {
            this.setState({
                contentHTML: '',
                contentMarkDown: '',
                desc: '',
                hasOldData: false,
            })
        }
        console.log(res);
    };

    handleChangeDesc = (event) => {
        this.setState({
            desc: event.target.value
        })
    }
    render() {
        let { hasOldData } = this.state
        let { selectedOption } = this.state;
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title title'> Create information doctor</div>
                <div className='manage-doctor-content'>
                    <div className='left-content'>
                        <label>Choose Doctor</label>
                        <Select
                            value={selectedOption}
                            onChange={this.handleChangeSelect}
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
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkDown} //set default value 
                    />
                    <button className={hasOldData === true ? 'save-btn' : 'create-btn'}
                        onClick={() => this.handleSaveContentMarkdown()}
                    >
                        {hasOldData === true ?
                            <span>SAVE</span>
                            :
                            <span>CREATE</span>}
                    </button>
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
