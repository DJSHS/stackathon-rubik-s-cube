const OrbitControls = require('three-orbit-controls')(THREE);

module.exports = function createControl(camera) {
  const controls = new OrbitControls(camera);
  controls.enableDamping = true;
  controls.rotateSpeed = 0.3;
  controls.maxDistance = 15;
  controls.minDistance = 8;
  controls.target.set(1, 1, 1);
  controls.enablePan = false;

  return controls;
}