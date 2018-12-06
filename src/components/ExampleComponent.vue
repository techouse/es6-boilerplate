<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">Example Component</div>

                    <div class="card-body">
                        <b id="title">I'm an example component.</b>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ExampleComponent",

        mounted() {
            console.log("Component mounted.")
        }
    }
</script>

<style scoped>
    #title {
        color: red;
    }
</style>