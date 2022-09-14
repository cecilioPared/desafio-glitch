const fs = require("fs");
class Contenedor {
  constructor(path) {
    this.path = path;
  }

  async init() {
    try {
      let productos = [
        {
          title: "Cerveza heineken 355ml",
          price: 44.56,
          thumbnail:
            "https://www.espaciovino.com.ar/media/default/0001/55/thumb_54426_default_medium.jpeg",
        },
        {
          title: "Cerveza corona 355ml",
          price: 55.55,
          thumbnail:
            "https://xamadi.com/wp-content/uploads/2021/01/Cerveza_Corona_355ml.png",
        },
        {
          title: "Cerveza sol 355ml",
          price: 55.55,
          thumbnail:
            "https://www.ccu.com.ar/wp-content/uploads/2021/06/solbotella.png",
        },
      ];
      const data = await this.leerArchivo(this.path);
      if(data.length > 2) return  
      for (const prod of productos) {
        await this.save(prod);
      }
    } catch (error) {
      console.log("Ocurrio un error durante la operación:", error);
      throw new Error(error.message);
    }
  }

  async save(nuevoProducto) {
    try {
      const data = await this.leerArchivo(this.path);
      nuevoProducto.id = data.length + 1;
      data.push(nuevoProducto);
      await this.escribirArchivo(this.path, data);
      return nuevoProducto.id;
    } catch (error) {
      console.log("Ocurrio un error durante la operación:", error);
      throw new Error(error.message);
    }
  }

  async getById(id) {
    try {
      const data = await this.leerArchivo(this.path);
      const dataById = data.find((element) => element.id === id);
      return dataById || null;
    } catch (error) {
      console.log("Ocurrio un error durante la operación:", error);
      throw new Error(error.message);
    }
  }

  async getAll() {
    try {
      const data = await this.leerArchivo(this.path);
      return data;
    } catch (error) {
      console.log("Ocurrio un error durante la operación:", error);
      throw new Error(error.message);
    }
  }

  async deleteById(id) {
    try {
      const data = await this.leerArchivo(this.path);
      const index = data.findIndex((element) => {
        return element.id === id;
      });
      console.log(index, "indice obtenido");
      if (index === -1) {
        console.log(`No se encontro ningun item para borrar con el id ${id}`);
        return;
      }
      data.splice(index, 1);
      await this.escribirArchivo(this.path, data);
    } catch (error) {
      console.log("Ocurrio un error durante la operación:", error);
      throw new Error(error.message);
    }
  }

  async deleteAll() {
    try {
      const data = await leerArchivo(this.path);
      data.splice(0, data.length);
      await this.escribirArchivo(this.path, data);
    } catch (error) {
      console.log("Ocurrio un error durante la operación:", error);
      throw new Error(error.message);
    }
  }

  async escribirArchivo(ruta, contenido) {
    try {
      await fs.promises.writeFile(
        ruta,
        JSON.stringify(contenido, null, 2),
        "utf-8"
      );
    } catch (error) {
      console.log("Ocurrio un error durante la escritura:", error);
      throw new Error(error.message);
    }
  }

  async leerArchivo(ruta) {
    try {
      const existe = fs.existsSync(ruta);
      if (!existe) return [];

      const contenido = await fs.promises.readFile(ruta, "utf-8");
      return JSON.parse(contenido);
    } catch (error) {
      console.log("Ocurrio un error durante la lectura:", error);
      throw new Error(error.message);
    }
  }
}

module.exports = Contenedor;
