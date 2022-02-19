import { Table } from 'antd'
import 'antd/dist/antd.css';
import moment from 'moment';

import { CDataTable, CRow, CCol, CSelect } from '@coreui/react';
import { useState } from 'react';

const fields = [
  { key: "remark", label: "Remark Notes" },
  { key: "create_by", label: "Created By" },
  { key: "create_date", label: "Created Date" }
]

export const RemarkHistoryTable = ({ data }) => {
  const [filteredRemark, setFilteredRemark] = useState(null)

  const convertDate = (remark) => {
    return (
      <td>
        {moment(remark.create_date).format("DD MMM YYYY HH:mm:ss")}
      </td>
    )
  }

  const filterByMonth = (event) => {
    if(!event.target.value) {
      setFilteredRemark(data)
    } else {
      let start = moment().month(event.target.value).date(1).hours(0).minutes(0).seconds(0).milliseconds(0);
      let end = moment(start).endOf('month')

      let result = data.filter((remark) => {
        let result = moment(remark.create_date).isBetween(start, end)

        return result === true
      })

      setFilteredRemark(result)
    }

  }

  return (
    <>
      <CRow className="justify-content-between">
        <CCol md="12">
          <div className={'d-flex justify-content-end'}>
              <div className={'d-flex align-items-center'}>
                <span style={{width: 100}}>Month :</span>
                <CSelect className={'custom-input__background'} onChange={filterByMonth}>
                  <option value="">Select the month..</option>
                  <option value="0">Januari</option>
                  <option value="1">Februari</option>
                  <option value="2">Maret</option>
                  <option value="3">April</option>
                  <option value="4">Mei</option>
                  <option value="5">Juni</option>
                  <option value="6">Juli</option>
                  <option value="7">Agustus</option>
                  <option value="8">September</option>
                  <option value="9">Oktober</option>
                  <option value="10">November</option>
                  <option value="11">Desember</option>
                </CSelect>
              </div>
          </div>
        </CCol>
      </CRow>
      <CRow className="mt-5">
        <CDataTable
          items={filteredRemark ? filteredRemark : data}
          fields={fields}
          striped
          scopedSlots={{
            "create_date": (remark) => convertDate(remark)
          }}
        />
      </CRow>
      {/* <Table
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
      </Table> */}
    </>
  )
}