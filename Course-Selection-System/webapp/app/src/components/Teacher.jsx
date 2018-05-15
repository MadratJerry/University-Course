import EditableTable from './EditableTable'

export default EditableTable({
  name: 'teacher',
  titleName: '老师',
  columns: [
    {
      title: '工号',
      dataIndex: 'teacherId',
      inputType: { type: 'input' },
    },
    {
      title: '姓名',
      dataIndex: 'teacherName',
      inputType: { type: 'input' },
    },
    {
      title: '性别',
      dataIndex: 'teacherGender',
      inputType: { type: 'select', options: new Map([['男', '男'], ['女', '女']]) },
    },
    {
      title: '生日',
      dataIndex: 'teacherBirth',
      inputType: { type: 'date' },
    },
    {
      title: '所属学院',
      dataIndex: 'collegeId',
      inputType: { type: 'select', options: new Map(), from: 'college' },
    },
    {
      title: '手机',
      dataIndex: 'teacherPhone',
      inputType: { type: 'input' },
    },
    {
      title: '密码',
      dataIndex: 'teacherPassword',
      inputType: { type: 'password' },
    },
  ],
})
