const OrbitControls = require('three-orbit-controls')(THREE);

module.exports = function createControl(camera) {
  const controls = new OrbitControls(camera);
  controls.enableDamping = true;
  controls.rotateSpeed = 0.3;
  controls.maxDistance = 20;
  controls.minDistance = 10;
  controls.target.set(1, 1, 1);

  return controls;
}