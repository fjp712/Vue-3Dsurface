<template>
    <div class="home">
        <div class="home_left-aside"></div>
        <div class="home_main">
            <canvas ref="paintingArea" class="home_paintArea">
            </canvas>
        </div>
        <div class="home_right-aside"></div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                gl:null
            }
        },
        mounted() {
            this.gl=this.$refs.paintingArea.getContext('webgl2')
            if(this.gl)
            {
                this.gl.clearColor(0.0,0.0,0.0,1.0)
                this.gl.clear(this.gl.COLOR_BUFFER_BIT)
            }

        }
    }
</script>

<style scoped lang="scss">
    .home{
        display: flex;
        flex-grow: 1;
        &_left-aside{

        }
        &_main{
            .home_paintArea{
                height: 500px;
                width:80vw;
            }
        }
        &_right-aside{

        }
    }

</style>
