---
title: 📊 机器学习第一次大作业：线性回归详解
date: 2025-09-28 12:30:00
tags:
  - 机器学习
  - 线性回归
  - Python
  - 数学
  - 作业笔记
categories:
  - 技术教程
cover: /img/background.png
top_img: /img/background.png
description: 吴恩达机器学习课程第一次大作业完整记录，从单变量到多变量线性回归的详细实现过程和学习心得。
mathjax: true
---

## 📚 作业背景

这是我学习**Machine Learning Specialization by Andrew Ng**课程的第一次编程作业记录。

### 🎯 问题描述

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

## 🔧 任务要求

### Exercise 1: 实现代价函数（Compute Cost）

**任务**: 完成`compute_cost`函数，计算线性回归的代价函数J(w,b)

**代价函数公式**:
$$J(w,b) = \frac{1}{2m} \sum_{i=1}^{m} (f_{w,b}(x^{(i)}) - y^{(i)})^2$$

其中：
- $f_{w,b}(x^{(i)}) = wx^{(i)} + b$ 是模型的预测值
- $y^{(i)}$ 是实际值
- $m$ 是训练样本数量

### Exercise 2: 实现梯度计算（Compute Gradient）

**任务**: 完成`compute_gradient`函数，计算代价函数对参数的梯度

**梯度公式**:
- 对w的偏导数: $\frac{\partial J}{\partial w} = \frac{1}{m} \sum_{i=1}^{m} (f_{w,b}(x^{(i)}) - y^{(i)}) \cdot x^{(i)}$
- 对b的偏导数: $\frac{\partial J}{\partial b} = \frac{1}{m} \sum_{i=1}^{m} (f_{w,b}(x^{(i)}) - y^{(i)})$

### 🎛️ 梯度下降参数设置

- 学习率 α = 0.01
- 迭代次数 = 1500
- 初始值：w = 0, b = 0

**预期结果**:
- 最终参数：w ≈ 1.166, b ≈ -3.630
- 人口35,000的城市预测利润：$4,519.77
- 人口70,000的城市预测利润：$45,342.45

## 📈 单变量线性回归详解

### 🧮 代价函数 (Cost Function)

#### 参数表示法说明

在机器学习中，有两种常见的参数表示方法：

1. **吴恩达课程表示法**: $y = wx + b$（w是权重weight，b是偏置bias）
2. **统一向量表示法**: $h_\theta(x) = \theta_0 + \theta_1 x$（使用theta向量）

**参数对应关系**：
- $\theta_0 = b$ (偏置项)
- $\theta_1 = w$ (权重)

为了使用统一的theta表示法，我们需要在原始数据前添加一列全1（偏置列）：
- $\theta = [\theta_0, \theta_1]^T$
- $X = [1, x]$ （每个样本前添加1）

#### 代价函数公式（theta表示法）

**假设函数（Hypothesis Function）**:
$$h_\theta(x) = \theta^T x = \theta_0 + \theta_1 x_1$$

对于m个训练样本，**代价函数（Cost Function）**为：
$$J(\theta) = \frac{1}{2m} \sum_{i=1}^{m} (h_\theta(x^{(i)}) - y^{(i)})^2$$

**向量化表示**：
$$J(\theta) = \frac{1}{2m}(X\theta - y)^T(X\theta - y)$$

### ⚡ 梯度下降 (Gradient Descent)

#### 梯度计算（theta表示法）

**对$\theta_0$的偏导数**:
$$\frac{\partial J(\theta)}{\partial \theta_0} = \frac{1}{m} \sum_{i=1}^{m} (h_\theta(x^{(i)}) - y^{(i)})$$

**对$\theta_1$的偏导数**:
$$\frac{\partial J(\theta)}{\partial \theta_1} = \frac{1}{m} \sum_{i=1}^{m} (h_\theta(x^{(i)}) - y^{(i)}) \cdot x^{(i)}$$

**统一的向量形式**:
$$\frac{\partial J(\theta)}{\partial \theta_j} = \frac{1}{m} \sum_{i=1}^{m} (h_\theta(x^{(i)}) - y^{(i)}) \cdot x_j^{(i)}$$

#### 梯度下降更新规则

**批量梯度下降（Batch Gradient Descent）**:

重复执行直到收敛：
$$\theta_j := \theta_j - \alpha \frac{\partial J(\theta)}{\partial \theta_j}$$

**向量化形式**：
$$\theta := \theta - \alpha \frac{1}{m} X^T(X\theta - y)$$

其中α是学习率（learning rate）

## 💻 编程实现要点

### 1. 导入必要的库

机器学习项目需要三个核心库：

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
%matplotlib inline  # 在Jupyter中内嵌显示图形
```

**小贴士**: `as` 就是缩写的意思，将numpy缩写成np，方便写代码！（好吧本人基础真的很烂，我其实现在才知道😂）

### 2. 读取数据 - pd.read_csv()

`pd.read_csv()`是pandas最常用的函数之一：

**重要参数**：
- `names=['列名1', '列名2']`：给没有表头的数据添加列名（注意是names不是name！）
- `header=None`：告诉pandas文件没有表头

```python
# 读取没有表头的数据文件，并添加列名
data = pd.read_csv('ex1data1.txt', names=['Population', 'Profit'])
```

### 3. 数据探索

获取数据后的第一件事：**查看数据长什么样！**

```python
# 查看前几行
data.head()

# 查看数据结构信息
data.info()

# 查看统计信息
data.describe()
```

### 4. 数据可视化

可视化是理解数据的关键！我其实不太会用，每次就背下来或者复制粘贴~

```python
# 绘制散点图
plt.scatter(data['Population'], data['Profit'], marker='x', c='r')
plt.xlabel('Population of City in 10,000s')
plt.ylabel('Profit in $10,000s')
plt.title('Scatter plot of training data')
plt.show()
```

### 5. 添加偏置列 - 关键步骤

为了使用向量化计算，需要在特征矩阵X前面添加一列全1（偏置列）：

**为什么要添加偏置列？**
- 让θ₀（偏置项）可以参与向量运算
- 统一计算：$h_θ(x) = θ^T X = [θ_0, θ_1] \cdot [1, x] = θ_0 + θ_1x$

**三种添加方法**：

```python
# 方法1：np.column_stack (最推荐✅)
ones = np.ones(m)
X = np.column_stack([ones, x])

# 方法2：np.insert
x_reshaped = x.reshape(-1, 1)
X = np.insert(x_reshaped, 0, 1, axis=1)

# 方法3：手动创建
X = np.zeros((m, 2))
X[:, 0] = 1
X[:, 1] = x
```

### 6. 核心函数实现

#### np.power() 和 np.sum() - 计算代价函数的利器

```python
def compute_cost_vectorized(X, y, theta):
    """向量化计算代价函数"""
    m = len(y)
    errors = X.dot(theta) - y
    cost = np.sum(np.power(errors, 2)) / (2 * m)
    return cost

def compute_gradient(X, y, theta):
    """计算梯度"""
    m = len(y)
    errors = X.dot(theta) - y
    gradient = X.T.dot(errors) / m
    return gradient
```

### 7. 数据结构转换

在DataFrame和NumPy数组之间转换：

```python
# DataFrame → NumPy数组
X = data['Population'].values  # 一维数组
y = data['Profit'].values

# 注意维度问题！
print(f"X shape: {X.shape}")  # (97,) - 一维数组
```

## 🔢 多变量线性回归

### 特征归一化 (Feature Normalization)

当特征的数值范围差异很大时，梯度下降会很慢。**特征归一化可以让梯度下降更快收敛！**

#### Z-score标准化（推荐）

$$x_j = \frac{x_j - \mu_j}{\sigma_j}$$

```python
def normalize_features(X):
    """特征归一化"""
    mu = np.mean(X[:, 1:], axis=0)  # 跳过偏置列
    sigma = np.std(X[:, 1:], axis=0)

    X_norm = X.copy()
    X_norm[:, 1:] = (X[:, 1:] - mu) / sigma

    return X_norm, mu, sigma
```

### 学习率选择

#### 表格测试法

```python
def test_learning_rates(X, y, iterations=100):
    """测试不同学习率的效果"""
    learning_rates = [0.001, 0.003, 0.01, 0.03, 0.1, 0.3, 1.0]

    for alpha in learning_rates:
        # 测试每个学习率的收敛情况
        theta = np.zeros(X.shape[1])
        J_history = []

        for i in range(iterations):
            predictions = X.dot(theta)
            errors = predictions - y
            theta = theta - alpha * (1/len(y)) * X.T.dot(errors)
            cost = np.sum(errors**2) / (2*len(y))
            J_history.append(cost)

        # 分析收敛结果
        # ...
```

### 正规方程 (Normal Equation)

正规方程是通过解析方法一次性求解θ的方法：

$$\theta = (X^T X)^{-1} X^T y$$

```python
def normal_equation(X, y):
    """使用正规方程求解theta"""
    theta = np.linalg.inv(X.T.dot(X)).dot(X.T).dot(y)
    return theta
```

#### 梯度下降 vs 正规方程

| 梯度下降 | 正规方程 |
|---------|---------|
| 需要选择学习率α | 不需要选择学习率 |
| 需要多次迭代 | 一次计算得出 |
| 当特征数量n很大时也能工作良好 | 需要计算$(X^T X)^{-1}$，复杂度$O(n^3)$ |
| **n > 10,000时推荐** | **n < 10,000时推荐** |

## 💡 学习心得

### 过程中的一些感悟

- 一开始连`as`是缩写的意思都不知道😂
- plot函数总是记不住，每次都要复制粘贴
- B站的up主们真的帮了很大忙
- 从(w,b)到θ向量的转换理解花了不少时间
- 矩阵乘法真的很优雅，一行代码搞定所有计算！

### 重要提醒

**数据结构转换**：
- DataFrame适合数据预处理和探索
- numpy数组适合数值计算
- 结构不匹配是常见错误来源！

**向量化计算**：
- 比循环快得多
- 代码更简洁优雅
- 是机器学习的基础技能

**特征工程**：
- 特征归一化很重要
- 保存归一化参数用于新数据
- 不要归一化偏置列

## 🎉 总结

这次作业让我深入理解了线性回归的核心概念：

1. **代价函数**: 衡量模型预测与实际值的差距
2. **梯度下降**: 通过迭代优化找到最优参数
3. **向量化**: 高效的矩阵运算实现
4. **特征工程**: 数据预处理的重要性

从单变量到多变量，从基础概念到实际编程，这个过程让我对机器学习有了更深的认识。

继续加油💪

---

*机器学习之旅刚刚开始，每一步都是成长！*