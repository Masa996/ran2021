import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';

import { AnimationMixer } from 'https://unpkg.com/three@0.127.0/build/three.module.js';




class Models {
	
	constructor(paths,positions,animated)
	{
		this.paths=paths;
		this.positions=positions;
		this.animated=animated;	
	}
	
	setupModel(data) {
	  const model = data.scene.children[0];
	  const clip = data.animations[0];

	  if(clip!=null)
	  {
		  const mixer = new AnimationMixer(model);
		  const action = mixer.clipAction(clip);
		  action.play();

		  model.tick = (delta) => mixer.update(delta);
	  }
	  
	  return model;

	}
	
	async loadModels() {
	  const loader = new GLTFLoader();


/*

	const models = this.paths.flatMap(arr => {
	return arr.map(async path => {
    await foo(path);
	loader.loadAsync(path)
	});
	});*/

	//await Promise.all(promiseArray).then(loader.Load;

	var models=[];
    const promises = [];
//  ^^^^^−−−−−−−−−−−−−−−−−−−−−−−−−−− use `const` or `let`, not `var`
    
    for (let i = 0; i < this.paths.length; i++) {
//       ^^^−−−−−−−−−−−−−−−−−−−−−−−− added missing declaration
        promises.push(loader.loadAsync(this.paths[i]));
    }
//
  //  const models=[];
	Promise.all(promises)
        .then((results) => {
            for (let i = 0; i < this.paths.length; i++) {
		models.push(results[i]);
		console.log(models[i]);
  
       }
        })
        .catch((e) => {
            // handle errors here
        });


	//  const 
//	  [model1_data, model2_data, model3_data] = await Promise.all(
	  //[
	//	for(i=0;i<paths.length;i++)
	//	{
		//	loader.loadAsync(this.paths[i]),			
	//	}
	/*
		loader.loadAsync(this.paths[0]),
		loader.loadAsync(this.paths[1]),
		loader.loadAsync(this.paths[2]),*/
	  //]
	//  );

	  //console.log('Squaaawk!', models[0]);
		alert(models[1]);	
	  const model1 = this.setupModel(models[0]);
	  model1.position.set(this.positions[0], this.positions[1], this.positions[2]);
	 // model1.position.set(0, 0, 2.5);
	  model1.name="parrot";

	  const model2 = this.setupModel(models[1]);
	 // model2.position.set(7.5, 0, -10);
	 model2.position.set(this.positions[3], this.positions[4], this.positions[5]);

	  model2.name="flamingo";	
		
	  const model3 = this.setupModel(models[2]);
	//  model3.position.set(0, -2.5, -10);
      model3.position.set(this.positions[6], this.positions[7], this.positions[8]);

	  model3.name="stork";
	  
	  
	  return {
		model1,
		model2,
		model3,
	  };
	}
}
export { Models };
