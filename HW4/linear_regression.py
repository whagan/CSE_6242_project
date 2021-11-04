# simple linear regression

# import libraries
import numpy as numpy
import matplotlib.pyplot as plt
import pandas as pd

# import the dataset
try:
    dataset = pd.read_csv('real_estate.csv')
except:
    dataset = pd.read_csv('/home/will/workspace/CSE_6242_project/HW4/real_estate.csv')
x = dataset.iloc[:, 2].values
x = x.reshape(-1, 1)
y = dataset['Y house price of unit area']

# split dataset into training and test sets
from sklearn.model_selection import train_test_split
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.25, random_state=0) 

# train simple linear regression model on training set
from sklearn.linear_model import LinearRegression
regressor = LinearRegression()
regressor.fit(x_train, y_train)

# predict the test results
y_pred = regressor.predict(x_test)

# visualie the training set results
plt.scatter(x_train, y_train, color = 'red')
plt.plot(x_train, regressor.predict(x_train), color = 'blue')
plt.title('House Age vs House Price (Training set)')
plt.xlabel('Age of House')
plt.ylabel('House Price Unit Area')
plt.show()

# visualize the test set results
plt.scatter(x_test, y_test, color = 'red')
plt.plot(x_train, regressor.predict(x_train), color = 'blue')
plt.title('House Age vs House Price (Test set)')
plt.xlabel('Age of House')
plt.ylabel('House Price Unit Area')
plt.show()
