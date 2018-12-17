// example import asset
// import imgPath from './assets/img.jpg';

// TODO : add Dat.GUI
// TODO : add Stats
import Tube from "./Tube";
var OrbitControls = require("three-orbit-controls")(THREE);
import * as dat from "dat.gui";
import textureColor from "src/assets/Blue_MarbleCOLOR.jpg";
import texture2Color from "src/assets/AzulejosCOLOR.jpg";
import { TweenLite } from "gsap/TweenMax";
import browserCheck from "src/utils/browserCheck";

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
    this.camera.position.z = 1;

    // this.controls = new OrbitControls(this.camera);

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
    this.backgroundTiles.push(textureColor);
    this.backgroundTiles.push(texture2Color);
    this.backgroundTiles.map((texture, index) => {
      let textureLoaded = new THREE.TextureLoader().load(texture);
      let tube = new Tube(textureLoaded, index - 1);
      this.scene.add(tube.mesh);
      return tube;
    });

    let ambientLight = new THREE.AmbientLight(0x505050);
    this.scene.add(ambientLight);

    let pointLight = new THREE.PointLight(0xffffff, 1, 10);
    this.scene.add(pointLight);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);

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
    this.renderer.setAnimationLoop(this.render.bind(this));
  }

  scrolling(scroll) {
    TweenLite.to(this.camera.position, 0.3, {
      ease: Power1.easeOut,
      y: this.camera.position.y - scroll
    });
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
