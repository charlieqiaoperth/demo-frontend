
import React from 'react';
import { Table, Tag } from 'antd';


export default class DeathReadingTable extends React.Component {
    data = this.props.depthReadings;
    onClickUpdate = this.props.onClickUpdate;
    dipAverage = arr => arr.reduce(
        (acc, val) => acc + val.dip, 0
    ) / arr.length;
    isCorrect = (index) => {
        const correct = {
            result: "True",
            color: "green",
        }
        const inCorrect = {
            result: "False",
            color: "red",
        }
        if (index > 0) {
            return Math.abs(this.data[index].azimuth - this.data[index - 1].azimuth) < 5 ? correct : inCorrect;

        }
        if (index > 5) {
            const dipArry = this.data.slice(index - 5, index);
            return Math.abs(this.dipAverage(dipArry) - this.data[index].dip) < 3 ? correct : inCorrect;
        }
        else return correct;
    }

    columns = [
        {
            title: 'Depth(m)',
            dataIndex: 'depth',
            key: 'depth',
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
        {
            title: 'Result',
            dataIndex: 'depth',
            key: 'result',
            render: (text, record, index) => (
                <span>

                    <Tag color={this.isCorrect(index).color}>
                        {this.isCorrect(index).result}
                    </Tag>


                </span>
            ),
        },
        // {
        //     title: 'Operation',
        //     dataIndex: 'depth',
        //     key: 'operation',
        //     render: (text, record) => (
        //         <span>
        //             <a
        //                 onClick={() => this.onClickUpdate(text)}
        //             >
        //                 Edit
        //             </a>
        //         </span>
        //     ),
        // },
    ];
    render() {
        return (
            <div>
                <p className="depthReading-title">Drill Holes Id: {this.props.holesId}</p>
                <Table columns={this.columns} dataSource={this.props.depthReadings} pagination={{ pageSize: 25 }} rowKey="depth" onRow={record => { return { onClick: event => { this.onClickUpdate(record.depth) }, } }} />,
            </div>

        );
    }
}



