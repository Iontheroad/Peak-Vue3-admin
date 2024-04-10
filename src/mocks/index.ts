// import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";
import { createProdMockServer } from "vite-plugin-mock/client";
import user from "./data/user";
import menu from "./data/menu";

// const modules = import.meta.glob("./**/*,ts", { eager: true });
// const mockModules: any[] = [];
// Object.keys(modules).forEach((key) => {
//   if (key.includes("/_")) {
//     return;
//   }
//   mockModules.push(...(modules as Recordable)[key].default);
// });
// console.log(123123);

export function setupProdMockServer() {
  createProdMockServer([...user, ...menu]);
}
