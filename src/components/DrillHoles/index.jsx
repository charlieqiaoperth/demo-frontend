import React, { Component, Fragment } from 'react';
import { fetchAllHoles } from '../../api/holes'
import BlockUi from 'react-block-ui';
import DrillHolesTable from './DrillholesList';


class DrillHolesView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenType: "LARGE",
            drillHoles: [],
            isLoading: false,
            isError: false,
        };
    }

    componentDidMount = () => {
        console.log(this.props.history.id);
        this.setState({ isLoading: true });
        fetchAllHoles().then(
            res => {
                this.setState({ drillHoles: res.documents, isLoading: false });
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

    handleResize = event => {
        if (event.target.innerWidth >= 576) {
            this.setState({
                screenType: "LARGE"
            })
        } else {
            this.setState({
                screenType: "SMALL"
            })
        }
    }
    render() {
        console.log(this.props.params);

        return (
            <Fragment>
                <BlockUi blocking={this.state.isLoading}>
                    {this.isError && <div style={{ color: "red" }}>Warning: {this.state.err}</div>}
                    <div className="mx-2 mt-5">
                        <DrillHolesTable
                            drillHoles={this.state.drillHoles}
                            screenType={this.state.screenType}
                        />
                    </div>
                </BlockUi>
            </Fragment>
        )
    }
}

export default DrillHolesView;