import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/pages/Home.vue'
import Login from '../views/pages/Login.vue'
import EmptyPage from "../views/pages/EmptyPage";
import Base from "../views/template/Base";
import AuthStorage from '../utils/auth-storage';
import MyAccount from "../views/pages/MyAccount";
import CompanyConsult from "../views/pages/company/CompanyConsult";
import CompanyCreate from "../views/pages/company/CompanyCreate";
import ContractConsult from "../views/pages/contract/ContractConsult";
import ContractCreate from "../views/pages/contract/ContractCreate";
import MyContractConsult from "../views/pages/my-contract/MyContractConsult";
import MyContractDetail from "../views/pages/my-contract/MyContractDetail";
import AppModuleConsult from "../views/pages/app-module/AppModuleConsult";
import AppModuleCreate from "../views/pages/app-module/AppModuleCreate";
import UserConsult from "../views/pages/user/UserConsult";
import UserCreate from "../views/pages/user/UserCreate";


const ifNotAuthenticated = (to, from, next) => {
    const accessToken = AuthStorage.getStorage("access_token");
    if (accessToken) {
        next("/empty")
    } else {
        next();
    }
}

const ifAuthenticated = (to, from, next) => {
    const accessToken = AuthStorage.getStorage("access_token");
    const isRoleOk = Vue.prototype.$authbus.isAuthorized(to.meta.role)
    if (accessToken && isRoleOk) {
        next()
    } else {
        next('/login');
    }

}

Vue.use(VueRouter)

const routes = [

    {
        path: '/',
        component: Base,
        children: [
            {
                path: '',
                name: 'Home',
                component: Home,
                beforeEnter: ifAuthenticated,
                meta:{role: ["AUTH_ADMIN","AUTH_CLIENT_ADMIN"]}
            },
            {
                path: 'empty',
                name: 'Empty',
                component: EmptyPage,
                beforeEnter: ifAuthenticated,
                meta:{role: ["AUTH_ADMIN","AUTH_CLIENT_ADMIN"]}
            },
            {
                path: 'account',
                name: 'Account',
                component: MyAccount,
                beforeEnter: ifAuthenticated,
                meta:{role: ["AUTH_ADMIN","AUTH_CLIENT_ADMIN"]}

            }

        ]
    },
    {
        path: '/profile',
        component: Base,
        children: [
            {
                path: 'consult',
                name: 'UserConsult',
                component: UserConsult,
                beforeEnter: ifAuthenticated,
                meta:{role: ["AUTH_ADMIN","AUTH_CLIENT_ADMIN"]}

            },
            {
                path: 'create',
                name: 'UserCreate',
                component: UserCreate,
                beforeEnter: ifAuthenticated,
                meta:{role: ["AUTH_ADMIN","AUTH_CLIENT_ADMIN"]}
            },
            {
                path: 'update/:id',
                name: 'UserUpdate',
                component: UserCreate,
                beforeEnter: ifAuthenticated,
                meta:{role: ["AUTH_ADMIN","AUTH_CLIENT_ADMIN"]},
                props: true
            }

        ]
    },
    {
        path: '/company',
        component: Base,
        children: [
            {
                path: 'consult',
                name: 'CompanyConsult',
                component: CompanyConsult,
                beforeEnter: ifAuthenticated,
                meta:{role: ["AUTH_ADMIN"]}

            },
            {
                path: 'create',
                name: 'CompanyCreate',
                component: CompanyCreate,
                beforeEnter: ifAuthenticated,
                meta:{role: ["AUTH_ADMIN"]}

            },
            {
                path: 'update/:id',
                name: 'CompanyUpdate',
                component: CompanyCreate,
                beforeEnter: ifAuthenticated,
                meta:{role: ["AUTH_ADMIN"]},
                props: true
            }

        ]
    },
    {
        path: '/contract',
        component: Base,
        children: [
            {
                path: 'consult',
                name: 'ContractConsult',
                component: ContractConsult,
                beforeEnter: ifAuthenticated,
                meta:{role: ["AUTH_ADMIN"]}
            },
            {
                path: 'create',
                name: 'ContractCreate',
                component: ContractCreate,
                beforeEnter: ifAuthenticated,
                meta:{role: ["AUTH_ADMIN"]}
            },
            {
                path: 'update/:id',
                name: 'ContractUpdate',
                component: ContractCreate,
                beforeEnter: ifAuthenticated,
                meta:{role: ["AUTH_ADMIN"]},
                props: true,
            }

        ]
    },
    {
        path: '/my-contracts',
        component: Base,
        children: [
            {
                path: 'consult',
                name: 'MyContractConsult',
                component: MyContractConsult,
                beforeEnter: ifAuthenticated,
                meta:{role: ["AUTH_CLIENT_ADMIN"]},
            },
            {
                path: 'detail/:id',
                name: 'MyContractDetail',
                component: MyContractDetail,
                beforeEnter: ifAuthenticated,
                meta:{role: ["AUTH_CLIENT_ADMIN"]},
                props: true
            }

        ]
    },
    {
        path: '/module',
        component: Base,
        children: [
            {
                path: 'consult',
                name: 'ModuleConsult',
                component: AppModuleConsult,
                beforeEnter: ifAuthenticated,
                meta:{role: ["AUTH_ADMIN"]}
            },
            {
                path: 'create',
                name: 'ModuleCreate',
                component: AppModuleCreate,
                beforeEnter: ifAuthenticated,
                meta:{role: ["AUTH_ADMIN"]}
            },
            {
                path: 'update/:id',
                name: 'AppModuleUpdate',
                component: AppModuleCreate,
                beforeEnter: ifAuthenticated,
                meta:{role: ["AUTH_ADMIN"]},
                props: true
            }

        ]
    },

    {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter: ifNotAuthenticated,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
