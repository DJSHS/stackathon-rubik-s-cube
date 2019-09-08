import * as THREE from 'three';
import { createCube, removeAndCreateCube} from './createCube';
import createScene from './createScene';
import createControl from './createControl';
import createCamera from './createCamera';
import timer from './timer';
import { startCube, moveCube, stopCube, backwardMovement, forewardMovement, resetMovement } from './rotateCube';

let scene, camera, controls, renderer;

function init() {
  scene = createScene();
  camera = createCamera();
  controls = createControl(camera);
  createCube(scene);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth * 0.7, window.innerHeight * 0.85);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  renderer.domElement.addEventListener('mousedown', startCube(camera, scene), false);
  renderer.domElement.addEventListener('mousemove', moveCube, false );
  renderer.domElement.addEventListener('mouseup', stopCube, false);
}

function resetCube() {
  removeAndCreateCube(scene);
  resetMovement();
}

function shuffle() {
  console.log('Shuffle!!')
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth * 0.7, window.innerHeight * 0.85);
}

init();
window.addEventListener('resize', onWindowResize);
window.resetCube = resetCube;
window.shuffle = shuffle;
window.timer = timer;
window.backwardMovement = backwardMovement;
window.forewardMovement = forewardMovement;
