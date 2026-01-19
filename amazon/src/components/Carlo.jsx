import React from 'react';
import { useState } from 'react';

function Carlo() {

  const arrimg = ["https://applescoop.org/image/wallpapers/iphone/black-car-reflection-19-09-2024-1726737307.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYDPxbPN2KWd-Pgd4drJe60mXvwbZ7wccryd065jhsP8f2ClQBTX3Jq85Sfj2-dsIhvPs&usqp=CAU","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTer_FUhEAUd31YztaX51u4YPgFTe9VN8wyvM9F9G4tOGJOKUvPLHA-rg1d6WM86m97060&usqp=CAU"]
  
  const [count,setCount] = useState(0)
  
  const styles = {
    
    img:{width : '100%'},
    
    main: {
      padding: '20px',
      border : "2px dashed red "
    },
    title: {
      color: '#5C6AC4', 
      textAlign:"center"
    },
    imgcr:{
      position:"relative"
    },
    

    left:{
      position:"absolute",    
        top:'150px',
      left:'0',
    },
    right : {
      position:"absolute",    
        top:'150px',
      right:'0',
    }
  };
  
  function dec(){
    if(count<=0){
      setCount(arrimg.length-1);
    }
    else{
      setCount(count-1);
    }
    console.log(count);
  }

  function inc(){
    
    if (count >= arrimg.length - 1){
      setCount(0);
    }
    else{
      setCount(count+1);
    }
    console.log(count);
  }

  return (
    <div style={styles.main}>
      <style>
        
      </style>
      <h1 style={styles.title}>Carousel</h1>
      <div style={styles.imgcr}>
        <img id="img" style={styles.img} src={arrimg[count]}></img>
        
        <button class="left bt" style={ styles.left} onClick={dec} > &lt; </button>
        <button class="rig bt" style = { styles.right} onClick={inc} > &gt;  </button>
      </div>
    </div>
  )
}

export default Carlo;