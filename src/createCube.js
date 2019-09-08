const colorArr = [
  0xff0000, // red
  0xffa500, // orange
  0xffff00, // yellow
  0xffffff, // white
  0x0000ff, // blue
  0x00ff00, // green
];

function createCube(scene) {
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
}

function removeAndCreateCube(scene) {
  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }
  createCube(scene);
}

module.exports = {
  createCube: removeAndCreateCube,
  removeAndCreateCube: removeAndCreateCube
}