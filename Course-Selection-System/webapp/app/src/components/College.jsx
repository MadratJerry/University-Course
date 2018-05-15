import EditableTable from './EditableTable'

const collegeConfig = {
  name: 'college',
  titleName: '学院',
  columns: [
    {
      title: '学院代码',
      dataIndex: 'collegeId',
      inputType: { type: 'input' },
    },
    {
      title: '学院名称',
      dataIndex: 'collegeName',
      inputType: { type: 'input' },
    },
    {
      title: '院长',
      dataIndex: 'collegeHeadId',
      inputType: { type: 'select', options: new Map(), from: 'teacher' },
    },
    {
      title: '学院简介',
      dataIndex: 'collegeSummary',
      inputType: { type: 'input' },
    },
  ],
}

export default EditableTable(collegeConfig)
export { collegeConfig }
