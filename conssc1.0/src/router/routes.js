import Operation from 'pages/Operation'
import AdminHouseware from 'pages/AdminHouseware'
import FinAnalysis from 'pages/FinAnalysis'
import FinCash from 'pages/FinCash'
import HrTest from 'pages/HrTest'
import PersonalInfo from 'pages/PersonalInfo'
import ProductHouseware from 'pages/ProductHouseware'
import ProjectPlan from 'pages/ProjectPlan'
import ProjectAnalysis from 'pages/ProjectAnalysis'
import UserList from 'pages/UserList'
import MainLayout from 'layouts/MainLayout'
import OrgTree from 'pages/OrgTree'
import Patent from 'pages/Patent'
import ProjectList from 'pages/ProjectList'
import UserContract from 'pages/UserContract'
import Contract from 'pages/Contract'
import Login from 'pages/login'
import Register from 'pages/register'
import InnerAdmin from 'pages/InnerAdmin'
import MyForm from 'pages/MyForm'
import Notice from 'pages/Notice'

const routes = [
  {
    path: '/',
    component: MainLayout,
    redirect: '/Operation',
    children: [
      {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
          redirectAlreadyLogin: false,
          requiredLogin: false
        }
      },
      {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
          redirectAlreadyLogin: true,
          requiredLogin: false
        }
      },
      {
        path: '/MyForm',
        name: 'MyForm',
        component: MyForm
      },
      {
        path: '/Operation',
        name: 'Operation',
        component: Operation,
        meta: {
          requiredLogin: true
        }
      },
      {
        path: '/OrgTree',
        component: OrgTree,
        meta: {
          requiredLogin: true
        }
      },
      {
        path: '/AdminHouseware',
        component: AdminHouseware,
        meta: {
          requiredLogin: true
        }
      },
      {
        path: '/Contract',
        component: Contract,
        meta: {
          requiredLogin: true
        }
      },
      {
        path: '/FinAnalysis',
        component: FinAnalysis,
        meta: {
          requiredLogin: true
        }
      },
      {
        path: '/FinCash',
        component: FinCash,
        meta: {
          requiredLogin: true
        }
      },
      {
        path: '/HrTest',
        component: HrTest,
        meta: {
          requiredLogin: false
        }
      },
      {
        path: '/ProductHouseware',
        component: ProductHouseware,
        meta: {
          requiredLogin: true
        }
      },
      {
        path: '/ProjectList',
        component: ProjectList,
        meta: {
          requiredLogin: true
        }
      },
      {
        path: '/ProjectBoard',
        name: 'ProjectBoard',
        component: ProjectPlan,
        meta: {
          requiredLogin: true
        }
      },
      {
        path: '/ProjectAnalysis',
        component: ProjectAnalysis,
        meta: {
          requiredLogin: true
        }
      },
      {
        path: '/UserList',
        component: UserList,
        meta: {
          requiredLogin: true
        }
      },
      {
        path: '/UserContract',
        component: UserContract,
        meta: {
          requiredLogin: true
        }
      },
      {
        path: '/Notice',
        component: Notice,
        meta: {
          requiredLogin: true
        }
      },
      {
        path: '/PersonalInfo',
        name: 'PersonalInfo',
        component: PersonalInfo,
        meta: {
          requiredLogin: true
        }
      },
      {
        path: '/InnerAdmin',
        component: InnerAdmin,
        meta: {
          requiredLogin: true
        }
      },
      {
        path: '/Patent',
        component: Patent,
        meta: {
          requiredLogin: true
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
