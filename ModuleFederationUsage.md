## 编译

```
yarn build
```

这里我们首先利用`ModuleFederationPlugin` 把所有的 3 方依赖，打成一个额外的 `container`。

然后，在项目本身的编译里，使用上面生成的 `container`，这样，在项目编译时就可以跳过对依赖的检查，加速这个部分的编译速度。

## 预览

```
yarn preview
```
