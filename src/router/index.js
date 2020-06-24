import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/pages/Home.vue'
import Login from '../views/pages/Login.vue'
import About from "../views/pages/About";
import EmptyPage from "../views/pages/EmptyPage";
import Base from "../views/template/Base";
import AuthStorage from '../utils/auth-storage';
import MyAccount from "../views/pages/MyAccount";


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
    if (accessToken) {
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
            },
            {
                path: 'about',
                name: 'About',
                component: About,
                beforeEnter: ifAuthenticated,
            },
            {
                path: 'empty',
                name: 'Empty',
                component: EmptyPage,
                beforeEnter: ifAuthenticated,
            },
            {
                path: 'account',
                name: 'Account',
                component: MyAccount,
                beforeEnter: ifAuthenticated,
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
