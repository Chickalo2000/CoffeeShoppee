(function() {
  // Create a new Planetary.js planet instance.
  var globe = planetaryjs.planet();

  // Load our custom autorotate plugin with a rotation speed of 4 deg/sec.
  globe.loadPlugin(autorotate(4));

  // Load the earth plugin which draws oceans, land, and borders.
  globe.loadPlugin(planetaryjs.plugins.earth({
    topojson: { file: '/world-110m-withlakes.json' },
    oceans:   { fill: '#3B2F2F' },
    land:     { fill: '#C8A165' },
    borders:  { stroke: '#4D2B1F' }
  }));

  // Load our custom lakes plugin to draw lakes.
  globe.loadPlugin(lakes({ fill: '#3B2F2F' }));

  // Load the pings plugin (for animated pings on the globe).
  globe.loadPlugin(planetaryjs.plugins.pings());

  // Load the zoom and drag plugins.
  globe.loadPlugin(planetaryjs.plugins.zoom({
    scaleExtent: [130, 130]
  }));
  globe.loadPlugin(planetaryjs.plugins.drag({
    // Pause autorotation while dragging.
    onDragStart: function() {
      this.plugins.autorotate.pause();
    },
    onDragEnd: function() {
      this.plugins.autorotate.resume();
    }
  }));

  // Set the globe's initial scale, offset, and rotation.
  globe.projection.scale(175).translate([175, 175]).rotate([0, -10, 0]);

  // -----------------------------
  // Fixed Pings for Selected Regions
  // -----------------------------
  // Create an array for storing ping data for click detection.
  var storedPings = [
    { lng: 174.885971, lat: -40.900557, name: "New Zealand" },
    { lng: -95.712891, lat: 37.090240, name: "United States" },
    { lng: -10.940835, lat: 20.939444, name: "Mauritania" },
    { lng: 35.243322, lat: 38.963745, name: "Turkey" },
    { lng: 23.881275, lat: 55.169438, name: "Lithuania" },
    { lng: 101.975766, lat: 4.210484, name: "Malaysia" },
    { lng: 36.238414, lat: 30.585164, name: "Jordan" },
    { lng: 45.079162, lat: 23.885942, name: "Saudi Arabia" }
  ];



  // Add pings for each region.
setInterval(() => {
  storedPings.forEach(function(ping) {
    if (globe.plugins.pings) {
      globe.plugins.pings.add(ping.lng, ping.lat, { color: 'cyan', ttl: 0 });
    } else {
      console.error("The 'pings' plugin is not available.");
    }
  }); 
}, 1500);



  // -----------------------------
  // Set up the canvas.
  // -----------------------------
  var canvas = document.getElementById('rotatingGlobe');

  // Handle high-density (retina) displays.
  if (window.devicePixelRatio == 2) {
    canvas.width = 800;
    canvas.height = 800;
    var context = canvas.getContext('2d');
    context.scale(2, 2);
  }

  // -----------------------------
  // Set up mouse event listeners
  // (to distinguish dragging from clicking)
  // -----------------------------
  var mouseDownPos = null;
  var clickThreshold = 5; // in pixels

  canvas.addEventListener('mousedown', function(event) {
    mouseDownPos = [event.offsetX, event.offsetY];
  });

  canvas.addEventListener('mouseup', function(event) {
    if (!mouseDownPos) return;

    var dx = event.offsetX - mouseDownPos[0];
    var dy = event.offsetY - mouseDownPos[1];

    if (Math.sqrt(dx * dx + dy * dy) < clickThreshold) {
      // If the mouse didn't move much, treat it as a click.
      var coords = globe.projection.invert([event.offsetX, event.offsetY]);
      handlePingClick(coords);
    }
    mouseDownPos = null;
  });

  // -----------------------------
  // Handle a ping click.
  // -----------------------------
  // This function checks if a click is close enough to any stored ping.
  function handlePingClick([clickedLng, clickedLat]) {
    console.log(`User clicked at: Longitude ${clickedLng}, Latitude ${clickedLat}`);
    // Define a threshold (in degrees) to decide if a ping was hit.
    var threshold = 5;
    for (var i = 0; i < storedPings.length; i++) {
      var ping = storedPings[i];
      var dx = clickedLng - ping.lng;
      var dy = clickedLat - ping.lat;
      var distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < threshold) {
        console.log(`Ping found near: ${ping.name}`);
        showModalWithRecipe(ping);
        return;
      }
    }
    console.log("No ping near the clicked position.");
  }

  // -----------------------------
  // Display the modal with the coffee recipe.
  // -----------------------------
  function showModalWithRecipe(ping) {
    var modal = document.getElementById('recipeModal'); // Make sure this exists in your HTML
    modal.innerHTML = `
      <h2>Coffee Recipe from ${ping.name}</h2>
      <p>Region near:</p>
      <p>Longitude: ${ping.lng.toFixed(2)}, Latitude: ${ping.lat.toFixed(2)}</p>
      <a href="recipe-link-${ping.name.toLowerCase().replace(/\s+/g, '-')}.html" target="_blank">View Full Recipe</a>
    `;
    modal.style.display = 'block';
  }

  // -----------------------------
  // Draw the globe!
  // -----------------------------
  globe.draw(canvas);
  

  // -----------------------------
  // Plugin definitions.
  // -----------------------------

  // Autorotate plugin: rotates the globe by a specified number of degrees per second.
  function autorotate(degPerSec) {
    return function(planet) {
      var lastTick = null;
      var paused = false;
      planet.plugins.autorotate = {
        pause: function() { paused = true; },
        resume: function() { paused = false; }
      };
      planet.onDraw(function() {
        if (paused || !lastTick) {
          lastTick = new Date();
        } else {
          var now = new Date();
          var delta = now - lastTick;
          var rotation = planet.projection.rotate();
          rotation[0] += degPerSec * delta / 1000;
          if (rotation[0] >= 180) rotation[0] -= 360;
          planet.projection.rotate(rotation);
          lastTick = now;
        }
      });
    };
  }

  // Lakes plugin: draws lakes from the TopoJSON file.
  function lakes(options) {
    options = options || {};
    var lakesData = null;
    return function(planet) {
      planet.onInit(function() {
        var world = planet.plugins.topojson.world;
        lakesData = topojson.feature(world, world.objects.ne_110m_lakes);
      });
      planet.onDraw(function() {
        planet.withSavedContext(function(context) {
          context.beginPath();
          planet.path.context(context)(lakesData);
          context.fillStyle = options.fill || 'black';
          context.fill();
        });
      });
    };
  }
})();