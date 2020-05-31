import Cube from "./Cube";
import "bootstrap/dist/css/bootstrap.css";

(function () {
  let cube = new Cube();
  cube.setupScene(document.getElementById("canvas"), "#ff0000");


  const actions = {
    right: () => cube.setTransfromationMatrix(cube.move(1, 0, 0)),
    left: () => cube.setTransfromationMatrix(cube.move(-1, 0, 0)),
    down: () => cube.setTransfromationMatrix(cube.move(0, -1, 0)),
    up: () => cube.setTransfromationMatrix(cube.move(0, 1, 0)),
    back: () => cube.setTransfromationMatrix(cube.move(0, 0, 1)),
    forward: () => cube.setTransfromationMatrix(cube.move(0, 0, -1)),
    rotateClockwiseY: () => cube.setTransfromationMatrix(cube.rotateY(5, 0, 0)),
    rotateCounterClockwiseY: () => cube.setTransfromationMatrix(cube.rotateY(-5, 0, 0)),
    rotateClockwiseX: () => cube.setTransfromationMatrix(cube.rotateX(5, 0, 0)),
    rotateCounterClockwiseX: () => cube.setTransfromationMatrix(cube.rotateX(-5, 0, 0)),
    rotateClockwiseZ: () => cube.setTransfromationMatrix(cube.rotateZ(-5, 0, 0)),
    rotateCounterClockwiseZ: () => cube.setTransfromationMatrix(cube.rotateZ(5, 0, 0)),
    scaleup: () => cube.setTransfromationMatrix(cube.scale(2, 2, 2)),
    scaledown: () => cube.setTransfromationMatrix(cube.scale(0.5, 0.5, 0.5)),
    front: () => cube.setCameraProjectionMatrix(cube.frontView()),
    onepoint: () => cube.setCameraProjectionMatrix(cube.onePointProjection(0.5)),
    angled: () => cube.setCameraProjectionMatrix(cube.angledProjection(15, 1)),
    reset: () => cube.setupScene(document.getElementById("canvas"), "#ff0000"),
    multi: () => cube.multicolorCube(),
    defaultCube: () => cube.colorCube("#ff0000"),
    wire: () => cube.wireframeCube("#ff0000"),
    flat: () => cube.flatCube("#ff0000")
  };


  [...document.getElementsByClassName("action")].forEach((button) => {
    button.addEventListener("click", (event) => {
      actions[event.target.value]()
    })
  })

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      actions.right()
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      actions.left()
    }
    if (event.key === "w") {
      event.preventDefault();
      actions.up()
    }
    if (event.key === "s") {
      event.preventDefault();
      actions.down()
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      actions.back()
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      actions.forward()
    }
    if (event.key === "e") {
      event.preventDefault();
      actions.rotateClockwiseY()
    }
    if (event.key === "q") {
      event.preventDefault();
      actions.rotateCounterClockwiseY()
    }
    if (event.key === "f") {
      event.preventDefault();
      actions.rotateClockwiseX()
    }
    if (event.key === "r") {
      event.preventDefault();
      actions.rotateCounterClockwiseX()
    }
    if (event.key === "z") {
      event.preventDefault();
      actions.rotateCounterClockwiseZ()
    }
    if (event.key === "x") {
      event.preventDefault();
      actions.rotateClockwiseZ()
    }

    if (event.key == "=") {
      event.preventDefault();
      actions.scaleup()
    }
    if (event.key == "-") {
      event.preventDefault();
      actions.scaledown()
    }

    if (event.key == "1") {
      event.preventDefault();
      actions.front()
    }
    if (event.key == "2") {
      event.preventDefault();
      actions.onepoint()
    }
    if (event.key == "3") {
      event.preventDefault();
      actions.angled()
    }

    if (event.key == "0") {
      event.preventDefault();
      actions.reset()
    }

    if (event.key == "c") {
      event.preventDefault();
      actions.multi()
    }
    if (event.key == "v") {
      event.preventDefault();
      event.defaultCube();
    }
    if (event.key == "b") {
      event.wire();
    }
    if (event.key == "n") {
      event.flat();
    }
  });
})();

function up() { }
