from keras.preprocessing import image
from keras.models import Model
from keras.applications.vgg16 import VGG16 ,  preprocess_input
import numpy as np


class featureExtractor:
    def __init__(self):
        
        base_model = VGG16(weights='imagenet' )
        self.model = Model(inputs=base_model.input, outputs=base_model.get_layer('fc1').output)
        self.model = base_model
        

    def extract(self,img):
        img = img.resize((224,224))
        img = img.convert('RGB')
        img = image.img_to_array(img)
        x = np.expand_dims(img , axis=0)
        x = preprocess_input(x)

        feature = self.model.predict(x)[0]
        return feature / np.linalg.norm(feature)  # Normalize

  

