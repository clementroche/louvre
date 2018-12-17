export default class Particles {
  constructor() {
      // create the particle variables
    this.particleCount = 1800;

    var particles = new THREE.Geometry();
    var pMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.2,
      map: new THREE.TextureLoader().load(textureColor),
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    // now create the individual particles
    for (var p = 0; p < this.particleCount; p++) {
      // create a particle with random
      // position values, -250 -> 250
      var particle = new THREE.Vector3();
      particle.x = THREE.Math.randFloatSpread(20);
      particle.y = THREE.Math.randFloatSpread(20);
      particle.z = THREE.Math.randFloatSpread(20);
      particle.velocity = new THREE.Vector3(
        0, // x
        -Math.random(), // y: random vel
        0
      );
      // add it to the geometry
      particles.vertices.push(particle);
    }

    // create the particle system
    this.mesh = new THREE.Points(particles, pMaterial);

  }
}
