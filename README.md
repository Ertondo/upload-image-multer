# **Como subir imagenes desde un formulario**

> Para realizar el ejemplo segui los pasos de @FaztWeb en su canal de YouTube desde [Subida de Imagenes en Nodejs con Multer](https://www.youtube.com/watch?v=AbJ-y2vZgBs)

---

## **Paso a paso, como crear una web que permita subir imagenes desde un formulario usando express y multer**

---

## _Dependencias_

- Instalar **express** y **multer** como dependencias de produccion.
- Instalar **ejs** y **nodemon** como dependencia de desarrollo.

## _Conexion del servidor_

- ### _Importar *express*, inicializarlo y activarlo_

  > ##### Traemos **express** y lo inicializamos por medio de la constante **app**, luego usamos \*_app_ para iniciar el servidor en el puerto 3000.

```javascript
const express = require("express");
//Initializations
const app = express();
//Server On
app.listen(app.get("port"), () => {
  console.log(colors.bgGreen(`Server on port ${app.get("port")}`));
});
```

- ### _Middlewares_
  > ##### Brindan funciones especiales que deben configurarce antes de las rutas.
  >
  > ##### En este caso **multer** permite manejar imagenes, como, definir donde guardarlas, como nombrarlas, etc.

```javascript
//Middlewares
app.use(
  multer({
    storage,
    dest: path.join(__dirname, "public/upload"),
  }).single("image")
);
```

- ### _Crear las rutas para el navegador_
  > ##### Usando **app** creamos la ruta _get_ que **res**ponde con un llamado al **index** de interfaz html creado con **ejs**.

```javascript
//Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/uploads", (req, res) => {
  const name = `${Date.now()}${path.extname(req.file.originalname)}`;
  res.send("Image OK " + name);
});
```

- ### _Configuraciones_
  > ##### Le decimos a **app** que use la carpeta _public_ para acceso publico de archivos _statics_.
  >
  > ##### Le dimos a **app** que el puerto va a ser el 3000 y que las vistas van a ser manejadas por **ejs** y van a estar en la carpeta _views_.

```javascript
//Settings
app.use(express.static(path.join(__dirname, "./public")));
app.set("port", 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
```

> ##### Funcion de **multer** que me permite indicar el destino y el nombre de la imagen descargada. Tambien por medio de _file_ obtengo toda la info y por su propiedad mimetype puedo saber la extencion y filtrar solo por tipos (jpeg, gif, png).Tambien tiene la propiedad _size_ para definir el tamano maximo.

```javascript
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/upload"),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});
```

### **Resumen:** inicializar **express** configurar **app** y **multer**, luego definir las peticiones de las rutas (get y post) y finalmente activar el servidor.
