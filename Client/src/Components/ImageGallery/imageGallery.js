import MDBGallery from '../Gallery/Gallery'
import MDBGalleryList from '../Gallery/GalleryList/GalleryList'
import React , {Fragment , Component} from 'react'
import windowSize from 'react-window-size'


class Gallery extends Component{

  
render(){
  const styles = {
    'margin':'10px'
  }
  
 
  let value = this.props.windowWidth
  let col = 3
  
  if(value<= 1020){
    col =2
  }
  if(value <= 660)
  {
    col=1
  }

  
  return (

    <Fragment>  
      

  
    <MDBGallery cols={col} spacing={15}  style = {styles} >
      {this.props.dataImg.map(({ cols, img, title }, i) => {
        return (
          <MDBGalleryList
            key={i}
            cols={cols || 1}
            titleClasses='rounded'
            className = "col-md-3"
            rows={2}
            styles={{ boxShadow: '0 0 3px rgba(0,0,0, .3)' }}
          >
            <img src={require("../../images/"+img)} alt={title} />
          </MDBGalleryList>
        );
      })}
    </MDBGallery>

    </Fragment>

   
  );
    }
}

export default windowSize(Gallery);
