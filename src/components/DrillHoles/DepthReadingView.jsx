import React, { Component, Fragment } from 'react';
import { fetchHoleById } from '../../api/holes'
import BlockUi from 'react-block-ui';
import DepthReadingTable from './DepthReadingList';
import CreateAndUpdateModal from '../common/CreateAndUpdateModal';

class HolesView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenType: "LARGE",
            depthReadings: [],
            isLoading: false,
            isError: false,
            modalType: "Update",
            modalTitle: 'DepthReading',
            modalInputList: ['depth', 'dip', 'azimuth'],
            modalInputValue: {
                depth: '',
                dip: '',
                azimuth: '',
            },
            isShowModal: false,
            errorInfo: "",
            selectedDocumentID: "",
        };
    }

    componentDidMount = () => {
        this.setState({ isLoading: true });
        fetchHoleById(this.props.match.params.id).then(
            res => {
                this.setState({ depthReadings: res.data.depthReading, isLoading: false });
                console.log(this.state.depthReadings)
            }

        ).catch(err => {
            this.setState({ isError: true, err: err, isLoading: false });
            console.log(err)
        })
        window.addEventListener('resize', this.handleResize);
        if (window.innerWidth < 576) {
            this.setState({
                screenType: "SMALL"
            })
        }
    }

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.handleResize);
    }

    handleHideModal = () => {
        this.setState({
            isShowModal: false
        })
    }

    handleSubmitModal = event => {
        event.preventDefault();
        this.setState({
            isShowModal: false,
        });
    }
    handleShowUpdateModal = depthReading => {
        const selectedDocuments = this.state.depthReadings.filter(item => item.depth === depthReading)
        const { depth, dip, azimuth } = selectedDocuments[0];
        this.setState({
            modalType: "UPDATE",
            modalInputValue: { depth, dip, azimuth },
            selectedDocumentID: depthReading,
            isShowModal: true,
        });
    }
    handleModalInputChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({
            modalInputValue: { ...this.state.modalInputValue, [name]: value }
        })
    }
    render() {
        const {
            modalType,
            modalTitle,
            modalInputList,
            modalInputValue,
            errorInfo,
            isShowModal,
        } = this.state;
        return (
            <Fragment>
                <BlockUi blocking={this.state.isLoading}>
                    <CreateAndUpdateModal
                        isShow={isShowModal}
                        type={modalType}
                        title={modalTitle}
                        inputList={modalInputList}
                        inputValue={modalInputValue}
                        errorInfo={errorInfo}
                        onInputChange={this.handleModalInputChange}
                        onCancel={this.handleHideModal}
                        onSubmit={this.handleSubmitModal}
                    />
                    {this.isError && <div style={{ color: "red" }}>Warning: {this.state.err}</div>}
                    <div className="mx-2 mt-5">
                        {
                            this.state.depthReadings.length > 0 &&
                            < DepthReadingTable
                                holesId={this.props.match.params.id}
                                onClickUpdate={this.handleShowUpdateModal}
                                depthReadings={this.state.depthReadings}
                            />
                        }
                    </div>
                </BlockUi>
            </Fragment>
        )
    }
}
export default HolesView;