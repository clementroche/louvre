export default class Tube {
  constructor(texture, y) {
    function CustomSinCurve(scale) {
      THREE.Curve.call(this);
      this.y = y;
      this.scale = scale === undefined ? 1 : scale;
    }

    CustomSinCurve.prototype = Object.create(THREE.Curve.prototype);
    CustomSinCurve.prototype.constructor = CustomSinCurve;

    CustomSinCurve.prototype.getPoint = function(t) {
      var tx = 0;
      //   var ty = Math.sin(2 * Math.PI * t);
      var ty = t * 3 - 1.5 + this.y;
      var tz = 0;

      return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
    };

    var path = new CustomSinCurve(5);
    this.geometry = new THREE.TubeGeometry(path, 20, 2, 20, false);
    // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

    // immediately use the texture for material creation
    this.material = new THREE.MeshBasicMaterial({
      map: texture
    });
    this.material.side = THREE.BackSide;

    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }
}
