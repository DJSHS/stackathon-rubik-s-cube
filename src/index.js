const THREE = require('three');
const OrbitControls = require('three-orbit-controls')(THREE);

const colorArr = [
  0xff0000, // red
  0xffa500, // orange
  0xffff00, // yellow
  0xffffff, // white
  0x0000ff, // blue
  0x00ff00, // green
];

let scene, camera, controls, renderer, raycaster;
const mouse = new THREE.Vector2();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0f0f0f);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);

  controls = new OrbitControls(camera);

  raycaster = new THREE.Raycaster();

  camera.position.z = 12;
  camera.position.x = 12;
  camera.position.y = 12;

  controls.enableDamping = true;
  controls.rotateSpeed = 0.3;
  controls.maxDistance = 40;
  controls.minDistance = 8;
  controls.target.set(1, 1, 1);
  controls.update();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth * 0.75, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  for (let i = 0; i < 12; i += 2) {
    geometry.faces[i].color.setHex(colorArr[i/2]);
    geometry.faces[i + 1].color.setHex(colorArr[i/2]);
  }

  const material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors });

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        let mesh = new THREE.Mesh(geometry, material);

        const geoEdge = new THREE.EdgesGeometry(mesh.geometry);
        const matEdge = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 4 });
        const wireFrame = new THREE.LineSegments(geoEdge, matEdge);
        wireFrame.renderOrder = 1;
        mesh.add(wireFrame);

        mesh.position.x = i;
        mesh.position.y = k;
        mesh.position.z = j;
        
        scene.add(mesh);
      }
    }
  }

  window.addEventListener('resize', onWindowResize);
  renderer.domElement.addEventListener('click', onMouseDown, false);

  function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
  }

  animate();
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

init();
window.init = init;
