<template>
    <div>
    </div>
</template>

<script>
    import * as THREE from "three";
    //import {ConvexGeometry} from  'three/examples/jsm/geometries/ConvexGeometry'
    import {NURBSSurface} from 'three/examples/jsm/curves/NURBSSurface'
    import {TrackballControls} from "three/examples/jsm/controls/TrackballControls";
    import {getPoint} from "./service";
    //import {pow} from "mathjs";

    export default {
        name: "index",
        data(){
            return{
                scene:null,
                camera:null,
                cameraController:null,
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
            this.createConfig()
            this.createCoordinate()
            this.animation()
        },
        methods: {
            createConfig(){
                this.cameraController= new TrackballControls(this.camera,this.render.domElement)
                this.cameraController.rotateSpeed=1.0;
                this.cameraController.zoomSpeed=1.0;
                this.cameraController.panSpeed=1.0;
            },
            async createCoordinate(){
                // const material=new THREE.MeshBasicMaterial({
                //     color:0xff0000,
                //     transparent:false
                // })
                // let group=new THREE.Object3D();
                let coordinateList=[]
                for(let j=0;j<35;j++)
                {
                    let randomX=Math.round(Math.random()*30);
                    let randomY=Math.round(Math.random()*30);
                    let randomZ=Math.round(Math.random()*30);
                    coordinateList.push([randomX,randomY,randomZ])
                }

                let result=await getPoint(coordinateList)
                console.log(result.controlpoint.length)
                let controlPoint=[]
                let num=1;
                let template=[];
                for(let item of result.controlpoint)
                {
                    if(num<=6)
                    {
                        template.push(new THREE.Vector4(item[0],item[1],item[2],1))
                        num++
                    }

                    else
                    {
                        controlPoint.push(template)
                        template=[]
                        template.push(new THREE.Vector4(item[0],item[1],item[2],1))
                        num=2
                    }

                }
                controlPoint.push(template)
                console.log(controlPoint)
                // points.forEach((point)=>{
                //     let gmo=new THREE.SphereGeometry(0.5);
                //     let mesh=new THREE.Mesh(gmo,material)
                //     mesh.position.set(point.x,point.y,point.z)
                //     group.add(mesh)
                // })

                let  nurbsSurface = new NURBSSurface(result.degree_u, result.degree_v, result.knotvector_u,
                    result.knotvector_v,controlPoint);
                const aixes=new THREE.AxesHelper(100);
                const getPoints=function(u,v,target){
                    return nurbsSurface.getPoint(u,v,target)
                };
                let geometry=new THREE.ParametricGeometry(getPoints,20,20)
                // const convexGeometry=new ConvexGeometry(points);
                const material1=new THREE.MeshBasicMaterial({
                    color:0x8ed0f4
                })
                const convexMesh=new THREE.Mesh(geometry,material1)
                this.result=convexMesh
                this.scene.add(convexMesh)
                this.scene.add(aixes)
                this.render.render(this.scene,this.camera)
            },

            animation(){
                requestAnimationFrame(this.animation)
                //this.scene.rotation.y+=0.01
                this.cameraController.update()
                this.render.render(this.scene,this.camera)
            }
        }
    }
</script>

<style scoped>

</style>
