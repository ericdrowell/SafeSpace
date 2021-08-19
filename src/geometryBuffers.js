let CUBE_BUFFERS = {
  // 72 elements = 24 vertices
  position: [    
    -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1, // Front face    
    -1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1, -1, // Back face    
    -1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1, // Top face    
    -1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1, // Bottom face    
    1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, // Right face    
    -1, -1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1 // Left face
  ],
  // 48 elements = 24 vertices
  texture: [    
    0, 0, 1, 0, 1, 1, 0, 1, // Front face   
    1, 0, 1, 1, 0, 1, 0, 0, // Back face   
    0, 1, 0, 0, 1, 0, 1, 1, // Top face    
    1, 1, 0, 1, 0, 0, 1, 0, // Bottom face   
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

let PLANE_BUFFERS = {
  // 24 elements = 8 vertices
  position: [    
    -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1, // Front face    
    -1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1, -1, // Back face   
  ],
  // 16 elements = 4 vertices
  texture: [    
    0, 0, 1, 0, 1, 1, 0, 1, // Front face   
    1, 0, 1, 1, 0, 1, 0, 0, // Back face  
  ],
  index: [
    0, 1, 2, 0, 2, 3, // Front face
    4, 5, 6, 4, 6, 7, // Back face
  ]
};
