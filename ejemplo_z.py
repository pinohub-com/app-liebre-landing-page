import numpy as np
import matplotlib.pyplot as plt


def y_recursiva(a, x):
    """y(t) = (1+a)*y(t-1) - a*y(t-2) + x(t) - x(t-1)"""
    n = len(x)
    y = np.zeros(n)

    for t in range(2, n):
        y[t] = (1 + a) * y[t - 1] - a * y[t - 2] + x[t] - x[t - 1]

    return y * T


# %% Graficar la señal de entrada
# Parámetros
T = 0.1
n = 100
t = np.arange(n)
a = np.exp(-T)

# %% mirar variables

# Señal de entrada (escalón unitario)
x = np.ones(n)
x[0] = 0
x[1] = 0

# Calcular y(t)
y = y_recursiva(a, x)
y_normal = 1 - np.exp(-t)


# Graficar
plt.figure(figsize=(10, 5))
plt.plot(t, y, "b-", linewidth=2)
plt.plot(t, x, "g-", linewidth=2)
plt.plot(t, y_normal, "r--", linewidth=2)
plt.grid(True, alpha=0.3)
plt.show()

# %%
