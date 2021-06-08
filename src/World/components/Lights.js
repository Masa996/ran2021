import { DirectionalLight, HemisphereLight } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

class Lights{
	constructor(mainX, mainY, mainZ)
	{
		this.mainX=mainX;
		this.mainY=mainY;
		this.mainZ=mainZ;
	}
	createLights() {
	  const ambientLight = new HemisphereLight(
		'white',
		'darkslategrey',
		5,
	  );

	  const mainLight = new DirectionalLight('white', 4);
	  mainLight.position.set(this.mainX, this.mainY, this.mainZ);

	  return { ambientLight, mainLight };
	}
}
export { Lights };
