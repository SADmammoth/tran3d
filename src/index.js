import Cube from "./Cube";

(function () {
  let cube = new Cube();
  cube.setupScene(document.body, "#ff0000");

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      cube.setTransfromationMatrix(cube.move(1, 0, 0));
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      cube.setTransfromationMatrix(cube.move(-1, 0, 0));
    }
    if (event.key === "w") {
      event.preventDefault();
      cube.setTransfromationMatrix(cube.move(0, 1, 0));
    }
    if (event.key === "s") {
      event.preventDefault();
      cube.setTransfromationMatrix(cube.move(0, -1, 0));
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      cube.setTransfromationMatrix(cube.move(0, 0, 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      cube.setTransfromationMatrix(cube.move(0, 0, -1));
    }
    if (event.key === "e") {
      event.preventDefault();
      cube.setTransfromationMatrix(cube.rotateY(5, 0, 0));
    }
    if (event.key === "q") {
      event.preventDefault();
      cube.setTransfromationMatrix(cube.rotateY(-5, 0, 0));
    }
    if (event.key === "f") {
      event.preventDefault();
      cube.setTransfromationMatrix(cube.rotateX(5, 0, 0));
    }
    if (event.key === "r") {
      event.preventDefault();
      cube.setTransfromationMatrix(cube.rotateX(-5, 0, 0));
    }
    if (event.key === "z") {
      event.preventDefault();
      cube.setTransfromationMatrix(cube.rotateZ(5, 0, 0));
    }
    if (event.key === "x") {
      event.preventDefault();
      cube.setTransfromationMatrix(cube.rotateZ(-5, 0, 0));
    }

    if (event.key == "=") {
      event.preventDefault();
      cube.setTransfromationMatrix(cube.scale(2, 2, 2));
    }
    if (event.key == "-") {
      event.preventDefault();
      cube.setTransfromationMatrix(cube.scale(0.5, 0.5, 0.5));
    }

    if (event.key == "1") {
      event.preventDefault();
      cube.setCameraProjectionMatrix(cube.frontView());
    }
    if (event.key == "2") {
      event.preventDefault();
      cube.setCameraProjectionMatrix(cube.onePointProjection(0.5));
    }
    if (event.key == "3") {
      event.preventDefault();
      cube.setCameraProjectionMatrix(cube.angledProjection(15, 1));
    }

    if (event.key == "0") {
      event.preventDefault();
      cube.setupScene(document.body, "#ff0000");
    }

    if (event.key == "c") {
      event.preventDefault();
      cube.multicolorCube();
    }
    if (event.key == "v") {
      event.preventDefault();
      cube.colorCube("#ff0000");
    }
    if (event.key == "b") {
      event.preventDefault();
      cube.wireframeCube("#ff0000");
    }
    if (event.key == "n") {
      event.preventDefault();
      cube.flatCube("#ff0000");
    }
  });
})();
