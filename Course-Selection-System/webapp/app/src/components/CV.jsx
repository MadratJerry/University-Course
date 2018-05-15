import EditableTable from './EditableTable'

const cvConfig = {
  name: 'cv',
  titleName: '选课',
  columns: [
    {
      title: '选课代码',
      dataIndex: 'cvId',
      inputType: { type: 'input' },
    },
    {
      title: '课程代码',
      dataIndex: 'courseId',
      inputType: { type: 'select', options: new Map(), from: 'course' },
    },
    {
      title: '学生学号',
      dataIndex: 'studentId',
      inputType: { type: 'input' },
    },
    {
      title: '课程得分',
      dataIndex: 'cvScore',
      inputType: { type: 'input' },
    },
  ],
}

export default EditableTable(cvConfig)
export { cvConfig }
