

const menuList = [
    {
        title: "Home",
        key: "/home",
        iconType: "home",
        route: "/home"
    },
    {
        title: "Goods Management",
        key: "/goods",
        iconType: "appstore",
        children: [
            {
                title: "Categories",
                key: "/category",
                iconType: "appstore",
                route: "/category"
            },
            {
                title: "Products",
                key: "/product",
                iconType: "appstore",
                route: "/product"
            }
        ]
    },
    // ivan 20200419 
    // {
    //     title: 'Users',
    //     key: '/users',
    //     iconType: ''

    // }
]


export default menuList;

// export const menuList = {
//     profile: {
//         title: "Profile",
//         key: "1"
//     },
//     goods: {
//         title: "Goods Management",
//         key: "2",
//         children: {
//             category: {
//                 title: "Categories",
//                 key: "2.1"
//             },
            
//         }
//     }

// };