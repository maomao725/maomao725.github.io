---
title: 📊 机器学习第一次大作业系列2：单变量线性回归实现
date: 2025-09-28 15:00:00
tags:
  - 机器学习
  - 线性回归
  - 梯度下降
  - NumPy
  - 作业笔记
categories:
  - 技术教程
cover: /img/background.png
top_img: /img/background.png
description: 深入实现单变量线性回归算法，掌握代价函数计算、梯度下降优化和向量化编程技巧。
mathjax: true
---

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

## 🧮 代价函数详解

### 参数表示法说明

在机器学习中，有两种常见的参数表示方法：

1. **吴恩达课程表示法**: $y = wx + b$（w是权重weight，b是偏置bias）
2. **统一向量表示法**: $h_\theta(x) = \theta_0 + \theta_1 x$（使用theta向量）

**参数对应关系**：
- $\theta_0 = b$ (偏置项)
- $\theta_1 = w$ (权重)

为了使用统一的theta表示法，需要在原始数据前添加一列全1（偏置列）：
- $\theta = [\theta_0, \theta_1]^T$
- $X = [1, x]$ （每个样本前添加1）

### 为什么要统一？

将参数写成向量形式后，公式推导和代码实现都更简洁：
```python
# 分开表示（不够优雅）
y = w * x + b

# 向量表示（统一简洁）
# θ = [θ₀, θ₁]ᵀ
# X = [1, x]  # 添加偏置列
# y = θᵀX = θ₀*1 + θ₁*x
```

### 代价函数公式（theta表示法）

**假设函数（Hypothesis Function）**:
$$h_\theta(x) = \theta^T x = \theta_0 + \theta_1 x_1$$

对于m个训练样本，**代价函数（Cost Function）**为：
$$J(\theta) = \frac{1}{2m} \sum_{i=1}^{m} (h_\theta(x^{(i)}) - y^{(i)})^2$$

展开后：
$$J(\theta_0, \theta_1) = \frac{1}{2m} \sum_{i=1}^{m} (\theta_0 + \theta_1 x^{(i)} - y^{(i)})^2$$

**向量化表示**：
$$J(\theta) = \frac{1}{2m}(X\theta - y)^T(X\theta - y)$$

其中：
- $X$ 是 m×2 的矩阵（第一列全为1，第二列为原始特征x）
- $\theta$ 是 2×1 的参数向量 $[\theta_0, \theta_1]^T$
- $y$ 是 m×1 的目标值向量

## ⚡ 梯度下降算法

### 梯度计算（theta表示法）

对代价函数求偏导数：

**对$\theta_0$的偏导数**:
$$\frac{\partial J(\theta)}{\partial \theta_0} = \frac{1}{m} \sum_{i=1}^{m} (h_\theta(x^{(i)}) - y^{(i)})$$

**对$\theta_1$的偏导数**:
$$\frac{\partial J(\theta)}{\partial \theta_1} = \frac{1}{m} \sum_{i=1}^{m} (h_\theta(x^{(i)}) - y^{(i)}) \cdot x^{(i)}$$

**统一的向量形式**:
$$\frac{\partial J(\theta)}{\partial \theta_j} = \frac{1}{m} \sum_{i=1}^{m} (h_\theta(x^{(i)}) - y^{(i)}) \cdot x_j^{(i)}$$

其中$x_0^{(i)} = 1$（对应偏置项）

### 梯度下降更新规则

**批量梯度下降（Batch Gradient Descent）**:

重复执行直到收敛：
$$\theta_j := \theta_j - \alpha \frac{\partial J(\theta)}{\partial \theta_j}$$

同时更新所有参数（j = 0, 1）：
$$\theta_0 := \theta_0 - \alpha \frac{1}{m} \sum_{i=1}^{m} (h_\theta(x^{(i)}) - y^{(i)})$$
$$\theta_1 := \theta_1 - \alpha \frac{1}{m} \sum_{i=1}^{m} (h_\theta(x^{(i)}) - y^{(i)}) \cdot x^{(i)}$$

**向量化形式**：
$$\theta := \theta - \alpha \frac{1}{m} X^T(X\theta - y)$$

其中α是学习率（learning rate）

## 🔧 添加偏置列 - 关键步骤

为了使用向量化计算，需要在特征矩阵X前面添加一列全1（偏置列）。这样：
- 原始数据：x（只有人口数据）
- 处理后：X = [1, x]（第一列全是1，第二列是人口数据）

### 为什么要添加偏置列？

- 让θ₀（偏置项）可以参与向量运算
- 统一计算：$h_θ(x) = θ^T X = [θ_0, θ_1] \cdot [1, x] = θ_0 + θ_1x$

### 矩阵形式的详细说明

为了能用一次矩阵乘法完成所有计算，需要巧妙地构造矩阵：

**1. 参数向量**：
$$\theta = \begin{bmatrix} b \\ w \end{bmatrix} = \begin{bmatrix} \theta_0 \\ \theta_1 \end{bmatrix}$$

其中θ₀ = b（偏置/截距），θ₁ = w（权重/斜率）

**2. 原始特征向量**（m个样本）：
$$x = \begin{bmatrix} x^{(1)} \\ x^{(2)} \\ \vdots \\ x^{(m)} \end{bmatrix}$$

**3. 改造后的特征矩阵**（添加偏置列）：
$$X = \begin{bmatrix}
1 & x^{(1)} \\
1 & x^{(2)} \\
\vdots & \vdots \\
1 & x^{(m)}
\end{bmatrix}$$

**4. 矩阵乘法计算预测值**：
$$X\theta = \begin{bmatrix}
1 & x^{(1)} \\
1 & x^{(2)} \\
\vdots & \vdots \\
1 & x^{(m)}
\end{bmatrix} \begin{bmatrix} b \\ w \end{bmatrix} = \begin{bmatrix}
1 \cdot b + x^{(1)} \cdot w \\
1 \cdot b + x^{(2)} \cdot w \\
\vdots \\
1 \cdot b + x^{(m)} \cdot w
\end{bmatrix}$$

这样，**矩阵乘法的结果X@theta正好就是想要的wx + b！**

### 三种添加偏置列的方法

#### 方法1：np.column_stack (最推荐✅)

这个函数专门用于将一维或二维数组按列合并。

```python
# 创建一个长度为 m 的全1向量
ones = np.ones(m)

# 使用 column_stack 将 ones 和 x 按列合并
X = np.column_stack([ones, x])

print(X)
# 输出:
# [[1.     6.1101]
#  [1.     5.5277]
#  [1.     8.5186]
#  [1.     7.0032]
#  [1.     5.8598]]
```

**优点**:
- **代码意图清晰**：函数名 `column_stack`（列堆叠）直接说明了操作的目的
- **简洁方便**：一行代码即可完成，并且不需要预先改变输入数组 `x` 的形状

#### 方法2：np.insert

```python
# 1. 先将 x 从 (m,) 变形为 (m, 1)
x_reshaped = x.reshape(-1, 1)

# 2. 在第 0 列的位置插入数值 1
# NumPy 会自动广播(broadcast)这个 1 到整列
X = np.insert(x_reshaped, 0, 1, axis=1)
```

**优点**: 功能强大，可以在任意位置插入
**缺点**: 需要先reshape，代码稍显繁琐

#### 方法3：手动创建和赋值（最基础）

```python
# 1. 创建一个 m行 x 2列 的全零矩阵
X = np.zeros((m, 2))

# 2. 将第一列 (索引为0) 全部赋值为 1
X[:, 0] = 1

# 3. 将第二列 (索引为1) 赋值为 x
X[:, 1] = x
```

## 🔧 核心函数实现

### np.power()和np.sum() - 计算代价函数的利器

这两个函数在计算代价函数时经常配合使用！

#### np.power() - 计算幂运算

**基本语法**：
```python
np.power(base, exponent)
```

**使用示例**：
```python
import numpy as np

# 1. 标量运算
result = np.power(3, 4)  # 3的4次方 = 81

# 2. 数组元素的平方（最常用于代价函数）
errors = np.array([1, -2, 3, -4])
squared = np.power(errors, 2)  # [1, 4, 9, 16]

# 3. 等价写法对比
a = np.array([1, 2, 3])
method1 = np.power(a, 2)  # 使用np.power
method2 = a ** 2          # 使用**运算符
method3 = a * a           # 直接相乘
# 三种方法结果相同：[1, 4, 9]
```

#### np.sum() - 求和函数

**基本语法**：
```python
np.sum(array, axis=None, keepdims=False)
```

**使用示例**：
```python
# 1. 一维数组求和
arr = np.array([1, 2, 3, 4])
total = np.sum(arr)  # 10

# 2. 二维数组求和 - axis参数很关键！
matrix = np.array([[1, 2, 3],
                   [4, 5, 6]])

sum_all = np.sum(matrix)        # 21 (所有元素)
sum_rows = np.sum(matrix, axis=1)  # [6, 15] (每行求和)
sum_cols = np.sum(matrix, axis=0)  # [5, 7, 9] (每列求和)

# 记忆技巧：
# axis=0：沿着行的方向（向下），结果是每列的和
# axis=1：沿着列的方向（向右），结果是每行的和
```

### 代价函数实现

```python
def compute_cost_manual(X, y, theta):
    """手动计算代价函数，展示power和sum的用法"""
    m = len(y)

    # 1. 计算预测值
    predictions = X.dot(theta)  # h_theta(x) = X * theta

    # 2. 计算误差
    errors = predictions - y

    # 3. 计算误差的平方（使用np.power）
    squared_errors = np.power(errors, 2)
    # 或者：squared_errors = errors ** 2

    # 4. 求和（使用np.sum）
    sum_squared_errors = np.sum(squared_errors)

    # 5. 计算代价
    cost = sum_squared_errors / (2 * m)

    return cost

# 向量化版本（更简洁）
def compute_cost_vectorized(X, y, theta):
    """向量化计算代价函数"""
    m = len(y)
    errors = X.dot(theta) - y
    cost = np.sum(np.power(errors, 2)) / (2 * m)
    # 或者一行搞定：
    # cost = np.sum((X.dot(theta) - y) ** 2) / (2 * m)
    return cost
```

### 梯度计算实现

```python
def compute_gradient(X, y, theta):
    """计算梯度，展示sum的axis用法"""
    m = len(y)

    # 1. 计算误差
    errors = X.dot(theta) - y  # shape: (m,)

    # 2. 计算梯度
    # 方法1：使用循环（不推荐）
    gradient = np.zeros(len(theta))
    for j in range(len(theta)):
        gradient[j] = np.sum(errors * X[:, j]) / m

    # 方法2：向量化（推荐）
    gradient = X.T.dot(errors) / m
    # X.T shape: (n, m)
    # errors shape: (m,)
    # 结果 shape: (n,)

    return gradient
```

### 完整的梯度下降实现

```python
def gradient_descent(X, y, theta, alpha, iterations):
    """完整的梯度下降算法"""
    m = len(y)
    J_history = []

    for i in range(iterations):
        # 计算预测值
        predictions = X.dot(theta)

        # 计算误差
        errors = predictions - y

        # 更新参数（向量化）
        theta = theta - alpha * (1/m) * X.T.dot(errors)

        # 记录代价
        cost = np.sum(errors**2) / (2*m)
        J_history.append(cost)

    return theta, J_history
```

## 💻 完整实现流程

### 数据准备
```python
# 1. 读取数据
data = pd.read_csv('ex1data1.txt', names=['Population', 'Profit'])

# 2. 切片分离特征和目标
X = data['Population'].values  # 转为NumPy数组
y = data['Profit'].values

# 3. 获取样本数量
m = len(y)

# 4. 添加偏置列（为了向量化计算）
X = np.column_stack([np.ones(m), X])  # 现在X是 (m, 2)

# 5. 初始化参数
theta = np.zeros(2)  # [theta0, theta1]
```

### 训练过程
```python
# 设置超参数
alpha = 0.01
iterations = 1500

# 梯度下降训练
theta_final, J_history = gradient_descent(X, y, theta, alpha, iterations)

print(f"最终参数: w = {theta_final[1]:.3f}, b = {theta_final[0]:.3f}")
print(f"最终代价: {J_history[-1]:.3f}")
```

### 预测新数据
```python
# 预测人口35,000和70,000的城市利润
new_cities = np.array([[1, 3.5], [1, 7.0]])  # 注意添加偏置项1
predictions = new_cities.dot(theta_final)

print(f"人口35,000的城市预测利润: ${predictions[0]*10000:.2f}")
print(f"人口70,000的城市预测利润: ${predictions[1]*10000:.2f}")
```

## 💡 学习心得

### 关键概念总结

1. **参数向量化**：
   - 从(w,b)到θ向量的转换理解花了不少时间
   - 矩阵乘法真的很优雅，一行代码搞定所有计算！

2. **向量化计算**：
   - `np.power(x, 2)`和`x**2`功能相同，但`**`更常用
   - `np.sum()`的axis参数很重要，记住：axis=0向下，axis=1向右
   - 向量化计算比循环快得多！

3. **偏置列的重要性**：
   - 添加偏置列是向量化计算的关键步骤
   - 让偏置项能够参与矩阵运算
   - `np.column_stack`是最清晰的实现方法

### 实现技巧

- **代价函数**：power用于计算平方误差，sum用于求总和
- **梯度计算**：利用矩阵转置和点乘实现向量化
- **参数更新**：同时更新所有参数，避免使用循环

---

*后面还有哦！！！*