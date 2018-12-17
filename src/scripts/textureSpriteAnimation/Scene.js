import Plain from "./Plain";

export default class Scene {
    constructor(images) {
        this.group = new THREE.Group();
        this.images = images
        this.addImages()
    }
    
    addImages() {
        for(let i=0; i<Object.keys(this.images).length;i++) {
            this.illustration = []
            this.illustration.push(this.images[Object.keys(this.images)[i]]);
            this.illustration.map((texture, index) => {
              let layer = parseInt(Object.keys(this.images)[i].match(/(LAYER:\d+(\.\d)*)/g)[0].split('LAYER:')[1])
              console.log(layer)
              let textureLoaded = new THREE.TextureLoader().load(texture);
              let illu = new Plain(textureLoaded, 0, 0, 0.25*layer, 5, 5, 30);
              
              illu.mesh.rotation.set(0,-180* Math.PI/180,180* Math.PI/180)
              illu.mesh.scale.set(1,-1,-1)

              this.group.add(illu.mesh)
        
              return illu;
            });
        }
    }
}