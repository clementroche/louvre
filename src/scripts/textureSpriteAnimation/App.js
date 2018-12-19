// example import asset
// import imgPath from './assets/img.jpg';

// TODO : add Dat.GUI
// TODO : add Stats
import Tube from "./Tube";
import Plain from "./Plain";
import Scene from "./Scene";

import TextureAnimator from "src/utils/TextureAnimator";
// import Particles from "./Particles";
var OrbitControls = require("three-orbit-controls")(THREE);
import * as dat from "dat.gui";
import textureColor from "src/assets/Blue_MarbleCOLOR.jpg";
import texture2Color from "src/assets/AzulejosCOLOR.jpg";
import background from "src/assets/background.jpg";
import poisson from "src/assets/poisson-sprite.png";
import { TweenLite } from "gsap/TweenMax";
import browserCheck from "src/utils/browserCheck";

import vs from "src/shaders/vertex/shader.glsl";
import fs from "src/shaders/fragment/shader.glsl";


import {scene1img,scene2img,scene3img,scene4img} from './sceneImport.js'

// console.log(scene1[Object.keys(scene1)[0]])

export default class App {
  constructor() {
    this.container = document.createElement("div");
    this.container.id = "main";
    document.body.appendChild(this.container);
    document.body.classList.add(browserCheck());

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 10;



    this.controls = new OrbitControls(this.camera);
    this.controls.enabled = true;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.intersects = [];

    var size = 10;
    var divisions = 10;

    var gridHelper = new THREE.GridHelper(size, divisions);

    // DAT.GUI Related Stuff

    var gui = new dat.GUI();

    // var cam = gui.addFolder("Camera");
    // cam.add(this.camera.position, "y", 0.1, 10).listen();
    // cam.open();

    this.scene = new THREE.Scene();

    this.scene.add(gridHelper);
    this.backgroundTiles = [];
    this.animatedTiles = [];
    // this.backgroundTiles.push(textureColor);
    this.backgroundTiles.push(background);
    this.backgroundTiles.map((texture, index) => {
      let textureLoaded = new THREE.TextureLoader().load(texture);
      let d = this.getDimensionsFromDistance(this.camera.position.z)
      let tube = new Plain(textureLoaded, 0, index, -index / 100, d.width*100, d.height*100);
      this.scene.add(tube.mesh);
      tube.mesh.position.set(0,-tube.height/2,0)
      return tube;
    });

    this.layer = 0.10

    this.scene1 = new Scene(scene1img,this.camera,1)
    this.scene.add(this.scene1.group)
    this.scene1.group.position.set(0,-5,0)
    

    this.scene2 = new Scene(scene2img,this.camera,2)
    this.scene.add(this.scene2.group)
    this.scene2.group.position.set(0,-22,0)
    

    this.scene3 = new Scene(scene3img,this.camera,3)
    this.scene.add(this.scene3.group)
    this.scene3.group.position.set(0,-56,0)

    this.scene4 = new Scene(scene4img,this.camera,4)
    this.scene.add(this.scene4.group)
    this.scene4.group.position.set(0,-73,0)
    







    // this.particleSystem = new Particle();
    // this.scene.add(this.particleSystem.mesh);

    let ambientLight = new THREE.AmbientLight(0x505050);
    this.scene.add(ambientLight);

    // let pointLight = new THREE.PointLight(0xffffff, 0.8, 18);
    // pointLight.position.set(0,-5,4)
    // pointLight.castShadow = true;

    // pointLight.shadow.mapSize.width = 512;  // default
    // pointLight.shadow.mapSize.height = 512; // default
    // pointLight.shadow.camera.near = 0.1;       // default
    // pointLight.shadow.camera.far = 500      // default

    // this.scene.add(pointLight);

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
  this.scene.add( directionalLight );
  directionalLight.position.set(0,-5,4)


    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.render.sortObjects = true;
    this.container.appendChild(this.renderer.domElement);



    // let runnerTexture = new THREE.TextureLoader().load(poisson);
    // this.annie = new TextureAnimator(runnerTexture, 12, 1, 12, 75); // texture, #horiz, #vert, #total, duration.
    // // var material = new THREE.ShaderMaterial({
    // //   uniforms: {
    // //     time: { value: 1.0 },
    // //     resolution: { value: new THREE.Vector2() },
    // //     color: { value: new THREE.Vector3(1, 0.2, 0.5, 1.0) },
    // //     texture: {
    // //       type: "t",
    // //       value: new THREE.TextureLoader().load(textureColor)
    // //     }
    // //   },
    // //   vertexShader: vs,
    // //   fragmentShader: fs
    // // });
    // var material = new THREE.MeshPhongMaterial({
    //   map: runnerTexture,
    //   transparent: true,
    //   side: THREE.DoubleSide
    // });
    // var geometry = new THREE.PlaneGeometry(1, 1, 1);
    // var cube = new THREE.Mesh(geometry, material);
    // this.scene.add(cube);

    window.addEventListener("resize", this.onWindowResize.bind(this), false);
    this.onWindowResize();
    let handleWheel = e => {
      if (Object.values(document.body.classList).includes("isFirefox")) {
        this.scrolling(e.deltaY); //we divide by 100 because it's too fast
      } else {
        this.scrolling(e.deltaY / 100); //we divide by 100 because it's too fast
      }
    };
    window.addEventListener("wheel", handleWheel.bind(this));
    let raycastClick = event => {
      // calculate mouse position in normalized device coordinates
      // (-1 to +1) for both components
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // update the picking ray with the camera and mouse position
      this.raycaster.setFromCamera(this.mouse, this.camera);

      // calculate objects intersecting the picking ray
      this.intersects = this.raycaster.intersectObjects(this.scene.children);

      for (var i = 0; i < this.intersects.length; i++) {
        this.intersects[i].object.material.color.set(0xff0000);
      }
    };
    this.time = 0;

    this.clock = new THREE.Clock();
    // window.addEventListener("click", raycastClick.bind(this));
    this.renderer.setAnimationLoop(this.render.bind(this));
  }

  scrolling(scroll) {
    TweenLite.to(this.camera.position, 0.3, {
      ease: Power1.easeOut,
      y: this.camera.position.y - scroll
    });
  }

  render() {
    // this.particleSystem.rotation.y += 0.01;

    var delta = this.clock.getDelta();

    // this.annie.update(1000 * delta);

    // this.annie.update(1000 * this.time);
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  getDimensionsFromDistance(dist) {
    let vFOV = THREE.Math.degToRad( this.camera.fov )
    let height = 2 * Math.tan( vFOV / 2 ) * dist
    let width = height * this.camera.aspect
    return {
      height : height,
      width : width
    }
  }
}
