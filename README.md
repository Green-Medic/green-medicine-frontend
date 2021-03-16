# green-medicine

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run in production mood
```
docker build -t green . ; docker run -it -p 8000:80 --rm --name green-name green
```