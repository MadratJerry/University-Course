import EditableTable from './EditableTable'

export default EditableTable({
  name: 'student',
  titleName: '学生',
  columns: [
    {
      title: '学号',
      dataIndex: 'studentId',
      inputType: { type: 'input' },
    },
    {
      title: '姓名',
      dataIndex: 'studentName',
      inputType: { type: 'input' },
    },
    {
      title: '性别',
      dataIndex: 'studentGender',
      inputType: { type: 'select', options: new Map([['男', '男'], ['女', '女']]) },
    },
    {
      title: '生日',
      dataIndex: 'studentBirth',
      inputType: { type: 'date' },
    },
    {
      title: '专业',
      dataIndex: 'majorId',
      inputType: { type: 'select', options: new Map(), from: 'major' },
    },
    {
      title: '密码',
      dataIndex: 'studentPassword',
      inputType: { type: 'password' },
    },
  ],
})
