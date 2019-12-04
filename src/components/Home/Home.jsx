import React from 'react';
import { Link } from 'react-router-dom';
import { fetchAllHoles } from '../../api/holes'
import { Statistic, Row, Col, Icon } from 'antd';
import BlockUi from 'react-block-ui';
import imgUrl from './list.png';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drillHoles: [],
            isLoading: false,
        };
    }
    componentDidMount() {
        this.setState({ isLoading: true });
        fetchAllHoles().then(
            res => {
                this.setState({ drillHoles: res.documents, isLoading: false });
            }
        ).catch(err => {
            this.setState({ err: err, isLoading: false });
            console.log(err)
        })
    }


    render() {
        return (
            <BlockUi blocking={this.props.isLoading}>
                <div id="home-page">
                    <h4 className="text-center mb-5">DATA DASHBOARD</h4>
                    <Row gutter={16} align="bottom">
                        <Col xs={24} md={12}>
                            <Row>
                                <Col span={8}>
                                    <img className="img-cover" src={imgUrl} alt="total numbers of drill holes" />
                                </Col>
                                <Col span={14} offset={2}>
                                    <Link
                                        to='/holes'
                                    >
                                        {this.state.drillHoles.length > 0 &&
                                            <Statistic
                                                title="Total drill holes"
                                                value={this.state.drillHoles.length}
                                                valueStyle={{ color: '#3f8600' }}
                                                prefix={<Icon type="arrow-up" />}
                                            />
                                        }
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </BlockUi>
        )
    }
}

export default Home;