

const menuList = [
  {
    title: "Blog Management",
    key: "/blog",
    iconType: "home",
    path: "/blog"
  },
  {
    title: "Blog Management",
    key: "/blogs",
    iconType: "appstore",
    path: [
      {
        title: "Categories",
        key: "/category",
        iconType: "profile",
        route: "/category"
      },
      {
        title: "Products",
        key: "/product",
        iconType: "project",
        route: "/product"
      }
    ]
  },
  {
    title: "Orders",
    key: "/orders",
    iconType: "shop",
    route: "/orders"
  },
  {
    title: "Users",
    key: "/users",
    iconType: "user",
    route: "/users"
  },

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