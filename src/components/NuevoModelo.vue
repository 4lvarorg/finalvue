<template>
  <div class="container">
    <form @submit.prevent="createModelo">
      <div class="form-group">
        <label for="marca">Marca:</label>
        <select id="marca" v-model="selectedMarca">
          <option value="" disabled>Selecciona una marca</option>
          <option v-for="marca in marcas" :value="marca.nombre" :key="marca.id">{{ marca.nombre }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="modelo">Modelo:</label>
        <input type="text" id="modelo" v-model="modelo" required>
      </div>
      <div class="form-group">
        <label for="precioMedio">Precio Medio:</label>
        <input type="number" id="precioMedio" v-model="precioMedio" required>
      </div>
      <div class="form-group">
        <label for="extraPorModelo">Precio Extra:</label>
        <input type="number" id="extraPorModelo" v-model="extraPorModelo">
      </div>
      <button type="submit">Crear</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'NuevoModelo',
  data() {
    return {
      marcas: [],
      selectedMarca: '',
      modelo: '',
      precioMedio: '',
      extraPorModelo: '',
    }
  },
  created() {
    axios.get('http://localhost:3000/marcas')
        .then(response => {
          this.marcas = response.data
        })
        .catch(error => {
          console.log(error)
        })
  },
  methods: {
    createModelo() {
      axios.post('http://localhost:3000/modelos', {
        idMarca: this.marcas.find(m => m.nombre === this.selectedMarca).id,
        modelo: this.modelo,
        precioMedio: this.precioMedio,
        extraPorModelo: this.extraPorModelo ? this.extraPorModelo : 0,
      })
          .then(response => {
            this.$emit('modelo-creado', response.data)
            this.modelo = ''
            this.precioMedio = ''
            this.extraPorModelo = ''
          })
          .catch(error => {
            console.log(error)
          })
    },
  },
}
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

select {
  padding: 0.5rem;
  font-size: 1rem;
}

input {
  padding: 0.5rem;
  font-size: 1rem;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #2c3e50;
  color: #fff;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #34495e;
}
</style>
