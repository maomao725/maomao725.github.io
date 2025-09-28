---
title: 📊 机器学习第一次大作业系列1：基础概念与环境搭建
date: 2025-09-28 14:00:00
tags:
  - 机器学习
  - Python
  - 环境搭建
  - 数据处理
  - 作业笔记
categories:
  - 技术教程
cover: /img/background.png
top_img: /img/background.png
description: 机器学习入门第一步，从零开始搭建Python环境，掌握数据处理基础知识，为后续的线性回归算法实现打下坚实基础。
mathjax: true
---

## 📚 系列介绍

这是**机器学习第一次大作业系列**的第一篇文章。我将通过3篇详细的文章，完整地实现吴恩达Machine Learning课程的第一次编程作业。

### 🎯 系列规划

1. **第一篇**（本篇）：基础概念与环境搭建
2. **第二篇**：单变量线性回归实现
3. **第三篇**：多变量回归与优化技巧

## 🎯 作业背景

### 📝 问题描述

假设你是一家餐饮连锁店的CEO，正在考虑在不同城市开设新的食品车网点。你希望将业务扩展到能够带来更高利润的城市。

- 连锁店已经在各个城市有餐厅，拥有这些城市的利润和人口数据
- 还有一些候选城市的人口数据
- **目标**：使用数据帮助识别哪些城市可能为业务带来更高的利润

### 📊 数据集说明

**文件**: `ex1data1.txt`
- **x_train**: 城市人口（单位：万人）
  - 例如：6.1101 表示该城市人口为 61,101 人
- **y_train**: 该城市餐厅的月平均利润（单位：万美元）
  - 例如：17.592 表示月平均利润为 $175,920
  - 负值表示亏损，如 -2.6807 表示月平均亏损 $26,807
- **数据规模**: 97个训练样本

这个问题的本质是**线性回归**：通过城市人口来预测餐厅利润。

## 🛠️ Python环境搭建

### 必需的库

机器学习项目需要三个核心库：

```python
import pandas as pd       # 数据处理和分析
import numpy as np        # 科学计算和矩阵运算
import matplotlib.pyplot as plt  # 数据可视化
%matplotlib inline        # Jupyter中内嵌显示图形
```

**小贴士**: `as` 就是缩写的意思，将numpy缩写成np，方便写代码！（好吧本人基础真的很烂，我其实现在才知道😂）

### 各库的作用

- **pandas**：数据处理和分析，提供DataFrame结构，类似Excel表格
- **matplotlib**：数据可视化，绘制各种图表
- **numpy**：科学计算，矩阵运算必备，是机器学习的基础

## 📖 数据处理基础

### 1. 读取数据 - pd.read_csv()

`pd.read_csv()`是pandas最常用的函数之一，用于读取CSV和其他文本数据。

**重要参数**：
- `names=['列名1', '列名2']`：给没有表头的数据添加列名（注意是names不是name！我就写成name...马上就报错）
- `header=None`：告诉pandas文件没有表头，有表头方便处理数据
- `sep=','`：指定分隔符（默认逗号）

```python
# 读取没有表头的数据文件，并添加列名
data = pd.read_csv('ex1data1.txt', names=['Population', 'Profit'])

# 如果文件有表头，直接读取
# data = pd.read_csv('data.csv')

# 其他常用参数示例
# data = pd.read_csv('file.txt',
#                    names=['col1', 'col2'],
#                    header=None,
#                    sep='\t',  # tab分隔
#                    encoding='utf-8')
```

### 2. 数据探索方法

获取数据后的第一件事：**查看数据长什么样！**（这个很重要，B站的up主告诉我的）

#### .head() 和 .tail()
```python
data.head()    # 查看前5行数据
data.head(10)  # 查看前10行数据
data.tail()    # 查看后5行数据
```

#### .info() - 了解数据结构
`.info()`提供数据的完整结构信息，这一步**非常重要**！

```python
# 查看DataFrame的详细信息
data.info()
# 输出示例：
# <class 'pandas.core.frame.DataFrame'>
# RangeIndex: 97 entries, 0 to 96
# Data columns (total 2 columns):
#  #   Column      Non-Null Count  Dtype
# ---  ------      --------------  -----
#  0   Population  97 non-null     float64
#  1   Profit      97 non-null     float64
# dtypes: float64(2)
# memory usage: 1.6 KB
```

#### 数据类型查看
```python
print(data.dtypes)
# Population    float64
# Profit        float64
```

### 3. DataFrame vs NumPy数组

**pandas是DataFrame结构，numpy是ndarray结构**，两者经常需要转换：

```python
# DataFrame转numpy数组（重要！）
X = data['Population'].values  # 转为numpy数组
print(type(X))  # <class 'numpy.ndarray'>
print(X.shape)  # (97,)  一维数组

# 或者转换整个DataFrame
data_array = data.values  # 转为numpy二维数组
print(type(data_array))  # <class 'numpy.ndarray'>
print(data_array.shape)  # (97, 2)
```

**注意事项**：
- DataFrame适合数据预处理和探索
- numpy数组适合数值计算
- 很多机器学习算法需要numpy数组格式
- 结构不匹配是常见错误来源！

## 📊 数据可视化基础

### 绘图方法

可视化是理解数据的关键！matplotlib提供了两种绘图方式：
我其实不太会用，每次就背下来或者复制粘贴~

#### 方式1：使用pyplot接口（简单快速）
```python
# 绘制散点图
plt.scatter(data['Population'], data['Profit'], marker='x', c='r')
plt.xlabel('Population of City in 10,000s')
plt.ylabel('Profit in $10,000s')
plt.title('Scatter plot of training data')
plt.show()
```

#### 方式2：使用面向对象的方式（更灵活）
```python
# 创建图形和坐标轴
fig, ax = plt.subplots(figsize=(8, 6))

# 在ax上绘制
ax.scatter(data['Population'], data['Profit'], marker='x', c='r', label='Training data')
ax.set_xlabel('Population of City in 10,000s')
ax.set_ylabel('Profit in $10,000s')
ax.set_title('Scatter plot of training data')
ax.legend()
plt.show()
```

### 常用参数说明

- `marker='x'`：标记样式（'o', 'x', '*', '^'等）
- `c='r'`：颜色（'r'红色, 'b'蓝色, 'g'绿色）
- `figsize=(8,6)`：图形大小（宽，高）
- `label='名称'`：图例标签

## 🔢 NumPy数组基础

### 数组创建函数对比

在机器学习中，经常需要创建各种初始数组。理解不同创建函数的区别很重要！

#### np.zeros() - 创建全0数组
```python
# 1. 创建一维数组
a = np.zeros(5)  # 传入整数5
print(a)         # [0. 0. 0. 0. 0.]
print(a.shape)   # (5,) - 一维数组

# 2. 创建二维数组 - 必须用元组！
b = np.zeros((5, 2))  # 传入元组(5,2)
print(b.shape)        # (5, 2) - 二维数组

# 3. 常见错误
# np.zeros(5, 2)  # ❌ 错误！不能传两个参数
# 正确写法：
np.zeros((5, 2))  # ✅ 用元组包起来
```

#### 常用数组创建函数
```python
# 1. np.zeros() - 创建全0数组
zeros_1d = np.zeros(5)           # 一维：[0. 0. 0. 0. 0.]
zeros_2d = np.zeros((3, 2))      # 二维：3行2列的0矩阵

# 2. np.ones() - 创建全1数组（用法同zeros）
ones_1d = np.ones(5)             # 一维：[1. 1. 1. 1. 1.]
ones_2d = np.ones((3, 2))        # 二维：3行2列的1矩阵

# 3. np.arange() - 创建等差数列（类似Python的range）
arr1 = np.arange(5)              # [0 1 2 3 4] - 从0开始，到5结束（不含5）
arr2 = np.arange(2, 10)          # [2 3 4 5 6 7 8 9] - 从2到10
arr3 = np.arange(0, 10, 2)       # [0 2 4 6 8] - 步长为2

# 4. np.linspace() - 创建均匀间隔的数（包含终点！）
lin1 = np.linspace(0, 10, 5)     # [0. 2.5 5. 7.5 10.] - 从0到10均分5个点
lin2 = np.linspace(0, 1, 11)     # 从0到1均分11个点（包含0和1）
```

### 实际应用场景

```python
# 场景1：初始化参数（线性回归）
m = 97  # 样本数量
n = 2   # 特征数量（含偏置项）

# 初始化theta参数
theta = np.zeros(n)  # [0. 0.] - theta0和theta1都初始化为0

# 场景2：创建偏置列
bias = np.ones(m)  # 创建m个1，用于添加偏置列

# 场景3：创建测试数据范围
population_test = np.linspace(4, 24, 100)  # 创建100个测试点，从4到24
```

## 🔄 数据结构转换

### DataFrame和NumPy数组互换

在机器学习项目中，经常需要在pandas的DataFrame和NumPy的ndarray之间转换。

#### DataFrame → NumPy数组
```python
# 方法1：使用.values属性（简单直接）
array1 = df.values
print(type(array1))  # <class 'numpy.ndarray'>

# 方法2：使用.to_numpy()方法（推荐，更明确）
array2 = df.to_numpy()
print(type(array2))  # <class 'numpy.ndarray'>

# 方法3：转换特定列
X = df['Population'].values  # 一维数组 (3,)
y = df['Profit'].values      # 一维数组 (3,)

# 方法4：转换多列
features = df[['Population']].values  # 二维数组 (3, 1)
# 注意：双方括号[[]]返回DataFrame，再.values得到二维数组
# 单方括号[]返回Series，再.values得到一维数组
```

#### NumPy数组 → DataFrame
```python
# 方法1：直接传入数组，指定列名
df1 = pd.DataFrame(data_array, columns=['Population', 'Profit'])

# 方法2：从字典创建（当有多个一维数组时）
population = np.array([6.1101, 5.5277, 8.5186])
profit = np.array([17.5920, 9.1302, 13.6620])

df2 = pd.DataFrame({
    'Population': population,
    'Profit': profit
})
```

### 维度问题处理

```python
# 问题1：一维vs二维
df = pd.DataFrame({'A': [1, 2, 3]})

# 获取一维数组
arr_1d = df['A'].values  # shape: (3,)

# 获取二维数组
arr_2d = df[['A']].values  # shape: (3, 1)

# 问题2：reshape转换
arr_1d = np.array([1, 2, 3, 4, 5])
arr_2d_col = arr_1d.reshape(-1, 1)  # 列向量 (5, 1)
arr_2d_row = arr_1d.reshape(1, -1)  # 行向量 (1, 5)
```

## 💡 学习心得

### 重要概念总结

1. **数据结构选择**：
   - DataFrame适合数据清理、探索性分析、特征工程
   - NumPy数组适合数值计算、机器学习算法输入

2. **常见陷阱**：
   - `df['col']`返回Series（一维），`df[['col']]`返回DataFrame（二维）
   - `np.zeros(5)`vs`np.zeros((5,2))`的参数传递方式
   - DataFrame与NumPy数组的来回转换

3. **最佳实践**：
   - 数据加载和预处理用DataFrame
   - 数值计算和模型训练用NumPy数组
   - 结果展示和分析再转回DataFrame

---

*后面还有哦！！！*