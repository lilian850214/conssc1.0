import Operation from 'pages/Operation'
import AdminHouseware from 'pages/AdminHouseware'
import FinAnalysis from 'pages/FinAnalysis'
import FinCash from 'pages/FinCash'
import HrTest from 'pages/HrTest'
import PersonalInfo from 'pages/PersonalInfo'
import ProductHouseware from 'pages/ProductHouseware'
import ProjectBoard from 'pages/ProjectBoard'
import ProjectAnalysis from 'pages/ProjectAnalysis'
import UserList from 'pages/UserList'
import MainLayout from 'layouts/MainLayout'

const routes = [
  {
    path: '/',
    component: MainLayout,
    redirect: '/Operation',
    children: [
      {
        path: '/Operation',
        component: Operation
      },
      {
        path: '/AdminHouseware',
        component: AdminHouseware
      },
      {
        path: '/FinAnalysis',
        component: FinAnalysis
      },
      {
        path: '/FinCash',
        component: FinCash
      }, {
        path: '/HrTest',
        component: HrTest
      },
      {
        path: '/ProductHouseware',
        component: ProductHouseware
      },
      {
        path: '/ProjectBoard',
        component: ProjectBoard
      },
      {
        path: '/ProjectAnalysis',
        component: ProjectAnalysis
      },
      {
        path: '/UserList',
        component: UserList
      },
      {
        path: '/PersonalInfo',
        component: PersonalInfo
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
