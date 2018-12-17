// example import asset
// import imgPath from './assets/img.jpg';

// TODO : add Dat.GUI
// TODO : add Stats

var OrbitControls = require("three-orbit-controls")(THREE);
import * as dat from "dat.gui";
import Boid from "./Boid";

export default class App {
  constructor() {
    // this.container = document.querySelector("#main");
    this.container = document.createElement("div");
    this.container.id = "main";
    document.body.appendChild(this.container);

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 10;
    this.camera.position.y = 5;
    this.camera.position.x = 10;

    this.controls = new OrbitControls(this.camera);

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

    // let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    // let material = new THREE.MeshNormalMaterial();
    // this.mesh = new THREE.Mesh(geometry, material);

    this.boidsCount = 200;
    // let datCubes = gui.addFolder("Cubes");
    // datCubes.add(this, "cubesCount", 1, 1000).listen();
    // datCubes.open();

    this.boids = [];
    for (let index = 0; index < this.boidsCount; index++) {
      this.boids.push(
        new Boid(
          new THREE.Vector3(
            Math.random() * 9 - 4.5,
            Math.random() * 9 - 4.5,
            Math.random() * 9 - 4.5
          ),
          new THREE.Vector3(
            Math.random() * 5 - 2.5 / 100,
            Math.random() * 5 - 2.5 / 100,
            Math.random() * 5 - 2.5 / 100
          )
        )
      );
      this.scene.add(this.boids[index].mesh);
    }

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);

    window.addEventListener("resize", this.onWindowResize.bind(this), false);
    this.onWindowResize();

    this.renderer.setAnimationLoop(this.render.bind(this));
  }

  render() {
    this.boids.forEach(boid => {
      // boid.align(this.boids);
      boid.flock(this.boids);
      boid.edges();
      boid.update();
    });
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
