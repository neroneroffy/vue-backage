<template>
    <div class="role">

    </div>
</template>

<script>
  import { Menu } from 'iview';

  export default {
        name: "role",
        pageSizeList:[30,50,100],
        pageSize:30,
        currentPage:1,
        visible:false,
        loading:true,
        searchContent: {
          id: '',
          account: '',
          phone:"",
          role:""
        },
        roleList: [
          {
            value: '',
            label: '请选择角色'
          },
          {
            value: 'role1',
            label: '角色1'
          },
          {
            value: 'role2',
            label: '角色2'
          },
          {
            value: 'role3',
            label: '角色3'
          },
          {
            value: 'role4',
            label: '角色4'
          }
        ],
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: 'ID',
            key: 'id',
            width:180

          },
          {
            title: '账户',
            key: 'account',

          },
          {
            title: '头像',
            key: 'avatar',
            width:100,
            render: (h, params) => {
              return h('div', [
                h('Avatar', {
                  props: {
                    shape:"square",
                    src: `${params.row.avatar}`,
                    //
                    icon:"person"
                  },
                  style: {
                    width: '50px',
                    height:'50px',
                    margin:'5px 0',
                    lineHeight:"50px",
                    fontSize:"30px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }),
              ]);
            }
          },
          {
            title: '角色',
            key: 'roleName',
          },
          {
            title: '电话',
            key: 'phone',

          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params)
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.edit(params)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.remove(params)
                    }
                  }
                }, '删除'),
                h('Button', {
                  props: {
                    size: 'small'
                  },
                  class:"status",
                  style:{
                    background:params.row.status?"#13D149":"#ccc",
                    color:"#fff"
                  },
                  on: {
                    click: () => {
                      this.statusEdit(params)
                    }
                  }
                },params.row.status?"禁用": '启用')
              ]);
            }
          }
        ],
        formValidate: {
          id: '',
          account: '',
          roleId:"",
          phone: '',
          avatarUrl:"",
          remark:""
         },

  }
</script>

<style lang="stylus">
  @import './role.styl'
</style>
