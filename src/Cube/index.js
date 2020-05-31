import * as THREE from "three";
import { cos, sin, multiply, matrix } from "mathjs";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class Cube {
  setupScene = (root, cubeColor) => {
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    root.appendChild(this.renderer.domElement);

    //* Camera
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.camera.position.set(-4, 5, 5);
    this.camera.rotateX(-0.8);
    this.camera.rotateY(-0.5);
    this.camera.rotateZ(-0.4);

    //* Geometry
    let geometry = new THREE.CubeGeometry(1, 1, 1);
    let material = new THREE.MeshPhongMaterial({
      color: cubeColor,
      vertexColors: THREE.FaceColors,
    });
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.castShadow = true;
    this.scene.add(this.cube);

    //* Helpers
    let axesHelper = new THREE.AxesHelper(5);
    axesHelper.rotation.y = 0;
    this.scene.add(axesHelper);

    let size = 50;
    let divisions = 10;

    let gridHelper = new THREE.GridHelper(size, divisions);
    gridHelper.position.y -= 0.5;

    this.scene.add(gridHelper);

    let plane = new THREE.PlaneBufferGeometry(50, 50, 1, 1);
    let planeMaterial = new THREE.MeshPhongMaterial({
      color: "#c4c4c4",
      side: THREE.FrontSide,
    });

    let floor = new THREE.Mesh(plane, planeMaterial);
    floor.receiveShadow = true;
    floor.rotation.x = THREE.Math.degToRad(-90);
    floor.position.y = -0.55;
    this.scene.add(floor);

    //* Lights
    let ambientLight = new THREE.AmbientLight(0x333333);

    let light = new THREE.PointLight(0xffffff, 1.0, 100);
    light.position.y += 2;
    light.position.z += 10;
    light.castShadow = true;
    this.scene.add(ambientLight, light);
    var controls = new OrbitControls(this.camera, this.renderer.domElement);
    // controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    // controls.dampingFactor = 0.05;

    // controls.screenSpacePanning = false;

    // controls.minDistance = 100;
    // controls.maxDistance = 500;

    // controls.maxPolarAngle = Math.PI / 2;

    let animate = () => {
      requestAnimationFrame(animate);

      controls.update();

      this.renderer.render(this.scene, this.camera);
    };

    animate();
  };

  setTransfromationMatrix(matrix) {
    console.log(matrix.flat());
    this.cube.applyMatrix4(new THREE.Matrix4().set(...matrix.flat()));
    this.renderer.render(this.scene, this.camera);
  }

  setCameraProjectionMatrix(matrix) {
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 0;
    this.camera.projectionMatrix = new THREE.Matrix4().fromArray(matrix.flat());

    this.renderer.render(this.scene, this.camera);
  }

  move = (x, y, z) => {
    return [
      [1, 0, 0, x],
      [0, 1, 0, y],
      [0, 0, 1, z],
      [0, 0, 0, 1],
    ];
  };

  rotateX = (degX) => {
    let x = THREE.Math.degToRad(degX);
    let a = cos(x);
    let b = -sin(x);
    let c = sin(x);
    return [
      [1, 0, 0, 0],
      [0, a, b, 0],
      [0, c, a, 0],
      [0, 0, 0, 1],
    ];
  };

  rotateY = (degY) => {
    let y = THREE.Math.degToRad(degY);
    let a = cos(y);
    let b = -sin(y);
    let c = sin(y);
    return [
      [a, 0, c, 0],
      [0, 1, 0, 0],
      [b, 0, a, 0],
      [0, 0, 0, 1],
    ];
  };

  rotateZ = (degZ) => {
    let z = THREE.Math.degToRad(degZ);
    let a = cos(z);
    let b = -sin(z);
    let c = sin(z);
    return [
      [a, b, 0, 0],
      [c, a, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ];
  };

  scale = (x = 1, y = 1, z = 1) => {
    return [
      [x, 0, 0, 0],
      [0, y, 0, 0],
      [0, 0, z, 0],
      [0, 0, 0, 1],
    ];
  };

  frontView = () => {
    return [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 2],
    ].flat();
  };

  onePointProjection = (r) => {
    return [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, r],
      [0, 0, 0, 2],
    ].flat();
  };

  angledProjection = (angle, distance) => {
    let l = distance;
    let al = THREE.Math.degToRad(angle);

    return [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [l * cos(al), l * sin(al), 0, 0],
      [0, 0, 0, 2],
    ].flat();
  };

  multicolorCube = () => {
    let colors = [
      "#c40000",
      "#00c400",
      "#0000c4",
      "#c4c400",
      "#00c4c4",
      "#c400c4",
    ];

    this.cube.material = colors.map((color) => {
      return new THREE.MeshPhongMaterial({ color, side: THREE.DoubleSide });
    });
  };

  colorCube = (color) => {
    this.cube.material = new THREE.MeshPhongMaterial({
      color,
      side: THREE.DoubleSide,
    });
  };

  wireframeCube = (color) => {
    this.cube.material = new THREE.MeshBasicMaterial({
      color,
      wireframe: true,
      side: THREE.DoubleSide,
    });
  };

  
  flatCube = (color) => {
    this.cube.material = new THREE.MeshBasicMaterial({
      color,
      side: THREE.DoubleSide,
    });
  };

  // function move(affMatrix) {
  //   let cubePos = cube.getWorldPosition(new THREE.Vector3(0, 0, 0));
  //   let mat = math.matrix(affMatrix);
  //   console.log(
  //     math.multiply(
  //       mat.subset(math.index([0, 1, 2], [0, 1, 2])),
  //       cubePos.toArray()
  //     ),
  //     mat.subset(math.index([0, 1, 2], [3]))
  //   );
  //   let newPos = math
  //     .add(
  //       math.transpose(
  //         math.multiply(
  //           mat.subset(math.index([0, 1, 2], [0, 1, 2])),
  //           cubePos.toArray()
  //         )
  //       ),
  //       mat
  //         .subset(math.index([0, 1, 2], [3]))
  //         .toArray()
  //         .flat()
  //     )
  //     .toArray();
  //   console.log(cubePos.toArray(), newPos);
  //   cube.position.set(0, 0, 0);
  //   cube.translateX(newPos[0]);
  //   cube.translateY(newPos[1]);
  //   cube.translateZ(newPos[2]);
  //   renderer.render(scene, camera);
  // }
}
