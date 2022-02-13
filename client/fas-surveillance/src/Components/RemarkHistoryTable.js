import { Table } from 'antd'
import 'antd/dist/antd.css';
import moment from 'moment';

export const RemarkHistoryTable = ({ data }) => {

  return (
    <>
      <Table
        dataSource={data}
        pagination={{position: ['none','none']}}
        scroll={{ x: 'auto', y: 'auto' }}
      >
        <Table.Column
          title={<strong>Remark</strong>}
          dataIndex="remark"
        />

        <Table.Column
          title={<strong>Create By</strong>}
          dataIndex="create_by"
        />

        <Table.Column
          title={<strong>Create Date</strong>}
          dataIndex="create_date"
          render={(value) => (moment(value).format("DD MMM YYYY HH:mm:ss"))}
        />
      </Table>
    </>
  )
}