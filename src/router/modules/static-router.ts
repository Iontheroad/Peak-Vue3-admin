/**
 * static 静态路由
 */

/**
 * staticRoute 静态路由
 */
export const staticRoute = [
  {
    path: "/",
    redirect: "/home/index"
  },
  {
    path: "/layout",
    name: "Layout",
    component: () => import("@/layout/index.vue"),
    redirect: "/",
    children: [
      // {
      //   path: "/home",
      //   name: "Home",
      //   alias: "/home",
      //   component: () => import("@/views/home/index.vue"),
      //   meta: {
      //     title: "首页"
      //   }
      // }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue")
  }
];

/**
 * errorRoute 错误页面路由
 */
export const errorRoute = [
  {
    path: "/403",
    name: "403",
    component: () => import("@/components/ErrorMessage/403.vue"),
    meta: {
      title: "403页面"
    }
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/components/ErrorMessage/404.vue"),
    meta: {
      title: "404页面"
    }
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/components/ErrorMessage/500.vue"),
    meta: {
      title: "500页面"
    }
  },
  // Resolve refresh page, route warnings
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/components/ErrorMessage/404.vue")
  }
];

/**
 * notFoundRoute （找不到路由）
 */
export const notFoundRoute = {
  // 统一处理
  path: "/:pathMatch(.*)*",
  redirect: "/404",
  meta: {
    isHidden: true
  }
  /*
  // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  // 将匹配以 `/user-` 开头的所有内容，并将其放在 `$route.params.afterUser` 下
  { path: '/user-:afterUser(.*)', component: UserGeneric },
  ]
  */
  // {
  //   path: "/:pathMatch(.*)*",
  //   component: () => import("@/views/error/404"),
  //   hidden: true,
  // },
};
