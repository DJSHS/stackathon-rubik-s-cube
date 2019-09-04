const THREE = require('three');
const createCube = require('./createCube');
const createScene = require('./createScene');
const createControl = require('./createControl');
const createCamera = require('./createCamera');

let scene, camera, controls, renderer;
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

function init() {
  scene = createScene();
  camera = createCamera();
  controls = createControl(camera);

  createCube(scene);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth * 0.75, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  renderer.domElement.addEventListener('mousedown', onMouseDown, false);

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', onWindowResize);
}

function resetCube() {
  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }

  createCube(scene);
}

function shuffle() {
  console.log('Shuffle!!')
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth * 0.75, window.innerHeight);
}

function onMouseDown(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth / 0.75) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  const intersection = raycaster.intersectObjects(scene.children);
  if (intersection.length) {
    intersection[0].object.rotation.x += Math.PI / 2;
  }
}

// function onDocumentMouseDown( event ) {

//   event.preventDefault();

//   document.addEventListener( 'mousemove', onDocumentMouseMove, false );
//   document.addEventListener( 'mouseup', onDocumentMouseUp, false );
//   document.addEventListener( 'mouseout', onDocumentMouseOut, false );

//   mouseXOnMouseDown = event.clientX - windowHalfX;
//   targetRotationOnMouseDownX = targetRotationX;

//   mouseYOnMouseDown = event.clientY - windowHalfY;
//   targetRotationOnMouseDownY = targetRotationY;
// }

// function onDocumentMouseMove( event ) {

//   mouseX = event.clientX - windowHalfX;

//   targetRotationX = ( mouseX - mouseXOnMouseDown ) * 0.00025;

//   mouseY = event.clientY - windowHalfY;

//   targetRotationY = ( mouseY - mouseYOnMouseDown ) * 0.00025;
// }

// function onDocumentMouseUp( event ) {

//   document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
//   document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
//   document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
// }

// function onDocumentMouseOut( event ) {

//   document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
//   document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
//   document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
// }

init();
window.resetCube = resetCube;
window.shuffle = shuffle;