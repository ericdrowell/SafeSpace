const PLANE_XY_BUFFERS = {
  // 24 elements = 8 vertices
  position: [    
    -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1, // Front face      
  ],
  texture: [    
    0, 0, 1, 0, 1, 1, 0, 1, // Front face   
  ],
  index: [
    0, 1, 2, 0, 2, 3, // Front face
  ]
};

const PLANE_XZ_BUFFERS = {
  // 24 elements = 8 vertices
  position: [     
    -1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1, // Top face       
  ],
  texture: [     
    0, 1, 0, 0, 1, 0, 1, 1, // Top face    
  ],
  index: [
    0, 1, 2, 0, 2, 3, // Top face
  ]
};

const PLANE_YZ_BUFFERS = {
  // 24 elements = 8 vertices
  position: [      
    1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, // Right face    
  ],
  texture: [      
    1, 0, 1, 1, 0, 1, 0, 0, // Right face    
  ],
  index: [
    0, 1, 2, 0, 2, 3, // Right face
  ]
};

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
