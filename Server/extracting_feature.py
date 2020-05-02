from feature_extractor import featureExtractor
import glob
import os
import pickle
from PIL import Image

fe = featureExtractor()

for img_path in sorted(glob.glob('static/images/*.jpeg')):
    # print(img_path)
    img = Image.open(img_path)  # PIL image
    feature = fe.extract(img)
    feature_path = 'static/feature/' + os.path.splitext(os.path.basename(img_path))[0] + '.pkl'
    pickle.dump(feature, open(feature_path, 'wb'))
