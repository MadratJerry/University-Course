import EditableTable from './EditableTable'

export default EditableTable({
  name: 'course',
  titleName: '课程',
  columns: [
    {
      title: '课程代码',
      dataIndex: 'courseId',
      inputType: { type: 'input' },
    },
    {
      title: '课程名称',
      dataIndex: 'courseName',
      inputType: { type: 'input' },
    },
    {
      title: '课程学时',
      dataIndex: 'courseHour',
      inputType: { type: 'input' },
    },
    {
      title: '课程学分',
      dataIndex: 'courseCredit',
      inputType: { type: 'input' },
    },
    {
      title: '课程简介',
      dataIndex: 'courseSummary',
      inputType: { type: 'input' },
    },
    {
      title: '开课时间',
      dataIndex: 'courseBeginTime',
      inputType: { type: 'date' },
    },
    {
      title: '授课老师',
      dataIndex: 'teacherId',
      inputType: { type: 'select', options: new Map(), from: 'teacher' },
    },
  ],
})
