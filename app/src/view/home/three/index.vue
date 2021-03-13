<template>
    <div>
    </div>
</template>

<script>
    import * as THREE from "three";
    //import {ConvexGeometry} from  'three/examples/jsm/geometries/ConvexGeometry'
    import {NURBSSurface} from 'three/examples/jsm/curves/NURBSSurface'
    import {TrackballControls} from "three/examples/jsm/controls/TrackballControls";
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
            createCoordinate(){
                // const material=new THREE.MeshBasicMaterial({
                //     color:0xff0000,
                //     transparent:false
                // })
                // let group=new THREE.Object3D();
                let points=[];
                for(let i=0;i<3;i++)
                {
                    let template=[]
                    for(let j=0;j<4;j++)
                    {
                        let randomX=Math.round(Math.random()*30);
                        let randomY=Math.round(Math.random()*30);
                        let randomZ=Math.round(Math.random()*30);
                        template.push( new THREE.Vector4(randomX,randomY,randomZ,1))
                    }
                    points.push(template)
                }
                console.log(points)
                // points.forEach((point)=>{
                //     let gmo=new THREE.SphereGeometry(0.5);
                //     let mesh=new THREE.Mesh(gmo,material)
                //     mesh.position.set(point.x,point.y,point.z)
                //     group.add(mesh)
                // })

                let  degree1 = 2;
                let  degree2 = 3;
                let  knots1 = [0, 0, 0, 1, 1, 1];
                let  knots2 = [0, 0, 0, 0, 1, 1, 1, 1];
                let  nurbsSurface = new NURBSSurface(degree1, degree2, knots1, knots2, points);
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
