---
title: 📊 机器学习吴恩达老师课程第一次大作业
date: 2025-09-28 15:34:00
tags:
  - 机器学习
  - 作业笔记
categories:
  - 技术教程
cover: /img/background.png
top_img: /img/background.png
description: 记录吴恩达老师课程的第一次作业，本人非计算机专业，能力十分有限，所以笔记有一堆前瞻知识~
mathjax: true
---
## 题目：

### Programming Exercise 1: Linear Regression
**课程**: Machine Learning Specialization by Andrew Ng

#### 作业背景
假设你是一家餐饮连锁店的CEO，正在考虑在不同城市开设新的食品车网点。你希望将业务扩展到能够带来更高利润的城市。

- 连锁店已经在各个城市有餐厅，你拥有这些城市的利润和人口数据
- 你还有一些候选城市的人口数据
- **目标**：使用数据帮助你识别哪些城市可能为你的业务带来更高的利润

#### 数据集说明
**文件**: `ex1data1.txt`
- **x_train**: 城市人口（单位：万人）
  - 例如：6.1101 表示该城市人口为 61,101 人
- **y_train**: 该城市餐厅的月平均利润（单位：万美元）
  - 例如：17.592 表示月平均利润为 $175,920
  - 负值表示亏损，如 -2.6807 表示月平均亏损 $26,807
- **数据规模**: 97个训练样本

#### Exercise 1: 实现代价函数（Compute Cost）
**任务**: 完成`compute_cost`函数，计算线性回归的代价函数J(w,b)

**代价函数公式**:
$$J(w,b) = \frac{1}{2m} \sum_{i=1}^{m} (f_{w,b}(x^{(i)}) - y^{(i)})^2$$

其中：
- $f_{w,b}(x^{(i)}) = wx^{(i)} + b$ 是模型的预测值
- $y^{(i)}$ 是实际值
- $m$ 是训练样本数量


#### Exercise 2: 实现梯度计算（Compute Gradient）
**任务**: 完成`compute_gradient`函数，计算代价函数对参数的梯度

**梯度公式**:
- 对w的偏导数: $\frac{\partial J}{\partial w} = \frac{1}{m} \sum_{i=1}^{m} (f_{w,b}(x^{(i)}) - y^{(i)}) \cdot x^{(i)}$
- 对b的偏导数: $\frac{\partial J}{\partial b} = \frac{1}{m} \sum_{i=1}^{m} (f_{w,b}(x^{(i)}) - y^{(i)})$

#### 梯度下降参数设置
- 学习率 α = 0.01
- 迭代次数 = 1500
- 初始值：w = 0, b = 0

**预期结果**:
- 最终参数：w ≈ 1.166, b ≈ -3.630
- 人口35,000的城市预测利润：$4,519.77
- 人口70,000的城市预测利润：$45,342.45


## 单变量 Simple variable

### 代价函数cost function

#### 参数表示法说明
在机器学习中，有两种常见的参数表示方法：
1. **吴恩达课程表示法**: $y = wx + b$（w是权重weight，b是偏置bias）
2. **统一向量表示法**: $h_\theta(x) = \theta_0 + \theta_1 x$（使用theta向量）

**参数对应关系**：
- $\theta_0 = b$ (偏置项)
- $\theta_1 = w$ (权重)

为了使用统一的theta表示法，我们需要在原始数据前添加一列全1（偏置列），这样可以将参数写成向量形式：
- $\theta = [\theta_0, \theta_1]^T$
- $X = [1, x]$ （每个样本前添加1）

#### 代价函数公式（theta表示法）

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

### 梯度下降gradient descent

#### 梯度计算（theta表示法）

对代价函数求偏导数：

**对$\theta_0$的偏导数**:
$$\frac{\partial J(\theta)}{\partial \theta_0} = \frac{1}{m} \sum_{i=1}^{m} (h_\theta(x^{(i)}) - y^{(i)})$$

**对$\theta_1$的偏导数**:
$$\frac{\partial J(\theta)}{\partial \theta_1} = \frac{1}{m} \sum_{i=1}^{m} (h_\theta(x^{(i)}) - y^{(i)}) \cdot x^{(i)}$$

**统一的向量形式**:
$$\frac{\partial J(\theta)}{\partial \theta_j} = \frac{1}{m} \sum_{i=1}^{m} (h_\theta(x^{(i)}) - y^{(i)}) \cdot x_j^{(i)}$$

其中$x_0^{(i)} = 1$（对应偏置项）

#### 梯度下降更新规则

**批量梯度下降（Batch Gradient Descent）**:

重复执行直到收敛：
$$\theta_j := \theta_j - \alpha \frac{\partial J(\theta)}{\partial \theta_j}$$

同时更新所有参数（j = 0, 1）：
$$\theta_0 := \theta_0 - \alpha \frac{1}{m} \sum_{i=1}^{m} (h_\theta(x^{(i)}) - y^{(i)})$$
$$\theta_1 := \theta_1 - \alpha \frac{1}{m} \sum_{i=1}^{m} (h_\theta(x^{(i)}) - y^{(i)}) \cdot x^{(i)}$$

**向量化形式**：
$$\theta := \theta - \alpha \frac{1}{m} X^T(X\theta - y)$$

其中α是学习率（learning rate）



### 过程：

#### 1. 导入必要的库
机器学习项目需要三个核心库：
- **pandas**：数据处理和分析，提供DataFrame结构
- **matplotlib**：数据可视化，绘制各种图表
- **numpy**：科学计算，矩阵运算必备

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
%matplotlib inline  # 在Jupyter中内嵌显示图形
```
这里的as 就是缩写的意思 将numpy缩写成np，方便写代码！（好吧本人基础真的很烂,,,我其实现在才知道😂）
#### 2. 读取数据 - pd.read_csv()
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

#### 3. 查看数据 - .head() 和 .tail()
获取数据后的第一件事：**查看数据长什么样！**（这个很重要，b站的up主告诉我的）

- `.head(n)`：查看前n行数据（默认5行）
- `.tail(n)`：查看后n行数据（默认5行）


#### 4. 了解数据结构 - .info()
`.info()`提供数据的完整结构信息，这一步**非常重要**！

**pandas是DataFrame结构，numpy是ndarray结构**，两者经常需要转换：

```python
# 查看DataFrame的详细信息
data.info()
# 输出：
# <class 'pandas.core.frame.DataFrame'>
# RangeIndex: 97 entries, 0 to 96
# Data columns (total 2 columns):
#  #   Column      Non-Null Count  Dtype
# ---  ------      --------------  -----
#  0   Population  97 non-null     float64
#  1   Profit      97 non-null     float64
# dtypes: float64(2)
# memory usage: 1.6 KB

# 查看数据类型
print(data.dtypes)
# Population    float64
# Profit        float64

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

#### 5. 数据可视化 - 绘图函数plot和ax

可视化是理解数据的关键！matplotlib提供了两种绘图方式：
我其实不太会用，每次就背下来或者复制粘贴~

**方式1：使用pyplot接口（简单快速）**
```python
# 绘制散点图
plt.scatter(data['Population'], data['Profit'], marker='x', c='r')
plt.xlabel('Population of City in 10,000s')
plt.ylabel('Profit in $10,000s')
plt.title('Scatter plot of training data')
plt.show()
```

**方式2：使用面向对象的方式（更灵活）**
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

**常用参数说明**：
- `marker='x'`：标记样式（'o', 'x', '*', '^'等）
- `c='r'`：颜色（'r'红色, 'b'蓝色, 'g'绿色）
- `figsize=(8,6)`：图形大小（宽，高）
- `label='名称'`：图例标签

#### 6. 参数表示法转换 - 从(w,b)到θ向量

**重要概念（其实也是看b站看到的，不然我可能还在用W,B来写代码）**：
吴恩达课程中：$y = wx + b$
- w是weight（权重/斜率）
- b是bias（偏置/截距）

统一向量表示法：$h_θ(x) = θ_0 + θ_1 x$
- **θ₀ = b**（偏置项/截距）
- **θ₁ = w**（权重/斜率）

**为什么要统一？**
将参数写成向量形式后，公式推导和代码实现都更简洁：
```python
# 分开表示（不够优雅）
y = w * x + b

# 向量表示（统一简洁）
# θ = [θ₀, θ₁]ᵀ
# X = [1, x]  # 添加偏置列
# y = θᵀX = θ₀*1 + θ₁*x
```

#### 7. 添加偏置列 - 数据预处理的关键步骤

为了使用向量化计算，需要在特征矩阵X前面添加一列全1（偏置列）。这样：
- 原始数据：x（只有人口数据）
- 处理后：X = [1, x]（第一列全是1，第二列是人口数据）

**为什么要添加偏置列？**
- 让θ₀（偏置项）可以参与向量运算
- 统一计算：$h_θ(x) = θ^T X = [θ_0, θ_1] \cdot [1, x] = θ_0 + θ_1x$

##### 矩阵形式的详细说明

为了能用一次矩阵乘法完成所有计算，我们需要巧妙地构造矩阵：

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

这样，**矩阵乘法的结果X@theta正好就是我们想要的wx + b！**

**三种添加偏置列的方法（针对NumPy数组）：**

##### 方法1：`np.column_stack` (最推荐✅)

这个函数专门用于将一维或二维数组按列合并。它非常适合我们的需求。

**工作原理**： 它接收一个由数组组成的列表或元组 `[array1, array2, ...]`，然后将它们像柱子一样并排堆叠起来。它能很智能地处理一维数组，自动将其视为列向量。

**代码实现**：
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

##### 方法2：`np.insert`

这个函数更加通用，它可以在数组的任意位置（行或列）插入指定的值。

**工作原理**： `np.insert(array, index, values, axis)`
- `array`: 要操作的原始数组
- `index`: 要插入的位置索引
- `values`: 要插入的值
- `axis`: 沿哪个轴插入。`axis=0` 表示插入行，`axis=1` 表示插入列

**重要**：当使用 `axis=1` 插入列时，**原始数组必须是二维的**。因此，需要先将一维的 `x` 转换成二维的列向量（形状从 `(m,)` 变为 `(m, 1)`）。

**代码实现**：
```python
# 1. 先将 x 从 (m,) 变形为 (m, 1)
x_reshaped = x.reshape(-1, 1)

# 2. 在第 0 列的位置插入数值 1
# NumPy 会自动广播(broadcast)这个 1 到整列
X = np.insert(x_reshaped, 0, 1, axis=1)
```

**优点**: 功能强大，可以在任意位置插入
**缺点**: 需要先reshape，代码稍显繁琐

##### 方法3：手动创建和赋值（最基础）

这种方法最能体现底层逻辑，对理解NumPy索引非常有帮助。

```python
# 1. 创建一个 m行 x 2列 的全零矩阵
X = np.zeros((m, 2))

# 2. 将第一列 (索引为0) 全部赋值为 1
X[:, 0] = 1

# 3. 将第二列 (索引为1) 赋值为 x
X[:, 1] = x
```

**针对DataFrame结构的处理方法：**

如果数据是DataFrame结构，有两种主要方法添加偏置列：
#### 方法一：直接赋值 (最简单、最常用)

这是向 DataFrame 添加新列的最标准方法。Pandas 会自动将你赋的单个值（比如 `1`）“广播”到所有行。

```Python
# 直接添加一个名为 'bias' 的新列，并将其所有值设为 1
df['bias'] = 1

print("\n直接赋值后的DataFrame:")
print(df)
```

输出 (新列默认添加在末尾):

```
直接赋值后的DataFrame:
   population   profit  bias
0      6.1101  17.5920     1
1      5.5277   9.1302     1
2      8.5186  13.6620     1
```

#### 方法二：使用 `df.insert()` (可以指定位置)

如果你希望将偏置列放在第一列（这在机器学习中很常见），`insert()` 方法是完美的选择。

`df.insert(loc, column_name, value)`

- `loc`: 整数，表示要插入的列的位置索引（`0` 代表第一列）。
    
- `column_name`: 字符串，新列的名称。
    
- `value`: 要插入的值。
    

```python
# 在位置 0 插入一个名为 'bias' 的列，值为 1
df.insert(0, 'bias', 1)

print("\n使用 insert 后的DataFrame:")
print(df)
```

输出:

```
使用 insert 后的DataFrame:
   bias  population   profit
0     1      6.1101  17.5920
1     1      5.5277   9.1302
2     1      8.5186  13.6620
```

7.在监督学习（比如线性回归）中，我们的数据集通常包含两部分：

1. **特征 (Features, 通常用 `X` 表示)**：用来进行预测的输入变量。例如，在这个作业里就是"城市人口"。在更复杂的问题中，可能会有多个特征，比如"城市人口"、"人均收入"、"餐厅数量"等。

2. **目标 (Target, 通常用 `y` 表示)**：我们想要预测的变量。例如，作业中的"餐厅利润"。

通常，当我们从一个文件（如 CSV）中加载数据时，所有的特征和目标都放在同一个表格里。我们的模型训练函数需要接收分开的 `X` 和 `y`。

**因此，切片操作的核心目的就是：从原始的完整数据表中，把特征（`X`）和目标（`y`）分离出来。**

#### 切片操作详解 - DataFrame和NumPy结构

##### 针对DataFrame结构的切片

```python
# 假设我们有这样的DataFrame
data = pd.DataFrame({
    'Population': [6.1101, 5.5277, 8.5186, 7.0032, 5.8598],
    'Profit': [17.5920, 9.1302, 13.6620, 11.8540, 6.8233]
})

# 方法1：使用iloc（基于位置的切片）
X = data.iloc[:, :-1]  # 所有行，除最后一列外的所有列
y = data.iloc[:, -1]   # 所有行，最后一列

# 方法2：使用列名（更直观）
X = data[['Population']]  # 注意双方括号，返回DataFrame
y = data['Profit']        # 单方括号，返回Series

# 方法3：使用drop（删除不需要的列）
X = data.drop('Profit', axis=1)  # 删除Profit列，保留其他
y = data['Profit']

# 转换为NumPy数组（重要！很多算法需要）
X_array = X.values  # 或 X.to_numpy()
y_array = y.values  # 或 y.to_numpy()

print(f"X shape: {X_array.shape}")  # (5, 1)
print(f"y shape: {y_array.shape}")  # (5,)
```

##### 针对NumPy数组的切片

```python
# 假设我们直接读取为NumPy数组
data = np.loadtxt('ex1data1.txt', delimiter=',')
# 或从DataFrame转换
data = pd.read_csv('ex1data1.txt', names=['Population', 'Profit']).values

# NumPy切片语法：[行范围, 列范围]
X = data[:, 0]     # 所有行，第0列（第一个特征）
y = data[:, 1]     # 所有行，第1列（目标值）

# 如果有多个特征
# X = data[:, :-1]  # 所有行，除最后一列外的所有列
# y = data[:, -1]   # 所有行，最后一列

# 注意维度问题！
print(f"X shape: {X.shape}")  # (97,) - 一维数组
print(f"y shape: {y.shape}")  # (97,) - 一维数组

# 如果需要X为二维（某些算法要求）
X = X.reshape(-1, 1)  # 变为 (97, 1) 的二维数组
```

##### 切片后的数据处理流程

```python
# 完整的数据处理流程
def prepare_data(filename):
    """完整的数据准备流程"""

    # 1. 读取数据
    data = pd.read_csv(filename, names=['Population', 'Profit'])

    # 2. 切片分离特征和目标
    X = data['Population'].values  # 转为NumPy数组
    y = data['Profit'].values

    # 3. 获取样本数量
    m = len(y)

    # 4. 添加偏置列（为了向量化计算）
    X = np.column_stack([np.ones(m), X])  # 现在X是 (m, 2)

    # 5. 初始化参数
    theta = np.zeros(2)  # [theta0, theta1]

    return X, y, theta, m

# 使用示例
X, y, theta, m = prepare_data('ex1data1.txt')
print(f"数据准备完成：")
print(f"  样本数量: {m}")
print(f"  特征矩阵X形状: {X.shape}")
print(f"  目标向量y形状: {y.shape}")
print(f"  参数theta形状: {theta.shape}")
```

**重要提醒**：
- DataFrame切片后记得用`.values`或`.to_numpy()`转换为NumPy数组
- 注意维度：一维数组`(n,)`vs二维数组`(n,1)`
- 切片是数据预处理的必要步骤，不可省略！

#### 8. NumPy数组创建函数对比 - zeros、ones、arange、linspace

在机器学习中，经常需要创建各种初始数组。理解不同创建函数的区别很重要！

##### np.zeros() vs np.zeros(()) 

**关键区别**：参数传递方式不同！
- `np.zeros(shape)` - shape是一个整数或元组
- 当shape是单个整数时，创建一维数组
- 当shape是元组时，创建多维数组

```python
import numpy as np

# 1. 创建一维数组
a = np.zeros(5)  # 传入整数5
print(a)         # [0. 0. 0. 0. 0.]
print(a.shape)   # (5,) - 一维数组

# 2. 创建二维数组 - 必须用元组！
b = np.zeros((5, 2))  # 传入元组(5,2)
print(b)
# [[0. 0.]
#  [0. 0.]
#  [0. 0.]
#  [0. 0.]
#  [0. 0.]]
print(b.shape)   # (5, 2) - 二维数组

# 3. 常见错误
# np.zeros(5, 2)  # ❌ 错误！不能传两个参数
# 正确写法：
np.zeros((5, 2))  # ✅ 用元组包起来

# 4. 创建更高维数组
c = np.zeros((2, 3, 4))  # 三维数组
print(c.shape)  # (2, 3, 4)
```

##### 常用数组创建函数对比

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

# 5. np.random系列 - 创建随机数组
rand_uniform = np.random.rand(3, 2)     # 0-1均匀分布
rand_normal = np.random.randn(3, 2)     # 标准正态分布
rand_int = np.random.randint(0, 10, size=(3, 2))  # 随机整数
```

##### 实际应用场景

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

# 场景4：创建批次索引
batch_size = 32
indices = np.arange(0, m, batch_size)  # [0, 32, 64, 96]

# 场景5：初始化权重矩阵（多层感知器）
input_size = 10
hidden_size = 5
W = np.random.randn(input_size, hidden_size) * 0.01  # 小随机数初始化
b = np.zeros(hidden_size)  # 偏置初始化为0
```

##### 形状(shape)陷阱总结

```python
# 陷阱1：一维 vs 二维
a = np.zeros(5)      # shape: (5,) - 一维数组
b = np.zeros((5,))   # shape: (5,) - 还是一维！
c = np.zeros((5, 1)) # shape: (5, 1) - 二维列向量
d = np.zeros((1, 5)) # shape: (1, 5) - 二维行向量

# 陷阱2：reshape的使用
x = np.arange(6)     # shape: (6,)
x_2d = x.reshape(2, 3)   # shape: (2, 3) - 变成2行3列
x_col = x.reshape(-1, 1) # shape: (6, 1) - 变成列向量，-1表示自动计算

# 陷阱3：广播(broadcasting)规则
a = np.ones((3, 1))  # shape: (3, 1)
b = np.ones(4)        # shape: (4,)
# c = a + b  # 可以广播！结果shape: (3, 4)

# 陷阱4：点积的维度要求
x = np.ones(5)        # shape: (5,)
theta = np.ones(5)    # shape: (5,)
result = np.dot(x, theta)  # 可以计算，结果是标量

X = np.ones((10, 5)) # shape: (10, 5)
result = np.dot(X, theta)  # 可以计算，结果shape: (10,)
```

**记忆技巧**：
- `zeros/ones`的参数：单个数字→一维，元组→多维
- `arange`：不包含终点（像Python的range）
- `linspace`：包含终点（线性等分）
- 使用`reshape(-1, 1)`将一维数组变成列向量


#### 9. np.power()和np.sum() - 计算代价函数的利器

这两个函数在计算代价函数时经常配合使用！

##### np.power() - 计算幂运算

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

# 4. 广播运算
bases = np.array([[1, 2], [3, 4]])
result = np.power(bases, 2)  # 每个元素平方
# [[1, 4]
#  [9, 16]]
```

##### np.sum() - 求和函数（超级重要！因为公式需要求和。。。）

**基本语法**：
```python
np.sum(array, axis=None, keepdims=False)
```

**参数说明**：
- `array`：要求和的数组
- `axis`：沿着哪个轴求和（None表示所有元素求和）
- `keepdims`：是否保持维度

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

# 3. 保持维度
a = np.array([[1, 2], [3, 4]])
sum_keepdims = np.sum(a, axis=1, keepdims=True)
print(sum_keepdims.shape)  # (2, 1) - 保持二维
# [[3]
#  [7]]

sum_no_keepdims = np.sum(a, axis=1, keepdims=False)
print(sum_no_keepdims.shape)  # (2,) - 降为一维
# [3, 7]
```

##### 在代价函数中的应用

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

##### 梯度计算中的应用

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

##### 实际例子：完整的代价函数计算

```python
# 准备数据
m = 97  # 样本数量
X = np.column_stack([np.ones(m), data['Population'].values])
y = data['Profit'].values
theta = np.array([0, 0])

# 计算初始代价
predictions = X.dot(theta)          # 预测值
errors = predictions - y            # 误差
squared_errors = np.power(errors, 2)  # 误差平方
total_error = np.sum(squared_errors)  # 总误差
cost = total_error / (2 * m)        # 平均代价

print(f"初始代价: {cost:.2f}")

# 梯度下降一步
alpha = 0.01
gradient = X.T.dot(errors) / m
theta = theta - alpha * gradient

# 重新计算代价
new_cost = np.sum(np.power(X.dot(theta) - y, 2)) / (2 * m)
print(f"更新后代价: {new_cost:.2f}")
```

**重要提醒**：
- `np.power(x, 2)`和`x**2`功能相同，但`**`更常用
- `np.sum()`的axis参数很重要，记住：axis=0向下，axis=1向右
- 在代价函数中，power用于计算平方误差，sum用于求总和
- 向量化计算比循环快得多！


#### 10. DataFrame和NumPy结构互换 - 数据格式转换大全

在机器学习项目中，经常需要在pandas的DataFrame和NumPy的ndarray之间转换。掌握这些转换技巧非常重要！

##### 为什么需要转换？

- **DataFrame**：适合数据清理、探索性分析、特征工程
- **NumPy数组**：适合数值计算、机器学习算法输入

##### DataFrame → NumPy数组

```python
import pandas as pd
import numpy as np

# 创建示例DataFrame
df = pd.DataFrame({
    'Population': [6.1101, 5.5277, 8.5186],
    'Profit': [17.5920, 9.1302, 13.6620]
})

# 方法1：使用.values属性（简单直接）
array1 = df.values
print(type(array1))  # <class 'numpy.ndarray'>
print(array1.shape)  # (3, 2)

# 方法2：使用.to_numpy()方法（推荐，更明确）
array2 = df.to_numpy()
print(type(array2))  # <class 'numpy.ndarray'>
print(array2.shape)  # (3, 2)

# 方法3：转换特定列
X = df['Population'].values  # 一维数组 (3,)
y = df['Profit'].values      # 一维数组 (3,)

# 方法4：转换多列
features = df[['Population']].values  # 二维数组 (3, 1)
# 注意：双方括号[[]]返回DataFrame，再.values得到二维数组
# 单方括号[]返回Series，再.values得到一维数组
```

##### NumPy数组 → DataFrame

```python
# 创建示例NumPy数组
data_array = np.array([[6.1101, 17.5920],
                       [5.5277, 9.1302],
                       [8.5186, 13.6620]])

# 方法1：直接传入数组，指定列名
df1 = pd.DataFrame(data_array, columns=['Population', 'Profit'])
print(df1)

# 方法2：从字典创建（当有多个一维数组时）
population = np.array([6.1101, 5.5277, 8.5186])
profit = np.array([17.5920, 9.1302, 13.6620])

df2 = pd.DataFrame({
    'Population': population,
    'Profit': profit
})

# 方法3：指定索引
df3 = pd.DataFrame(data_array,
                   columns=['Population', 'Profit'],
                   index=['City1', 'City2', 'City3'])
```

##### Series和一维数组的转换

```python
# Series → NumPy数组
series = df['Population']  # pandas Series
arr = series.values        # NumPy数组
# 或者
arr = series.to_numpy()

# NumPy数组 → Series
arr = np.array([1, 2, 3, 4, 5])
series = pd.Series(arr, name='my_data')
```

##### 维度问题处理

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

# 问题3：添加维度
arr_1d = np.array([1, 2, 3])
arr_2d = arr_1d[:, np.newaxis]  # 等同于reshape(-1, 1)
```

##### 实际应用案例

```python
def prepare_data_complete(filename):
    """完整的数据准备流程，展示所有转换"""

    # 1. 读取CSV到DataFrame
    df = pd.read_csv(filename, names=['Population', 'Profit'])

    # 2. 数据探索（DataFrame操作）
    print("数据统计信息：")
    print(df.describe())
    print("\n数据类型：")
    print(df.dtypes)

    # 3. 转换为NumPy进行机器学习
    # 方法A：分别提取X和y
    X = df['Population'].values  # shape: (m,)
    y = df['Profit'].values      # shape: (m,)

    # 方法B：一次性提取所有数据
    data = df.values  # shape: (m, 2)
    X_alt = data[:, 0]  # 第一列
    y_alt = data[:, 1]  # 第二列

    # 4. 特征工程（添加偏置列）
    m = len(y)
    X = np.column_stack([np.ones(m), X])  # shape: (m, 2)

    # 5. 训练后，将结果存回DataFrame
    theta = np.array([-3.630, 1.166])  # 假设的训练结果
    predictions = X.dot(theta)

    # 创建结果DataFrame
    results = pd.DataFrame({
        'Population': df['Population'],
        'Actual_Profit': df['Profit'],
        'Predicted_Profit': predictions,
        'Error': df['Profit'] - predictions
    })

    return X, y, results

# 使用示例
# X, y, results = prepare_data_complete('ex1data1.txt')
# print(results.head())
```

##### 类型转换注意事项

```python
# 1. 数据类型保持
df = pd.DataFrame({'A': [1, 2, 3], 'B': [4.5, 5.5, 6.5]})
arr = df.values
print(arr.dtype)  # float64 (自动转换为能容纳所有数据的类型)

# 2. 缺失值处理
df_with_nan = pd.DataFrame({'A': [1, 2, np.nan]})
arr_with_nan = df_with_nan.values  # 保留NaN
arr_filled = df_with_nan.fillna(0).values  # 填充后转换

# 3. 内存效率
# DataFrame的.values创建副本，不是视图
df = pd.DataFrame({'A': range(1000000)})
arr = df.values  # 创建新的内存副本
# 如果只需要读取，考虑使用df.to_numpy(copy=False)

# 4. 索引和列名丢失
# 转换为NumPy后，索引和列名信息会丢失
# 如果需要保留，要单独存储
columns = df.columns.tolist()
index = df.index.tolist()
```

**最佳实践总结**：
1. 数据加载和预处理用DataFrame
2. 数值计算和模型训练用NumPy数组
3. 结果展示和分析再转回DataFrame
4. 注意维度：`df['col']`→一维，`df[['col']]`→二维
5. 使用`.to_numpy()`代替`.values`（更明确）
6. 处理缺失值后再转换为NumPy数组

## 多变量 Multi variable

多变量线性回归就是有多个特征（features）的回归问题！比如预测房价时，不只考虑房屋面积，还要考虑卧室数量、楼层、建造年份等。（本次作业好像是size、bedroom）

### 多变量假设函数

#### 符号约定
- **n**: 特征数量（不包括偏置项x₀=1）
- **m**: 训练样本数量
- **x^(i)**: 第i个训练样本的特征向量
- **x_j^(i)**: 第i个样本的第j个特征值

#### 假设函数表达式

**多变量假设函数**：
$$h_\theta(x) = \theta_0 + \theta_1 x_1 + \theta_2 x_2 + ... + \theta_n x_n$$

**向量化表示**（推荐！）：
$$h_\theta(x) = \theta^T x = x^T \theta$$

其中：
- $\theta = [\theta_0, \theta_1, ..., \theta_n]^T$ 是(n+1)×1的参数向量
- $x = [x_0, x_1, ..., x_n]^T$ 是(n+1)×1的特征向量，其中$x_0 = 1$

### 代价函数（多变量）

代价函数形式与单变量相同，只是现在处理的是向量：

$$J(\theta) = \frac{1}{2m} \sum_{i=1}^{m} (h_\theta(x^{(i)}) - y^{(i)})^2$$

**向量化形式**：
$$J(\theta) = \frac{1}{2m}(X\theta - y)^T(X\theta - y)$$

其中：
- X是m×(n+1)的设计矩阵（design matrix）
- 每一行是一个训练样本（含偏置项）

### 特征归一化 Feature Normalization（超级重要！）

当特征的数值范围差异很大时（比如房屋面积：0-2000平方米，卧室数量：1-5个），梯度下降会很慢并且可能震荡。**特征归一化可以让梯度下降更快收敛！**

#### 为什么需要归一化？

想象一个椭圆形的等高线图 vs 圆形的等高线图，在圆形上梯度下降路径更直接！

#### 两种常用的归一化方法

##### 方法1：均值归一化（Mean Normalization）
$$x_j = \frac{x_j - \mu_j}{s_j}$$

其中：
- $\mu_j$ = 特征j的均值
- $s_j$ = 特征j的范围（max - min）

##### 方法2：Z-score标准化（推荐！）
$$x_j = \frac{x_j - \mu_j}{\sigma_j}$$

其中：
- $\mu_j$ = 特征j的均值
- $\sigma_j$ = 特征j的标准差

**Python实现**：
```python
def normalize_features(X):
    """特征归一化"""
    # 计算均值和标准差（注意：不要归一化偏置列！）
    mu = np.mean(X[:, 1:], axis=0)  # 跳过第0列（偏置列）
    sigma = np.std(X[:, 1:], axis=0)

    # 归一化（创建副本，避免修改原数据）
    X_norm = X.copy()
    X_norm[:, 1:] = (X[:, 1:] - mu) / sigma

    return X_norm, mu, sigma

# 使用sklearn（更方便,但我没咋用过，，，hhh虽然恩达老师视频讲了。。。下次一定）
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X[:, 1:])  # 不归一化偏置列
# 记得保存scaler，用于预测时转换新数据！
```

**重要提醒**：
- **不要归一化偏置列**（全1的那一列）！
- 训练集的均值和标准差要保存下来，用于归一化测试集
- 预测时，新数据也要用同样的均值和标准差归一化

### 多变量梯度下降

#### 梯度计算

对每个参数$\theta_j$：
$$\frac{\partial J(\theta)}{\partial \theta_j} = \frac{1}{m} \sum_{i=1}^{m} (h_\theta(x^{(i)}) - y^{(i)}) \cdot x_j^{(i)}$$

#### 更新规则

同时更新所有参数：
$$\theta_j := \theta_j - \alpha \frac{1}{m} \sum_{i=1}^{m} (h_\theta(x^{(i)}) - y^{(i)}) \cdot x_j^{(i)}$$

**向量化实现**（强烈推荐！）：
$$\theta := \theta - \alpha \frac{1}{m} X^T(X\theta - y)$$

```python
def gradient_descent_multi(X, y, theta, alpha, iterations):
    """多变量梯度下降"""
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

### 学习率的选择

#### 如何判断学习率是否合适？

绘制代价函数随迭代次数的变化图：

```python
plt.plot(J_history)
plt.xlabel('Iterations')
plt.ylabel('Cost J')
plt.title('Convergence Graph')
```

- **正常收敛**：J逐渐减小并趋于平稳
- **学习率过大**：J可能震荡或发散（增大）
- **学习率过小**：收敛很慢

#### 学习率的经验值

尝试这些值：..., 0.001, 0.003, 0.01, 0.03, 0.1, 0.3, 1, ...（每次乘以3）

#### 表格测试法选择最佳学习率（b站一个up主用的，但他说不是很重要，但我想学一下）

创建一个学习率表格，测试不同的值并绘图比较（AI写的代码就是冗长。。。）：

```python
def test_learning_rates(X, y, iterations=100):
    """测试不同学习率的效果"""
    # 创建学习率候选表格
    learning_rates = [0.001, 0.003, 0.01, 0.03, 0.1, 0.3, 1.0]

    # 存储结果
    results = []

    # 创建子图
    fig, axes = plt.subplots(2, 4, figsize=(16, 8))
    axes = axes.flatten()

    for idx, alpha in enumerate(learning_rates):
        # 初始化参数
        theta = np.zeros(X.shape[1])
        J_history = []

        # 梯度下降
        for i in range(iterations):
            predictions = X.dot(theta)
            errors = predictions - y
            theta = theta - alpha * (1/len(y)) * X.T.dot(errors)
            cost = np.sum(errors**2) / (2*len(y))
            J_history.append(cost)

        # 记录结果
        results.append({
            'alpha': alpha,
            'final_cost': J_history[-1],
            'converged': J_history[-1] < J_history[0],  # 是否下降
            'J_history': J_history
        })

        # 绘制收敛曲线
        if idx < 8:
            axes[idx].plot(J_history)
            axes[idx].set_title(f'α = {alpha}')
            axes[idx].set_xlabel('Iteration')
            axes[idx].set_ylabel('Cost')
            axes[idx].grid(True)

            # 标记状态
            if not results[-1]['converged']:
                axes[idx].set_facecolor('#ffcccc')  # 红色背景表示发散
            elif J_history[-1] > 1e-2:
                axes[idx].set_facecolor('#ffffcc')  # 黄色背景表示收敛慢
            else:
                axes[idx].set_facecolor('#ccffcc')  # 绿色背景表示收敛好

    # 隐藏多余的子图
    if len(learning_rates) < 8:
        for idx in range(len(learning_rates), 8):
            axes[idx].set_visible(False)

    plt.tight_layout()
    plt.suptitle('Learning Rate Comparison', y=1.02, fontsize=16)
    plt.show()

    # 打印结果表格
    print("\n学习率测试结果表格：")
    print("-" * 60)
    print(f"{'学习率':<10} {'最终代价':<15} {'是否收敛':<10} {'评价':<15}")
    print("-" * 60)

    for result in results:
        alpha = result['alpha']
        final_cost = result['final_cost']
        converged = "✓" if result['converged'] else "✗"

        # 评价
        if not result['converged'] or final_cost > 1e10:
            evaluation = "发散！过大"
        elif final_cost > 1e-1:
            evaluation = "收敛太慢"
        elif final_cost < 1e-5:
            evaluation = "很好！"
        else:
            evaluation = "可接受"

        print(f"{alpha:<10.3f} {final_cost:<15.6f} {converged:<10} {evaluation:<15}")

    print("-" * 60)

    # 返回最佳学习率
    valid_results = [r for r in results if r['converged'] and r['final_cost'] < 1e10]
    if valid_results:
        best_result = min(valid_results, key=lambda x: x['final_cost'])
        print(f"\n推荐的最佳学习率: {best_result['alpha']}")
        return best_result['alpha']
    else:
        print("\n警告：所有学习率都导致发散！需要更小的值。")
        return None

# 使用示例
best_alpha = test_learning_rates(X_norm, y, iterations=100)
```

#### 自适应学习率策略

```python
def find_optimal_learning_rate(X, y, min_alpha=0.0001, max_alpha=1.0):
    """二分查找最优学习率"""

    def test_alpha(alpha, iterations=50):
        """测试特定学习率是否收敛"""
        theta = np.zeros(X.shape[1])
        prev_cost = float('inf')

        for i in range(iterations):
            predictions = X.dot(theta)
            errors = predictions - y
            theta = theta - alpha * (1/len(y)) * X.T.dot(errors)
            cost = np.sum(errors**2) / (2*len(y))

            # 检查是否发散
            if cost > prev_cost * 1.1:  # 代价增加10%以上认为发散
                return False, cost
            prev_cost = cost

        return True, cost

    # 二分查找
    left, right = min_alpha, max_alpha
    best_alpha = min_alpha

    while right - left > 0.0001:
        mid = (left + right) / 2
        converged, cost = test_alpha(mid)

        if converged:
            best_alpha = mid
            left = mid  # 尝试更大的值
        else:
            right = mid  # 尝试更小的值

    print(f"找到的最优学习率: {best_alpha:.4f}")
    return best_alpha
```

#### 学习率调试技巧总结

1. **先用表格测试法**：快速了解合适的数量级
2. **观察收敛图形**：
   - 平滑下降→好
   - 震荡但总体下降→学习率略大，可以减小
   - 持续上升→学习率太大，必须减小
3. **多特征时更要小心**：特征越多，通常需要更小的学习率
4. **归一化后可用更大学习率**：特征归一化后，通常可以使用0.01-0.1的学习率

### 正规方程 Normal Equation

正规方程是通过解析方法一次性求解θ的方法，不需要迭代！

#### 公式推导

通过令$\nabla_\theta J(\theta) = 0$，可以得到：

$$\theta = (X^T X)^{-1} X^T y$$

#### Python实现

```python
def normal_equation(X, y):
    """使用正规方程求解theta"""
    # 方法1：直接求逆
    theta = np.linalg.inv(X.T.dot(X)).dot(X.T).dot(y)

    # 方法2：使用伪逆（更稳定）
    theta = np.linalg.pinv(X.T.dot(X)).dot(X.T).dot(y)

    # 方法3：最简洁
    theta = np.linalg.lstsq(X, y, rcond=None)[0]

    return theta
```

#### 梯度下降 vs 正规方程

| 梯度下降 | 正规方程 |
|---------|---------|
| 需要选择学习率α | 不需要选择学习率 |
| 需要多次迭代 | 一次计算得出 |
| 当特征数量n很大时也能工作良好 | 需要计算$(X^T X)^{-1}$，复杂度$O(n^3)$ |
| 适合所有类型的模型 | 只适用于线性模型 |
| **n > 10,000时推荐** | **n < 10,000时推荐** |

**什么时候$X^T X$不可逆？**
1. 特征之间线性相关（如：英尺和米同时作为面积特征）
2. 特征数量>样本数量（n > m）

解决方法：
- 删除冗余特征
- 使用正则化（后面会学）
- 使用伪逆`pinv`而不是`inv`

### 多变量线性回归完整示例

```python
# 房价预测示例（多特征）
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 1. 加载数据
data = pd.read_csv('house_prices.csv')
# 假设有特征：size(面积), bedrooms(卧室数), age(房龄)

# 2. 准备特征和目标
X = data[['size', 'bedrooms', 'age']].values
y = data['price'].values
m = len(y)

# 3. 特征归一化
X_norm, mu, sigma = normalize_features(X)

# 4. 添加偏置列
X_norm = np.column_stack([np.ones(m), X_norm])

# 5. 初始化参数
n = X_norm.shape[1]
theta = np.zeros(n)

# 6. 梯度下降
alpha = 0.01
iterations = 1500
theta_gd, J_history = gradient_descent_multi(X_norm, y, theta, alpha, iterations)

# 7. 正规方程（对比）
# 注意：正规方程不需要特征归一化！
X_with_bias = np.column_stack([np.ones(m), X])
theta_ne = normal_equation(X_with_bias, y)

# 8. 预测新房价
new_house = np.array([1650, 3, 10])  # 1650平方英尺，3卧室，10年房龄
new_house_norm = (new_house - mu) / sigma
new_house_norm = np.concatenate([[1], new_house_norm])
predicted_price = new_house_norm.dot(theta_gd)

print(f"预测房价: ${predicted_price:,.2f}")
```

### 实践技巧总结

1. **特征工程很重要**：可以添加多项式特征，如$x_1^2$, $x_1 \cdot x_2$等
2. **一定要归一化**：不同scale的特征会让训练变得很困难
3. **检查收敛**：画出J的变化图，确保在下降
4. **保存归一化参数**：mu和sigma要保存，用于处理新数据
5. **特征数量<1万用正规方程**：简单快速，不用调参

---

## 写在最后

这份笔记是我学习吴恩达机器学习课程第一次大作业的总结。我发现我好喜欢在iPad先写笔记，然后在Obsidian上补充写出来。

### 学习过程中的一些感悟

- 一开始连`as`是缩写的意思都不知道😂
- plot函数总是记不住，每次都要复制粘贴
- B站的up主们真的帮了很大忙
- 从(w,b)到θ向量的转换理解花了不少时间
- 矩阵乘法真的很优雅，一行代码搞定所有计算！

继续加油💪

*—— 2025年，机器学习之旅刚刚开始*