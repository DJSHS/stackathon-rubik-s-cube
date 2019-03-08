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

function init() {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);

  const controls = new OrbitControls(camera);

  camera.position.z = 12;
  camera.position.x = 12;
  camera.position.y = 12;
  // camera.lookAt(scene.position);

  controls.enableDamping = true;
  controls.rotateSpeed = 0.3;
  controls.maxDistance = 120;
  controls.minDistance = 10;
  controls.target.set(1, 1, 1);
  controls.update();

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth * 0.75, window.innerHeight * 0.97);
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
        const matEdge = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 3 });
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

  // var group1 = new THREE.Object3D(), 
  //   group2 = new THREE.Object3D(),
  //   group3 = new THREE.Object3D(); 
  // scene.add(group1); 
  // scene.add(group2); 
  // scene.add(group3);

  // const group1 = new THREE.Group();
  // const group2 = new THREE.Group();
  // const group3 = new THREE.Group();
  
  // function buildCube(group) {
  //   for (let i = 1; i < 3; i++) {
  //     const cube = new THREE.Mesh(geometry, material);

  //     const geoEdge = new THREE.EdgesGeometry(cube.geometry);
  //     const matEdge = new THREE.LineBasicMaterial({ color: 0x000000 });
  //     const wireFrame = new THREE.LineSegments(geoEdge, matEdge);
  //     wireFrame.renderOrder = 1;
  //     cube.add(wireFrame);

  //     cube.position.x = i / 2;
  //     group.add(cube);
  //   }
  // }

  // buildCube(group1);
  // buildCube(group2);
  // buildCube(group3);

  // scene.add(group1); 
  // scene.add(group2); 
  // scene.add(group3);

  function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
  }

  animate();
}

init();
