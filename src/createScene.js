const THREE = require('three');

module.exports = function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0f0f0f);
  return scene;
}