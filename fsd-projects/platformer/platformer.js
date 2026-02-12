$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }

    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); // top wall
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200, "navy"); // bottom wall
    createPlatform(-50, -50, 50, canvas.height + 500); // left wall
    createPlatform(canvas.width, -50, 50, canvas.height + 100); // right wall

    //////////////////////////////////
    // ONLY CHANGE BELOW THIS POINT //
    //////////////////////////////////

    // TODO 1 - Enable the Grid
     toggleGrid();


    // TODO 2 - Create Platforms
    createPlatform(0, 625, 270,35,"Purple"); // purple for a finished platform
    createPlatform(370, 500, 50, 250, "Purple"); // purple for a finished platform
    createPlatform(535, 450, 50, 300, "Purple"); // purple for a finished platform
    createPlatform(650, 345, 350,35, "Purple"); // purple for a finished platform
    createPlatform(1030, 500, 50, 250, "Purple"); // purple for a finished platform
    createPlatform(1100, 600, 300, 35, "Purple"); // purple for a finished platform





    // TODO 3 - Create Collectables
    createCollectable("database", 375, 450);
    createCollectable("database", 800, 295);
    createCollectable("database", 1250, 550);



    
    // TODO 4 - Create Cannons


    
    
    //////////////////////////////////
    // ONLY CHANGE ABOVE THIS POINT //
    //////////////////////////////////
  }

  registerSetup(setup);
});
