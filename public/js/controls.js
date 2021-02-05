
//Starting the application
AFRAME.registerComponent('start-experience', {
  init: function () {
    //we can't play sound on some browsers until we have some user interaction
    //this means we should only start playing ambient music after this button is clicked
    console.log('scene loaded');
    document.querySelector('#loading-animation').style.display='none';
    document.querySelector('#user-gesture-button').style.display='block';
  }
});

//function called from user-gesture click
function startExperience(){
  //hide user-gesture overlay
  document.querySelector('#user-gesture-overlay').style.display='none';
  
  //start all ambient music
  const ambientSounds = document.querySelectorAll('.ambient-music');
  ambientSounds.forEach(function(soundEntity) {
    soundEntity.components.sound.playSound();
  });
}


//Allowing objects to be picked up

AFRAME.registerComponent('pickup', {
    schema: {
    },

    init: function () {
        let el = this.el;  
        let active = false;

        el.addEventListener('click', function () {
            if(active){
              //Placing back on the stand
              const parent = document.querySelector('#viewer');
              parent.innerHTML = '<a-entity cursor="rayOrigin:mouse;" raycaster="far:20; interval:200; objects:.interactive "></a-entity>';
              createObject();
            }else{

              //Tying the object to the camera to 'pickup'
              deleteObject();
              document.getElementById('viewer').innerHTML += '<a-entity drag-rotate-component class="orb interactive" pickup position="1 0.3 -1.7" geometry="primitive:box; width:0.4;depth:0.4:height:0.2; " material="color:rgb(255, 255, 0)" shadow>' +
              '<a-circle material="color: black;" position="0 0.3 0.21" radius="0.08"></a-circle>' + 
              '<a-circle material="color: black;" position="0 0 0.21" radius="0.1"></a-circle>'+
              '</a-entity>';
          }

          active = !active;
        
        });

        
    }
  });

  //Deleting objects
  function deleteObject(){
    const allOrbs = document.getElementsByClassName('orb');
    const parent = document.querySelector('#ball_stage');
    if(allOrbs.length !=   0){
      for(i in allOrbs){
        parent.remove(allOrbs[i]);
      }
    }
}

//Creating new objects
function createObject(){
    const parent = document.querySelector('#ball_stage');
    if(parent != null){
        parent.innerHTML += 
        '<a-entity class="orb interactive" pickup position="1 1 0" geometry="primitive:box; width:0.4;depth:0.4:height:0.2; " material="color:rgb(255, 255, 0)" shadow>' +
        '<a-circle material="color: black;" position="0 0.3 0.21" radius="0.08"></a-circle>' + 
        '<a-circle material="color: black;" position="0 0 0.21" radius="0.1"></a-circle>'+
        '</a-entity>';
    }
}

//Component to have the speaker object follow the mouse

AFRAME.registerComponent('drag-rotate-component',{
  schema : { speed : {default:2}},
  init : function(){
    this.ifMouseDown = false;
    this.x_cord = 0;
    this.y_cord = 0;
    document.addEventListener('mousedown',this.OnDocumentMouseDown.bind(this));
    document.addEventListener('mouseup',this.OnDocumentMouseUp.bind(this));
    document.addEventListener('mousemove',this.OnDocumentMouseMove.bind(this));

  },
  OnDocumentMouseDown : function(event){
    this.ifMouseDown = true;
    this.x_cord = event.clientX;
    this.y_cord = event.clientY;
  },
  OnDocumentMouseUp : function(){
    //document.getElementById('viewer').setAttribute("look-controls");
    this.ifMouseDown = false;
  },
  OnDocumentMouseMove : function(event)
  {
    //if the mouse is moving, rotate 
    if(this.ifMouseDown)
    {
      var temp_x = event.clientX-this.x_cord;
      var temp_y = event.clientY-this.y_cord;
      if(Math.abs(temp_y)<Math.abs(temp_x))
      {
        this.el.object3D.rotateY(temp_x*this.data.speed/1000);
      }
      else
      {
        this.el.object3D.rotateX(temp_y*this.data.speed/1000);
      }
      this.x_cord = event.clientX;
      this.y_cord = event.clientY;
    }
  }
});