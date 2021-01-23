<template>
    <div>
    </div>
</template>

<script>
    import * as THREE from "three";
    import {ConvexGeometry} from  'three/examples/jsm/geometries/ConvexGeometry'
    export default {
        name: "index",
        data(){
            return{
                scene:null,
                camera:null,
                render:null,
                coordinateSystem:null,
                material:null,
                result:null,
                points:[],
                geometry:{
                    convexGeometry:null
                }
            }
        },
        created() {
            this.scene=new THREE.Scene()
            this.scene.background=new THREE.Color('white');
            this.camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
            this.camera.position.set(10,10,100)
            this.render=new THREE.WebGLRenderer()
            this.render.setSize(window.innerWidth,window.innerHeight)
            this.render.setPixelRatio(window.devicePixelRatio)
            document.body.appendChild(this.render.domElement)
        },
        mounted(){
            this.createCoordinate()
            //this.animation()
        },
        methods: {
            createCoordinate(){
                const material=new THREE.MeshBasicMaterial({
                    color:0xff0000,
                    transparent:false
                })
                let group=new THREE.Object3D();
                let points=[];
                for(let i=0;i<15;i++)
                {
                    let randomX=Math.round(Math.random()*30);
                    let randomY=Math.round(Math.random()*30);
                    let randomZ=Math.round(Math.random()*30);
                    points.push(new THREE.Vector3(randomX,randomY,randomZ))
                }
                points.forEach((point)=>{
                    let gmo=new THREE.SphereGeometry(0.2);
                    let mesh=new THREE.Mesh(gmo,material)
                    mesh.position.set(point.x,point.y,point.z)
                    group.add(mesh)
                })
                const aixes=new THREE.AxesHelper(100);
                const convexGeometry=new ConvexGeometry(points);
                const material1=new THREE.MeshBasicMaterial({
                    color:0x8ed0f4,
                    wireframe:true
                })
                const convexMesh=new THREE.Mesh(convexGeometry,material1)
                this.scene.add(convexMesh)
                this.scene.add(aixes)
                this.scene.add(group)
                this.render.render(this.scene,this.camera)
            },

            animation(){
                requestAnimationFrame(this.animation)
                this.result.rotation.x+=0.01
                this.render.render(this.scene,this.camera)
            }
        }
    }
</script>

<style scoped>

</style>
