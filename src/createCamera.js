const THREE = require('three');

module.exports = function createCamera() {
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);
  camera.position.z = 12;
  camera.position.x = 12;
  camera.position.y = 12;

  return camera;
}