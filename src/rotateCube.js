const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

const windowHalfX = window.innerWidth * 0.7 / 2;
const windowHalfY = window.innerHeight / 2;

let intersect = null;
let backward = [], foreward = [];
let movement = null;
let rotateCubes = [];
let direction = null;
let axis = null;

let targetRotationX = 0.1;
let targetRotationY = 0.1;

let mouseX = 0;
let mouseXOnMouseDown = 0;
let mouseY = 0;
let mouseYOnMouseDown = 0;


function startCube(camera, scene, controls) {
  return () => {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth / 0.7) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersection = raycaster.intersectObjects(scene.children);
    if (intersection.length) {
      controls.enabled = false;
      intersect = intersection[0];
      mouseXOnMouseDown = event.clientX - windowHalfX;
      targetRotationOnMouseDownX = targetRotationX;

      mouseYOnMouseDown = event.clientY - windowHalfY;
      targetRotationOnMouseDownY = targetRotationY;
    }
  }
}

function moveCube() {
  if (intersect) {
    mouseX = event.clientX - windowHalfX;
    targetRotationX = ( mouseX - mouseXOnMouseDown ) * 0.05;
    mouseY = event.clientY - windowHalfY;
    targetRotationY = ( mouseY - mouseYOnMouseDown ) * 0.05;
  }
}

function stopCube(scene, controls) {
  return () => {
    if (intersect) {
      if (Math.abs(mouseX) > Math.abs(mouseY)) {
        if (Math.abs(targetRotationX) > Math.PI / 4) {
          rotateCubes = scene.children.filter(cube => cube.position.y === intersect.object.position.y);
          direction = mouseX > 0 ? 1 : -1;
          axis = 'y';
          rotate(axis, direction);
        }
      } else {
        if (Math.abs(targetRotationY) > Math.PI / 4) {
          rotateCubes = scene.children.filter(cube => cube.position.x === intersect.object.position.x);
          direction = mouseY > 0 ? 1 : -1;
          axis = 'x';
          rotate(axis, direction);
        }
      }

      controls.enabled = true;
      backward.push([intersect, axis, direction]);
      foreward = [];
      intersect = null;
    }
  }
}

function rotate(axis, direct) {
  rotateCubes.forEach(cube => {
    cube.rotation[axis] += direct * Math.PI / 2;
  })

}

function backwardMovement(scene) {
  return () => {
    if (backward.length) {
      movement = backward[backward.length - 1];
      rotateCubes = scene.children.filter(cube => cube.position[movement[1]] === movement[0].object.position[movement[1]]);
      rotate(movement[1], -movement[2]);
      foreward.push(backward.pop());
    }
  }
}

function forewardMovement(scene) {
  return () => {
    if (foreward.length) {
      movement = foreward[foreward.length - 1];
      rotateCubes = scene.children.filter(cube => cube.position[movement[1]] === movement[0].object.position[movement[1]]);
      rotate(movement[1], movement[2]);
      backward.push(foreward.pop());
    }
  }
}

function resetMovement() {
  backward = [];
  foreward = [];
}

function shuffle() {
  console.log('shuffle!!')
  // function getRandomInt() {
  //   return Math.floor(Math.random() * Math.floor(2));
  // }
}

module.exports = {
  startCube: startCube,
  moveCube: moveCube,
  stopCube: stopCube,
  backwardMovement: backwardMovement,
  forewardMovement: forewardMovement,
  resetMovement: resetMovement,
  shuffle: shuffle
}