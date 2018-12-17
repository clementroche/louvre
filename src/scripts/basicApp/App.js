// example import asset
// import imgPath from './assets/img.jpg';

// TODO : add Dat.GUI
// TODO : add Stats

var OrbitControls = require("three-orbit-controls")(THREE);
import * as dat from "dat.gui";

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
      10
    );
    this.camera.position.z = 1;

    this.controls = new OrbitControls(this.camera);

    var size = 10;
    var divisions = 10;

    var gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);
    // DAT.GUI Related Stuff

    var gui = new dat.GUI();

    // var cam = gui.addFolder("Camera");
    // cam.add(this.camera.position, "y", 0.1, 10).listen();
    // cam.open();

    this.scene = new THREE.Scene();

    let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    let material = new THREE.MeshNormalMaterial();
    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);

    window.addEventListener("resize", this.onWindowResize.bind(this), false);
    this.onWindowResize();

    this.renderer.setAnimationLoop(this.render.bind(this));
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
