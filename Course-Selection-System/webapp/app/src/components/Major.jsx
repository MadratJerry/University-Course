import EditableTable from './EditableTable'

export default EditableTable({
  name: 'major',
  titleName: '专业',
  columns: [
    {
      title: '专业代码',
      dataIndex: 'majorId',
      inputType: { type: 'input' },
    },
    {
      title: '专业名称',
      dataIndex: 'majorName',
      inputType: { type: 'input' },
    },
    {
      title: '系主任',
      dataIndex: 'instructorId',
      inputType: { type: 'select', options: new Map(), from: 'teacher' },
    },
    {
      title: '所属学院',
      dataIndex: 'collegeId',
      inputType: { type: 'select', options: new Map(), from: 'college' },
    },
    {
      title: '专业简介',
      dataIndex: 'majorSummary',
      inputType: { type: 'input' },
    },
  ],
})
