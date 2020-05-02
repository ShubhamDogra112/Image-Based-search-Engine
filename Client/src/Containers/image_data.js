import React  , {useState , Fragment}from 'react'
import axios from "axios"
import path from 'path'
import ImageGallery from '../Components/ImageGallery/imageGallery'
import Header from '../Components/Header/header'


const Image =(props)=>{

    const [file , setFile] = useState('')
    const [url ,setUrl] = useState('')
    const [pred , setPred] = useState({
        received:false,
        data:null
    })

    const fileSelectHandler = (event)=>{
        setFile(event.target.files[0])

        let url =URL.createObjectURL(event.target.files[0])
        setUrl(url)

    }

    const fileUploadHandler = async ()=>{

        const fd = new FormData()
        fd.append('image' , file)

        try{
        const res = await axios.post('http://localhost:5000/upload' , fd ,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        
        console.log(res)
        setPred({
            received:true,
            data:res.data.predictions
        })

        }
        catch(err){
            console.log(err)
        }   

        

    }

    
    let img_data = []
    // let image_gallery = null

    if(pred.received){

        if(img_data.length !==0){
            img_data = []
        }

        for (let src of pred['data']){
           let path_img = path.basename(src)
           
          
        
        
           

            let img = {
                img:path_img,
                cols:1,
                title:'image',
                overlay:'lime-slight'

            }

            img_data.push(img)
            
    
        }
        

    // image_gallery =     <ImageGallery    dataImg = {img_data}  />
    



    //     images = pred.data.map((src,index)=>{
    //        let path_img = path.basename(src)
        
    //         return <img  src = {require('../images/'+path_img)} key = {index} alt = 'img' />
    //     })
    }

    return(

        <Fragment>

        <Header     change = {fileSelectHandler} click = {fileUploadHandler}  url = {url}  />
        <ImageGallery dataImg ={img_data}   />

        

        
       

    </Fragment>

    )
} 

export default Image