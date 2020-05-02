import os
from flask import Flask, request ,jsonify
from flask_cors import CORS, cross_origin
from feature_extractor import featureExtractor
import glob
import pickle
import numpy as np
from keras.preprocessing import image


# Read image features
fe = featureExtractor()
features = []
img_paths = []
for feature_path in glob.glob("static/feature/*"):
    features.append(pickle.load(open(feature_path, 'rb')))
    img_paths.append('static/images/' + os.path.splitext(os.path.basename(feature_path))[0] + '.jpeg')






app = Flask(__name__)

CORS(app)
cors = CORS(app,resources={
    r"/foo":{
        'origins':"*"

    }
})





@app.route("/hello",methods= ['GET'])
def hello():
    return jsonify({
        'message':'Hello'
    })




@app.route('/upload', methods=['POST' , 'GET'])
@cross_origin()
def fileUpload():
    

    
    Path = os.getcwd()
    target = os.path.join(Path ,'static/upload')
   
    file = request.files['image']
    filename = file.filename

    destinaton = "/".join([target , filename])

    try:
        file.save(destinaton)
        print("file saved successsfully")

    except:
        print("file exist ")

    try:
        query_img = image.load_img("./static/upload/"+f"{filename}")
        print(f"{filename} loaded successfully")
    except:
        print("Something went wrong")

    query = fe.extract(query_img)
    
    dists = np.linalg.norm(features - query, axis=1)  # Do search
    ids = np.argsort(dists)[:10] # Top 10 results
    scores = [ img_paths[id] for id in ids]
    

    

    return jsonify({
    'message':'file uploaded to the server',
    'predictions':scores
    })

    
    
app.run(debug=True)

