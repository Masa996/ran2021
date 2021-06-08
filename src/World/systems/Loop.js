import { Clock } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

const clock = new Clock();

class Loop {
  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      // svaki animirani objekat ažurirati u trajanju od 1 frejm
      this.tick();

      // renderovanje frame-a
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    const delta = clock.getDelta();
    for (const object of this.updatables) {	
      object.tick(delta);
    }
  }
}

export { Loop };
