# -*- coding: utf-8 -*-
"""
Created on Sat Sep  4 22:26:32 2021

@author: Professor
"""

from flask import Flask,render_template,request
import pickle
import numpy as np
app = Flask(__name__)
model=pickle.load(open("model.pkl","rb"))
@app.route('/')
def hello_world():
    return render_template("carbon_monitor.html")
@app.route("/check_status", methods=["POST","GET"])
def check_status():
    all_features=[int(x) for x in request.form.values()]
    print(all_features)
    int_features=[1 if x=="Yes" else x for x in all_features]
    int_features=[0 if x=="No" else x for x in all_features]
    countries=[0 for i in range(13)]
    countries[(all_features[-1])-1] = 1
    int_features = int_features[:4]+countries
    print(int_features)
    final=[np.array(int_features)]
    prediction=model.predict(final)
    print(prediction)
    output= abs(float(prediction[0]))
    return render_template("carbon_monitor.html",prediction_text="The estimated value of carboon in MT is {}".format(output))
if __name__ =="__main__":
    app.run()
