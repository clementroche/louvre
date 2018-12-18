import Plain from "./Plain";

export default class Scene {
    constructor(images) {
        this.group = new THREE.Group();
        this.images = images
        this.illustrations = []
        this.addImages()
        
    }
    
    addImages() {
        for(let i=0; i<Object.keys(this.images).length;i++) {
            let mesh = []
            mesh.push(this.images[Object.keys(this.images)[i]]);
            mesh.map((texture, index) => {
              let layer = parseInt(Object.keys(this.images)[i].match(/(LAYER_\d+(\.\d)*)/g)[0].split('LAYER_')[1])
              console.log(layer)
              layer *= 0.25
              let height = parseInt(Object.keys(this.images)[i].match(/(SIZE_\d+(\.\d)*)/g)[0].split('SIZE_')[1])/1920
              console.log(2-layer)
              let textureLoaded = new THREE.TextureLoader().load(texture);
              let illu = new Plain(textureLoaded, 0, 0, 2*layer, 5*(2.05-layer), 5*(2.05-layer)*height, 30);
            //   let illu = new Plain(textureLoaded, 0, 0, 1.5, 5, 5, 30);

            // illu.mesh.position.set(2*layer, 5*(2.05-layer), 5*(2.05-layer));
              
              illu.mesh.rotation.set(0,-180* Math.PI/180,180* Math.PI/180)
              illu.mesh.scale.set(1,-1,-1)

            this.illustrations.push(illu.mesh)
              this.group.add(illu.mesh)
        
              return illu;
            });
        }
    }
}