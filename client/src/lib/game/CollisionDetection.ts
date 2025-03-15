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
  
  resolveCollision(player: any, platform: any): void {
    // Calculate overlap on x and y axes
    const overlapX =
      player.x < platform.x
        ? player.x + player.width - platform.x
        : platform.x + platform.width - player.x;
    
    const overlapY =
      player.y < platform.y
        ? player.y + player.height - platform.y
        : platform.y + platform.height - player.y;
    
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
