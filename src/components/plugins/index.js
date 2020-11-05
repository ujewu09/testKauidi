import Title from "./title"
import Button from "./button"
import Input from "./input"
import Mask from "./mask"

function plugins(Vue) {
    Vue.component('Title-b', Title)
    Vue.component('Button-b', Button)
    Vue.component('RInput', Input)
    Vue.component('RMask', Mask)
}



export default plugins