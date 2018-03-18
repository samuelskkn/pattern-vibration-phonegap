/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
var state="stopped" 

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

    }
};

function vibrate(typ){
  if(typ==1){ 
    navigator.vibrate(200); 
  } else if(typ==2){
    navigator.vibrate(1500);
  } else if(typ==3){
    navigator.vibrate([1000, 1000, 1000]);
  } else if(typ==4){
    navigator.vibrate([800, 500, 800]);
  } else if(typ==5){
    navigator.vibrate([1000, 1000, 1000, 1000, 1000]);
  } else if(typ==6){
    navigator.vibrate([500, 500, 500, 500, 500]);
  }        
}
var patternTime; var endlessTimer;
function launchVibrate(){
  pattern=document.getElementById("pattern").value;
  if(pattern==0){
    navigator.vibrate(60*1000);
    patternTime=59.5*1000;
  } else if(pattern==1){
      navigator.vibrate(60*1000);
      patternTime=59.5*1000;     
  } else if(pattern==2){
      navigator.vibrate([300, 300]);
      patternTime=600;
  } else if(pattern==3){
      navigator.vibrate([500, 500]);
      patternTime=1000;
  } else if(pattern==4){
      navigator.vibrate([1000, 1000]);
      patternTime=2000;
  }
  patternTime = patternTime-200;
  console.log("launchVibrate, patternTime: "+patternTime+", pattern: "+pattern);
  endlessTimer = setTimeout(function() {
    launchVibrate();
    console.log("in launchVibrate, patternTime: "+patternTime);
  },patternTime)
}


var countdown; var x;
function startButtonClicked(element){
    if(state=="stopped"){ //start clicked
      if(document.getElementById("timer").value==0) {
        console.log("timer=0");
        alert("Please select a Timer option.");
        return false;      
      }    
      state="started"
      countdown=document.getElementById("timer").value;
      var hours = Math.floor((countdown % (60 * 60 * 24)) / (60 * 60));
      var minutes = Math.floor((countdown % ( 60 * 60)) / 60);
      var seconds = Math.floor((countdown % 60));
      document.getElementById("startButton").innerHTML ="Stop " + hours + "h " + minutes + "m " + seconds + "s ";
      //navigator.vibrate(1000*60*60); 
      launchVibrate();
      // Update the count down every 1 second
      x = setInterval(function() {
        countdown--;
        var hours = Math.floor((countdown % (60 * 60 * 24)) / (60 * 60));
        var minutes = Math.floor((countdown % ( 60 * 60)) / 60);
        var seconds = Math.floor((countdown % 60));
        document.getElementById("startButton").innerHTML ="Stop " + hours + "h " + minutes + "m " + seconds + "s ";
        //document.getElementById("startButton").innerHTML ="Stop " + countdown;
        if (countdown <= 0) {
          clearInterval(x);
          state="stopped"    
          document.getElementById("startButton").innerHTML ="Start";
          navigator.vibrate(0);  
          clearTimeout(endlessTimer); 
          clearInterval(x); 
        }
      }, 1000);
      
    } else { //stop clicked
      state="stopped"    
      document.getElementById("startButton").innerHTML ="Start";
      navigator.vibrate(0); 
      clearTimeout(endlessTimer);  
      clearInterval(x);    
    }
}