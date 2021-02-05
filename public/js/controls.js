

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
const startExperience = function() {
  //hide user-gesture overlay
  document.querySelector('#user-gesture-overlay').style.display='none';
  
  
}



AFRAME.registerComponent('pickup', {
    schema: {
    },

    init: function () {
      //let data = this.data;
        let el = this.el;  
        let active = false;

        el.addEventListener('click', function () {
            if(active){
              //if()
              test(active);
              

            }else{
              const parent = document.querySelector('#ball_stage');
              parent.remove(el);
              document.getElementById('viewer').innerHTML += '<a-entity class="orb interactive" click-drag pickup position="1 0.3 -1.7" geometry="primitive:box; width:0.4;depth:0.4:height:0.2; " material="color:rgb(255, 255, 0)" shadow>' +
              '<a-circle material="color: black;" position="0 0.3 0.21" radius="0.08"></a-circle>' + 
              '<a-circle material="color: black;" position="0 0 0.21" radius="0.1"></a-circle>'+
              '</a-entity>';
              test(active);
          }

          active = !active;
        
        });

        
    }
  });

  function test(t = "test"){
      console.log(t);
  }

  function deleteObject(){
    const allOrbs = document.getElementsByClassName('orb');
    const parent = document.querySelector('#ball_stage');
    if(allOrbs.length !=   0){
      for(i in allOrbs){
        parent.remove(allOrbs[i]);
      }
        
    }
    
}

function createObject(){
    const parent = document.querySelector('#ball_stage');
    if(parent != null){
        test("here");
        let source = "'/assets/sound/a_note.mp3';"
        parent.innerHTML += 
        '<a-entity drag-rotate-component sound="src: '+source+'" autoplay: true" class="orb interactive" click-drag pickup position="1 1 0" geometry="primitive:box; width:0.4;depth:0.4:height:0.2; " material="color:rgb(255, 255, 0)" shadow>' +
        '<a-circle material="color: black;" position="0 0.3 0.21" radius="0.08"></a-circle>' + 
        '<a-circle material="color: black;" position="0 0 0.21" radius="0.1"></a-circle>'+
        '</a-entity>';
    }
    
}


AFRAME.registerComponent('drag-rotate-component',{
  schema : { speed : {default:1}},
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
    this.ifMouseDown = false;
  },
  OnDocumentMouseMove : function(event)
  {
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