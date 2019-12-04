
import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';


export default class DrillHolesTable extends React.Component {

    screenType = this.props.screenType;
    columns = [
        {
            title: 'HolesId',
            dataIndex: 'holesId',
            key: 'holesId',
            render: (text, record) => (
                <span>
                    <Link
                        to={{
                            pathname: `/holes/${text}`,
                        }}>{text}
                    </Link>
                </span>
            ),
        },
        {
            title: 'Latitude',
            dataIndex: 'latitude',
            key: 'latitude',
        },
        {
            title: 'Longitude',
            dataIndex: 'longitude',
            key: 'longitude',
        },
        {
            title: 'Dip',
            dataIndex: 'dip',
            key: 'dip',
            render: (text, record) => (
                <span>
                    {-text}
                </span>
            ),
        },
        {
            title: 'Azimuth',
            dataIndex: 'azimuth',
            key: 'azimuth',
        },
        // {
        //     title: 'Action',
        //     dataIndex: 'bookId',
        //     key: 'action',
        //     render: (text, record) => (
        //         <span>
        //             <Link
        //                 to={{
        //                     pathname: `/holes/readings`,
        //                 }}>Details
        //             </Link>
        //         </span>
        //     ),
        // },
    ];
    render() {
        return (

            <div><Table columns={this.columns} dataSource={this.props.drillHoles} rowKey="_id" />,
       </div>

        );
    }
}



