import React from 'react'
import {MDBBtn} from 'mdbreact'
import "./header.css"



const Header = (props)=>{



    

  
    return(
        <div className = 'header'>

            
            <h1 className= "heading" >Image Search Engine</h1>


            <input  type="file" name = "file" id = "file" className= "Input" onChange = {(event)=>props.change(event)}  />
            <label for = 'file'  className= "input-file-trigger">Choose file</label>
            <img src={props.url} className="img-fluid img-thumbnail z-depth-1"  alt = ''/>
            
            <MDBBtn  color="red" className="red accent-2" onClick = {props.click}  >Search</MDBBtn>



        </div>
    )
}


export default Header