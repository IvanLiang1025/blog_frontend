import React from "react";
import HomeLayout from "@/pages/Layout/HomeLayout";
import AdminLayout from "@/Layout/AdminLayout";

// import Blog from "@/pages/Admin/Blog";
// import Category from "@/pages/Admin/Category";

// const AdminLayout = React.lazy(() => import("@/pages/Layout/AdminLayout"));
const BlogEdit = React.lazy(() => import("@/pages/Admin/Blog/BlogForm"));
const Blog = React.lazy(() => import("@/pages/Admin/Blog"));
const Category = React.lazy(() => import("@/pages/Admin/Category"));
// const Dashboard = React.lazy(() =>import("@/pages/Admin/Dashboard"));
const Login = React.lazy(() => import("@/pages/login/login"));


// const HomeLayout = React.lazy(() => import("@/pages/Layout/HomeLayout"));
const Home = React.lazy(() => import("@/pages/Home"));
const HomeCategory = React.lazy(() => import("@/pages/Category"));
const BlogDetail = React.lazy(() => import("@/pages/Detail"));
const Archive = React.lazy(() => import("@/pages/Archive"));
const AboutMe = React.lazy(() => import("@/pages/AboutMe"));

export default [
    {
        path: '/admin',
        key: '/admin',
        component: AdminLayout,
        // component: Dashboard,
        routes:[
            // {path: '/admin', exact: true, redirect: '/admin/blog'},
            {
                path: "/admin/blog/edit/:id",
                component: BlogEdit,
                auth: true,
            },
            {
                path: "/admin/blog/edit", 
                component: BlogEdit,
                auth: true,
            },
            {
                path: '/admin/blog', 
                component: Blog, 
                auth: true,
            },
            
            {
                path: '/admin/category',
                key: '/admin/category',
                component: Category,
                auth: true
            },

        
        ]
    },
    {
        path: '/',
        component: HomeLayout,
        key: "homeLayout",
        routes: [
            {
                path: '/login',
                component: Login,
                key: "login"
            },
            {
                path: "/about",
                component: AboutMe,
                key: 'aboutMe'
            },
            {
                path: "/category",
                component: HomeCategory,
                key: "homeCategory"
            },
            {
                path: "/blog/detail/:id",
                component: BlogDetail,
                key: "blogDetail"
            },
            {
                path: "/archive",
                component: Archive,
                key: "archive"
            },
            {
                path: '/',
                component: Home,
                exact: true,
                key: "defaultHome"
            },
            {
                path: '/home',
                component: Home,
                exact: true,
                key: "home"
            }
        ]

    }
    // {
    //     path: '/login',
    //     component: Login,
    //     key: "login"
    // },
    // {
    //     path: "/category",
    //     component: HomeCategory,
    //     key: "homeCategory"
    // },
    // {
    //     path: "/blog/detail/",
    //     component: BlogDetail,
    //     key: "blogDetail"
    // },
    // {
    //     path: "/archive",
    //     component: Archive,
    //     key: "archive"
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     exact: true,
    //     key: "defaultHome"
    // },
    // {
    //     path: '/home',
    //     component: Home,
    //     exact: true,
    //     key: "home"
    // }
]