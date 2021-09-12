const CUBE_BUFFERS = {
  // 72 elements = 24 vertices
  position: [    
    -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1, // Front face    
    -1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1, -1, // Back face    
    -1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1, // Top face    
    -1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1, // Bottom face    
    1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, // Right face    
    -1, -1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1 // Left face
  ],
  texture: [    
    0, 0, 1, 0, 1, 1, 0, 1, // Front face   
    1, 0, 1, 1, 0, 1, 0, 0, // Back face   
    1, 1, 0, 1, 0, 0, 1, 0, // Top face    
    0, 1, 0, 0, 1, 0, 1, 1, // Bottom face   
    1, 0, 1, 1, 0, 1, 0, 0, // Right face    
    0, 0, 1, 0, 1, 1, 0, 1 // Left face
  ],
  index: [
    0, 1, 2, 0, 2, 3, // Front face
    4, 5, 6, 4, 6, 7, // Back face
    8, 9, 10, 8, 10, 11, // Top face
    12, 13, 14, 12, 14, 15, // Bottom face
    16, 17, 18, 16, 18, 19, // Right face
    20, 21, 22, 20, 22, 23 // Left face
  ]
};

const SPHERE_BUFFERS = {};
const SPHERE_LAT_BANDS = 24; // orig 24
const SPHERE_LONG_SEGS = 45; // orig 45

function geometry_buffers_create_sphere_buffers() {
  var vertices = [], texCoords = [], indices = [];

  for (var lat = 0; lat <= SPHERE_LAT_BANDS; ++lat)
  {
    const v     = lat / SPHERE_LAT_BANDS; // also used as the vertical texture coordinate
    const theta = v * Math.PI;    // 0 <= theta <= pi
    
    const y  = Math.cos(theta);   // y = cos(theta) - constant per latitude "slice"
    const st = Math.sin(theta);   // this will det. the radius of the latitude line
    
    for (var lng = 0; lng <= SPHERE_LONG_SEGS; ++lng)
    {
      const u   = lng / SPHERE_LONG_SEGS; // also used as the horizontal texture coordinate
      const phi = (lng / SPHERE_LONG_SEGS) * 2.0 * Math.PI; // 0 <= phi <= 2 * pi
      const x = st * Math.cos(phi); // x = sin(theta) * cos(phi)
      const z = st * Math.sin(phi); // z = sin(theta) * sin(phi)
      
      vertices.push(x);
      vertices.push(y);
      vertices.push(z);

      texCoords.push(u);
      texCoords.push(v);
    }
  }

  // for each "patch" of the sphere surface
  var crtLine = 0, nextLine = SPHERE_LONG_SEGS + 1;
  for (var lat = 0; lat < SPHERE_LAT_BANDS; ++lat)
  {
    for (var lng = 0; lng < SPHERE_LONG_SEGS; ++lng)
    {
      const first = crtLine + lng, second = nextLine + lng;
      
      // watch out for degenerate triangles
      if (lat > 0)
      {
        // vertex indices for the first triangle of the patch
        indices.push(first);
        indices.push(second);
        indices.push(first + 1);
      }

      // watch out for degenerate triangles
      if (lat + 1 < SPHERE_LAT_BANDS)
      {
        // same for the second triangle
        indices.push(second);
        indices.push(second + 1);
        indices.push(first + 1);
      }      
    }
    crtLine = nextLine; nextLine += SPHERE_LONG_SEGS + 1;
  }

  SPHERE_BUFFERS.position = vertices;
  SPHERE_BUFFERS.texture = texCoords;
  SPHERE_BUFFERS.index = indices; 
}

geometry_buffers_create_sphere_buffers()