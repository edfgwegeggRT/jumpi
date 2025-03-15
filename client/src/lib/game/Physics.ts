import { Player } from './Player';

export class Physics {
  private gravity: number = 1000;
  private terminalVelocity: number = 600;
  private friction: number = 0.8;
  
  applyPhysics(player: Player, deltaTime: number): void {
    // Apply gravity
    player.vy += this.gravity * deltaTime;
    
    // Limit falling speed to terminal velocity
    if (player.vy > this.terminalVelocity) {
      player.vy = this.terminalVelocity;
    }
    
    // Apply friction when on ground
    if (player.grounded) {
      player.vx *= this.friction;
      
      // Reset vertical velocity when on ground
      player.vy = 0;
      
      // If velocity is very small, stop completely
      if (Math.abs(player.vx) < 5) {
        player.vx = 0;
      }
    }
    
    // Reset grounded state (will be set true again if collision detected)
    player.grounded = false;
  }
}
