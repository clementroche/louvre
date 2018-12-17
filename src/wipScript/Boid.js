export default class Boid {
  constructor(position, velocity) {
    this.position = position || new THREE.Vector3(0, 1, 0);
    this.velocity = velocity || new THREE.Vector3(0.0, 0.001, 0.0);
    this.acceleration = new THREE.Vector3();
    this.alignement = new THREE.Vector3();
    this.geometry = new THREE.SphereGeometry(0.05, 10, 10);
    // this.geometry = new THREE.ConeGeometry(0.1, 0.4, 8);
    this.material = new THREE.MeshNormalMaterial();
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    //the distance of perception of others boids
    this.perception = 0.5;
    this.maxForce = new THREE.Vector3(0.02, 0.02, 0.02);
    this.edge = 5;
  }

  align(boids) {
    let steering = new THREE.Vector3();
    let total = 0;
    boids.forEach(boid => {
      let distance = this.position.distanceTo(boid.position);
      if (boid != this && distance < this.perception) {
        steering.add(boid.velocity);
        total++;
      }
    });
    if (total > 0) {
      steering.divideScalar(total);
      steering.sub(this.velocity);
    }
    // if (steering.length() < 0.000001) {
    //   steering.multiplyScalar(1000);
    // } else if (steering.length() > 0.0001) {
    //   steering.divideScalar(100);
    // }
    return steering;
  }

  cohesion(boids) {
    let steering = new THREE.Vector3();
    let total = 0;
    boids.forEach(boid => {
      let distance = this.position.distanceTo(boid.position);
      if (boid != this && distance < this.perception) {
        steering.add(boid.position);
        total++;
      }
    });
    if (total > 0) {
      steering.divideScalar(total);
      steering.sub(this.position);
      steering.sub(this.velocity);
    }
    if (steering.length() < 0.00001) {
      // this.alignement.multiplyScalar(10);
    } else if (steering.length() > 0.0001) {
      steering.divideScalar(100);
    }
    return steering;
  }

  separate(boids) {
    let steering = new THREE.Vector3();
    let total = 0;
    boids.forEach(boid => {
      let distance = this.position.distanceTo(boid.position);
      if (boid != this && distance < this.perception / 3) {
        let diff = new THREE.Vector3(
          this.position.x,
          this.position.y,
          this.position.z
        );
        diff.sub(boid.position);
        diff.divideScalar(distance);
        steering.add(diff);
        total++;
      }
    });
    if (total > 0) {
      steering.divideScalar(total);
      steering.sub(this.velocity);
    }
    if (steering.length() < 0.000001) {
      steering.multiplyScalar(100);
    } else if (steering.length() > 0.0001) {
      steering.divideScalar(10);
    }
    return steering;
  }

  flock(boids) {
    this.acceleration.multiplyScalar(0);
    this.alignement = this.align(boids);
    this.cohesionement = this.cohesion(boids);
    this.separation = this.separate(boids);

    this.acceleration.add(this.alignement);
    this.acceleration.add(this.cohesionement);
    this.acceleration.add(this.separation);
  }

  update() {
    this.position.add(this.velocity);
    // console.log(this.velocity);
    this.velocity.add(this.acceleration);
    if (this.velocity.length() > 0.0001) {
      this.velocity.divideScalar(1.01);
    }
    // console.log(this.acceleration);
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
  }

  edges() {
    if (this.position.x > this.edge) {
      this.position.x = -this.edge;
    } else if (this.position.x < -this.edge) {
      this.position.x = this.edge;
    }
    if (this.position.y > this.edge) {
      this.position.y = -this.edge;
    } else if (this.position.y < -this.edge) {
      this.position.y = this.edge;
    }
    if (this.position.z > this.edge) {
      this.position.z = -this.edge;
    } else if (this.position.z < -this.edge) {
      this.position.z = this.edge;
    }
  }
}
