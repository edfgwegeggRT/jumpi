export class CollisionDetection {
  checkCollision(obj1: any, obj2: any): boolean {
    // Simple AABB collision detection
    return (
      obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y
    );
  }
  
  // Check if player is standing on a platform
  checkGrounded(player: any, platforms: any[]): boolean {
    // Create a small sensor below the player's feet
    const footSensor = {
      x: player.x + 2,
      y: player.y + player.height,
      width: player.width - 4,
      height: 2
    };
    
    // Check if the foot sensor collides with any platform
    const isGrounded = platforms.some(platform => this.checkCollision(footSensor, platform));
    
    // Debug logging (remove in production)
    if (isGrounded !== player.grounded) {
      console.log('Grounded state changed:', isGrounded);
    }
    
    return isGrounded;
  }
  
  resolveCollision(player: any, platform: any): void {
    // Get the previous frame position (based on velocity)
    const prevX = player.x - player.vx;
    const prevY = player.y - player.vy;
    
    // Calculate overlap on x and y axes
    const overlapX =
      player.x < platform.x
        ? player.x + player.width - platform.x
        : platform.x + platform.width - player.x;
    
    const overlapY =
      player.y < platform.y
        ? player.y + player.height - platform.y
        : platform.y + platform.height - player.y;
    
    // Check approach direction
    const wasAbove = prevY + player.height <= platform.y;
    const wasBelow = prevY >= platform.y + platform.height;
    const wasLeft = prevX + player.width <= platform.x;
    const wasRight = prevX >= platform.x + platform.width;
    
    // Prioritize vertical collisions when player is falling onto a platform
    if (wasAbove && player.vy > 0) {
      player.y = platform.y - player.height;
      player.vy = 0;
      player.grounded = true;
      return;
    }
    
    // Determine which axis has the smaller overlap
    if (overlapX < overlapY) {
      // Resolve horizontal collision
      if (player.x < platform.x) {
        player.x = platform.x - player.width;
      } else {
        player.x = platform.x + platform.width;
      }
      
      // Stop horizontal movement
      player.vx = 0;
    } else {
      // Resolve vertical collision
      if (player.y < platform.y) {
        player.y = platform.y - player.height;
        player.vy = 0;
        player.grounded = true;
      } else {
        player.y = platform.y + platform.height;
        player.vy = 0;
      }
    }
  }
}
