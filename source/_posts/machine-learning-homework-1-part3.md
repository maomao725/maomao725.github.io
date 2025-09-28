---
title: 📊 机器学习第一次大作业系列3：多变量回归与优化技巧
date: 2025-09-28 16:00:00
tags:
  - 机器学习
  - 多变量回归
  - 特征归一化
  - 学习率优化
  - 正规方程
  - 作业笔记
categories:
  - 技术教程
cover: /img/background.png
top_img: /img/background.png
description: 掌握多变量线性回归的高级技巧，包括特征归一化、学习率优化策略和正规方程的使用。
mathjax: true
---

## 🔢 多变量线性回归概述

多变量线性回归就是有多个特征（features）的回归问题！比如预测房价时，不只考虑房屋面积，还要考虑卧室数量、楼层、建造年份等。

### 符号约定
- **n**: 特征数量（不包括偏置项x₀=1）
- **m**: 训练样本数量
- **x^(i)**: 第i个训练样本的特征向量
- **x_j^(i)**: 第i个样本的第j个特征值

### 多变量假设函数

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

## 🎯 特征归一化 - 超级重要！

当特征的数值范围差异很大时（比如房屋面积：0-2000平方米，卧室数量：1-5个），梯度下降会很慢并且可能震荡。**特征归一化可以让梯度下降更快收敛！**

### 为什么需要归一化？

想象一个椭圆形的等高线图 vs 圆形的等高线图，在圆形上梯度下降路径更直接！

### 两种常用的归一化方法

#### 方法1：均值归一化（Mean Normalization）
$$x_j = \frac{x_j - \mu_j}{s_j}$$

其中：
- $\mu_j$ = 特征j的均值
- $s_j$ = 特征j的范围（max - min）

#### 方法2：Z-score标准化（推荐！）
$$x_j = \frac{x_j - \mu_j}{\sigma_j}$$

其中：
- $\mu_j$ = 特征j的均值
- $\sigma_j$ = 特征j的标准差

### Python实现

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

# 使用sklearn（更方便，但我没咋用过，，，hhh虽然恩达老师视频讲了。。。下次一定）
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X[:, 1:])  # 不归一化偏置列
# 记得保存scaler，用于预测时转换新数据！
```

**重要提醒**：
- **不要归一化偏置列**（全1的那一列）！
- 训练集的均值和标准差要保存下来，用于归一化测试集
- 预测时，新数据也要用同样的均值和标准差归一化

## ⚡ 学习率选择与优化

### 如何判断学习率是否合适？

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

### 学习率的经验值

尝试这些值：..., 0.001, 0.003, 0.01, 0.03, 0.1, 0.3, 1, ...（每次乘以3）

### 表格测试法选择最佳学习率

创建一个学习率表格，测试不同的值并绘图比较（B站一个up主用的，但他说不是很重要，但我想学一下）：

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
    return results
```

### 自适应学习率策略

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

### 学习率调试技巧总结

1. **先用表格测试法**：快速了解合适的数量级
2. **观察收敛图形**：
   - 平滑下降→好
   - 震荡但总体下降→学习率略大，可以减小
   - 持续上升→学习率太大，必须减小
3. **多特征时更要小心**：特征越多，通常需要更小的学习率
4. **归一化后可用更大学习率**：特征归一化后，通常可以使用0.01-0.1的学习率

## 📊 多变量梯度下降

### 梯度计算

对每个参数$\theta_j$：
$$\frac{\partial J(\theta)}{\partial \theta_j} = \frac{1}{m} \sum_{i=1}^{m} (h_\theta(x^{(i)}) - y^{(i)}) \cdot x_j^{(i)}$$

### 更新规则

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

## 📐 正规方程 (Normal Equation)

正规方程是通过解析方法一次性求解θ的方法，不需要迭代！

### 公式推导

通过令$\nabla_\theta J(\theta) = 0$，可以得到：

$$\theta = (X^T X)^{-1} X^T y$$

### Python实现

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

### 梯度下降 vs 正规方程

| 梯度下降 | 正规方程 |
|---------|---------|
| 需要选择学习率α | 不需要选择学习率 |
| 需要多次迭代 | 一次计算得出 |
| 当特征数量n很大时也能工作良好 | 需要计算$(X^T X)^{-1}$，复杂度$O(n^3)$ |
| 适合所有类型的模型 | 只适用于线性模型 |
| **n > 10,000时推荐** | **n < 10,000时推荐** |

### 什么时候$X^T X$不可逆？

1. 特征之间线性相关（如：英尺和米同时作为面积特征）
2. 特征数量>样本数量（n > m）

解决方法：
- 删除冗余特征
- 使用正则化（后面会学）
- 使用伪逆`pinv`而不是`inv`

## 💻 完整示例：房价预测

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

## 💡 学习心得与实践技巧

### 重要概念总结

1. **特征工程很重要**：可以添加多项式特征，如$x_1^2$, $x_1 \cdot x_2$等
2. **一定要归一化**：不同scale的特征会让训练变得很困难
3. **检查收敛**：画出J的变化图，确保在下降
4. **保存归一化参数**：mu和sigma要保存，用于处理新数据
5. **特征数量<1万用正规方程**：简单快速，不用调参

### 常见陷阱避免

- **忘记归一化偏置列**：偏置列永远是1，不需要归一化
- **学习率设置不当**：太大发散，太小收敛慢
- **忘记保存归一化参数**：新数据无法正确预处理
- **混用归一化和非归一化数据**：会导致预测错误

### 算法选择指南

- **特征数 < 1000**：正规方程更简单
- **特征数 > 10000**：梯度下降更高效
- **需要在线学习**：只能用梯度下降
- **数据有噪声**：梯度下降更鲁棒

---

*机器学习第一次大作业系列完结，终于做完了，，，其实我墨迹了好久，事情好多*