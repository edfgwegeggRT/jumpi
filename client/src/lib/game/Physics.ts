import { Player } from './Player';

export class Physics {
  private gravity: number = 1000;
  private terminalVelocity: number = 600;
  private friction: number = 0.8;
  
  applyPhysics(player: Player, deltaTime: number): void {
    // Apply gravity if not on ground
    if (!player.grounded) {
      player.vy += this.gravity * deltaTime;
      
      // Limit falling speed to terminal velocity
      if (player.vy > this.terminalVelocity) {
        player.vy = this.terminalVelocity;
      }
    } else {
      // Apply friction when on ground
      player.vx *= this.friction;
      
      // If velocity is very small, stop completely
      if (Math.abs(player.vx) < 5) {
        player.vx = 0;
      }
    }
  }
}
