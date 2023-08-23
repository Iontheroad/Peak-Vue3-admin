/**
 * 自定义指令
 */
import { Directive, App } from "vue"

import copy from "./modules/copy"
import scroll from "./modules/scroll"
import waterMarker from "./modules/waterMarker"

const directivesList: { [key: string]: Directive } = {
  copy, scroll, waterMarker
}

const directives = {
  install(app: App<Element>) {

    Object.keys(directivesList).forEach(key => {
      app.directive(key, (directivesList)[key])
    })
  }
}

export default directives