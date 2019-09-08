const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

let intersect;
let backward = [], foreward = [];

function startCube(camera, scene) {
  return () => {
    event.preventDefault();
    isMouseOn = true;
    mouse.x = (event.clientX / window.innerWidth / 0.7) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersection = raycaster.intersectObjects(scene.children);
    if (intersection.length) {
      intersect = intersection[0];
      intersect.object.rotation.x += Math.PI / 2;
    }
  }
}

function moveCube() {

}

function stopCube() {
  backward.push(1);
  foreward = [];
}

function backwardMovement() {
  if (backward.length) {
    foreward.push(backward.pop());
    console.log(backward)
  }
}

function forewardMovement() {
  if (foreward.length) {
    backward.push(foreward.pop());
    console.log(foreward);
  }
}

function resetMovement() {
  backward = [];
  foreward = [];
}

module.exports = {
  startCube: startCube,
  moveCube: moveCube,
  stopCube: stopCube,
  backwardMovement: backwardMovement,
  forewardMovement: forewardMovement,
  resetMovement: resetMovement
}