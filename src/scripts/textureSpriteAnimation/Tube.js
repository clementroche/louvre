export default class Tube {
  constructor(texture, x, y, z, radius, scale) {
    function CustomSinCurve(scale) {
      THREE.Curve.call(this);
      this.x = x;
      this.y = y;
      this.z = z;
      this.scale = scale === undefined ? 1 : scale;
    }
    this.radius = radius || 2;
    this.texture = texture;
    CustomSinCurve.prototype = Object.create(THREE.Curve.prototype);
    CustomSinCurve.prototype.constructor = CustomSinCurve;

    CustomSinCurve.prototype.getPoint = function(t) {
      var tx = +this.x;
      //   var ty = Math.sin(2 * Math.PI * t);
      var ty = t * 3 - 1.5 + this.y;
      var tz = 0 + this.z;
      return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
    };

    var path = new CustomSinCurve(scale || 5);
    this.geometry = new THREE.TubeGeometry(path, 20, this.radius, 8, false);
    // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

    // immediately use the texture for material creation
    this.material = new THREE.MeshPhongMaterial({
      map: this.texture,
      transparent: true,
      alphaTest: 0.5
    });
    this.material.side = THREE.BackSide;

    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }
}
