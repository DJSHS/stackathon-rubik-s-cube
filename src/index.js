const THREE = require('three');

function init() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);

  camera.position.z = 10;
  camera.position.x = 10;
  camera.position.y = 10;
  camera.lookAt(scene.position);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth * 0.75, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById('cube').appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ffff });
  // const cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);

  // for (let i = 0; i < 3; i++) {
  //   for (let j = 0; j < 3; j++) {
  //     let mesh = new THREE.Mesh( geometry, material );
  //     mesh.position.x = 3.2 - ( 1.6 * i );
  //     mesh.position.y = 0;
  //     mesh.position.z = 3.2 - ( 1.6 * j );
  //     scene.add(mesh);
  //   }
  // }

  // var group1 = new THREE.Object3D(), 
  //   group2 = new THREE.Object3D(),
  //   group3 = new THREE.Object3D(); 
  // scene.add(group1); 
  // scene.add(group2); 
  // scene.add(group3);

  const group1 = new THREE.Group();
  const group2 = new THREE.Group();
  const group3 = new THREE.Group();
  
  function buildCube(group) {
    for (let i = 0; i < 9; i++) {
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = i / 2;
      group.add(cube);
    }
  }

  buildCube(group1);
  buildCube(group2);
  buildCube(group3);

  scene.add(group1); 
  scene.add(group2); 
  scene.add(group3);

  renderer.render(scene, camera);
}

init();
