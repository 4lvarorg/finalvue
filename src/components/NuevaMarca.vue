<template>
  <div class="container">
    <h1>Nueva Marca</h1>
    <form @submit.prevent="crearMarca">
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" v-model="marca.nombre" required>
      </div>
      <div class="form-group">
        <label for="anio">Año de fundación</label>
        <input type="number" id="anio" v-model.number="marca.anioFundacion" required>
      </div>
      <div class="form-group">
        <label for="origen">País de origen</label>
        <input type="text" id="origen" v-model="marca.origen" required>
      </div>
      <button type="submit">Crear marca</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NuevaMarca',
  data() {
    return {
      marca: {
        nombre: '',
        anioFundacion: null,
        origen: '',
      },
    };
  },
  methods: {
    crearMarca() {
      axios.post('http://localhost:3000/marcas', this.marca)
          .then(response => {
            // Redireccionar a la vista de marcas
            this.$router.push({ name: 'Marcas' });
          })
          .catch(error => {
            console.error(error);
          });
    },
  },
};
</script>

<style>
.container {
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s;
}

button:hover {
  background-color: #0069d9;
}
</style>
