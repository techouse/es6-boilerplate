import { myKey } from "external"
import Vue from "vue"
import ExampleComponent from "./components/ExampleComponent"

console.log(myKey)

console.log("huh")

const app = new Vue({
    el: "#app",
    components: {
        ExampleComponent
    }
})