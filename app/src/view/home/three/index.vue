<template>
    <div/>
</template>

<script>
    import * as THREE from 'three'
    export default {
        name: "index",
        data(){
            return{
                scene:null,
                cube:null,
                camera:null,
                render:null
            }
        },
        created() {
            this.scene=new THREE.Scene()
            this.camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
            this.render=new THREE.WebGLRenderer()
            this.render.setSize(window.innerWidth,window.innerHeight)
            document.body.appendChild(this.render.domElement)
        },
        mounted(){
            this.createCube()
            this.animation()
        },
        methods: {
            createCube(){
                const geometry=new THREE.BoxGeometry()
                const material=new THREE.MeshBasicMaterial(
                    {
                        color:0x00ff00
                        }
                    )
                this.cube=new THREE.Mesh(geometry,material)
                this.scene.add(this.cube)
                this.camera.position.z=5
            },
            animation(){
                requestAnimationFrame(this.animation)
                this.cube.rotation.x+=0.01
                this.cube.rotation.y+=0.01
                this.render.render(this.scene,this.camera)
            }
        }
    }
</script>

<style scoped>

</style>
