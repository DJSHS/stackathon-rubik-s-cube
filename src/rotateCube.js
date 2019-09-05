const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

function startCube(camera, scene) {
  return () => {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth / 0.7) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersection = raycaster.intersectObjects(scene.children);
    if (intersection.length) {
      intersection[0].object.rotation.x += Math.PI / 2;
    }
  }
}

function moveCube() {

}

function stopCube() {

}

module.exports = {
  startCube: startCube,
  moveCube: moveCube,
  stopCube: stopCube
}