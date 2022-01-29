import React from "react";
import HomeLayout from "@/pages/Layout/HomeLayout";
import AdminLayout from "@/pages/Layout/AdminLayout";
import NotFound from "@/Components/NotFound";

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
const Comment = React.lazy(() => import("@/pages/Admin/Comment"));

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
                exact: true,
                auth: true,
            },
            {
                path: "/admin/blog/edit", 
                component: BlogEdit,
                exact: true,
                auth: true,
            },
            {
                path: '/admin/blog', 
                component: Blog, 
                exact: true,
                auth: true,
            },
            
            {
                path: '/admin/category',
                key: '/admin/category',
                component: Category,
                exact: true,
                auth: true
            },

            {
                path: '/admin/comment',
                key: '/admin/comment',
                component: Comment,
                exact: true,
                auth: true
            },
            {
                path: "*",
                key: "404",
                component: NotFound
            }

        
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
                exact: true,
                key: "login"
            },
            {
                path: "/about",
                component: AboutMe,
                exact: true,
                key: 'aboutMe'
            },
            {
                path: "/category",
                component: HomeCategory,
                exact: true,
                key: "homeCategory"
            },
            {
                path: "/blog/detail/:id",
                component: BlogDetail,
                exact: true,
                key: "blogDetail"
            },
            {
                path: "/archive",
                component: Archive,
                exact: true,
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
            },
            {
                path: "*",
                key: "homeNotFound",
                component: NotFound
            }

        ]

    },

    
    
    
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