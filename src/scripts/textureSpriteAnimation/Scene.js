import Plain from "./Plain";

export default class Scene {
    constructor(images,index) {
        this.group = new THREE.Group();
        this.images = images
        this.index = index
        this.maxLayer = 1+(0.25*Object.keys(this.images).length)
        console.log(this.maxLayer)
        this.illustrations = []
        this.addImages()
        
    }
    
    addImages() {
        for(let i=0; i<Object.keys(this.images).length;i++) {
            let mesh = []
            mesh.push(this.images[Object.keys(this.images)[i]]);
            mesh.map((texture, index) => {
              let layer = parseInt(Object.keys(this.images)[i].match(/(LAYER_\d+(\.\d)*)/g)[0].split('LAYER_')[1])
                layer *= 0.25
              let maxLayer = 2*(0.25*Object.keys(this.images).length)
              let height = parseInt(Object.keys(this.images)[i].match(/(SIZE_\d+(\.\d)*)/g)[0].split('SIZE_')[1])/1920
              let textureLoaded = new THREE.TextureLoader().load(texture);
              let illu = new Plain(textureLoaded, 0, 0, layer*0.25, 5*(this.maxLayer-layer), 5*(this.maxLayer-layer)*height, 30);
            //   let illu = new Plain(textureLoaded, 0, 0, 1.5, 5, 5, 30);
            // let illu = new Plain(textureLoaded, 0, 0, layer, 5, 5*height, 1);
            // illu.mesh.position.set(2*layer, 5*(2.05-layer), 5*(2.05-layer));
              
              illu.mesh.rotation.set(0,-180* Math.PI/180,180* Math.PI/180)
              illu.mesh.scale.set(1,-1,-1)

            this.illustrations.push(illu.mesh)
            illu.mesh.renderOrder = this.index
            illu.material.depthTest = false;
              this.group.add(illu.mesh)
        
              return illu;
            });
        }
    }
}