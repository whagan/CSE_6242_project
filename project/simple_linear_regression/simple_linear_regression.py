import numpy as np 
import matplotlib.pyplot as plt 
import pandas as pd 

# import the dataset
data = pd.read_csv('/home/will/workspace/CSE_6242_project/project/simple_linear_regression/bank_data_train.csv')
x = np.array(data.iloc[:, 0].values).reshape(-1, 1)
data['y'] = np.where(data['y'] == 'yes', 1, 0)
y = np.array(data.iloc[:, -1].values).reshape(-1, 1)

# for t in y[:100]:
#     print(t)

from sklearn.model_selection import train_test_split
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=1/3, random_state=0)

from sklearn.linear_model import LinearRegression
regressor = LinearRegression()
regressor.fit(x_train, y_train)

y_pred = regressor.predict(x_test)

# Visualising the Training set results
plt.scatter(x_train, y_train, color = 'red')
plt.plot(x_train, regressor.predict(x_train), color = 'blue')
plt.title('Salary vs Experience (Training set)')
plt.xlabel('Age')
plt.ylabel('Salary')
plt.show()

# Visualising the Test set results
plt.scatter(x_test, y_test, color = 'red')
plt.plot(x_train, regressor.predict(x_train), color = 'blue')
plt.title('Likelihood (Test)')
plt.xlabel('Age')
plt.ylabel('Salary')
plt.show()