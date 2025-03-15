export class Input {
  private keys: { [key: string]: boolean } = {};

  constructor() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });
  }

  get left(): boolean {
    return this.keys['ArrowLeft'] || this.keys['KeyA'];
  }

  get right(): boolean {
    return this.keys['ArrowRight'] || this.keys['KeyD'];
  }

  get jump(): boolean {
    return this.keys['Space'] || this.keys['ArrowUp'] || this.keys['KeyW'];
  }
}