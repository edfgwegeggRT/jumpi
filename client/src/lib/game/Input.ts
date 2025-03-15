export class Input {
  private keys: Record<string, boolean> = {
    left: false,
    right: false,
    jump: false
  };
  
  constructor() {
    // Set up event listeners
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('keyup', this.handleKeyUp.bind(this));
    
    // Mobile touch controls could be added here
  }
  
  private handleKeyDown(e: KeyboardEvent): void {
    switch (e.key) {
      case 'ArrowLeft':
      case 'a':
      case 'A':
        this.keys.left = true;
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        this.keys.right = true;
        break;
      case 'ArrowUp':
      case 'w':
      case 'W':
      case ' ':
        this.keys.jump = true;
        e.preventDefault(); // Prevent space from scrolling the page
        break;
    }
  }
  
  private handleKeyUp(e: KeyboardEvent): void {
    switch (e.key) {
      case 'ArrowLeft':
      case 'a':
      case 'A':
        this.keys.left = false;
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        this.keys.right = false;
        break;
      case 'ArrowUp':
      case 'w':
      case 'W':
      case ' ':
        this.keys.jump = false;
        break;
    }
  }
  
  getInput(): { left: boolean; right: boolean; jump: boolean } {
    return this.keys;
  }
}
