const THREE = require('three');

module.exports = function createCamera() {
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 800);
  camera.position.z = 10;
  camera.position.x = 10;
  camera.position.y = 10;
  camera.lookAt(10, 10, 10);

  return camera;
}