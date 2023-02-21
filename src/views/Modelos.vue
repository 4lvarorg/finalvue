<template>
  <div class="container">
    <h2>Modelos</h2>
    <div class="form-group">
      <label for="marca">Selecciona una marca:</label>
      <select id="marca" v-model="selectedMarca" @change="cargarModelos()">
        <option disabled value="">Selecciona una marca</option>
        <option v-for="marca in marcas" :key="marca.id" :value="marca">{{ marca.nombre }}</option>
      </select>
    </div>
    <div v-if="selectedMarca" class="form-group">
      <h3>{{ selectedMarca.nombre }}</h3>
      <table>
        <thead>
        <tr>
          <th>Modelo</th>
          <th>Precio medio / día</th>
          <th>Extra</th>
          <th>Acciones</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="modelo in modelos" :key="modelo.id">
          <td>{{ modelo.modelo }}</td>
          <td>{{ precioMedio(modelo) }}€</td>
          <td>{{ modelo.extraPorModelo }}€</td>
          <td>
            <button v-if="modelo.extraPorModelo === 0" @click="editarPrecio(modelo)">Editar precio</button>
            <span v-else>Ya tiene un extra asignado</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Modelos',
  data() {
    return {
      marcas: [],
      selectedMarca: null,
      modelos: []
    }
  },
  methods: {
    cargarMarcas() {
      axios.get('http://localhost:3000/marcas')
          .then(response => {
            this.marcas = response.data
          })
          .catch(error => console.log(error))
    },
    cargarModelos() {
      axios.get(`http://localhost:3000/modelos?_expand=marca&idMarca=${this.selectedMarca.id}`)
          .then(response => {
            this.modelos = response.data
          })
          .catch(error => console.log(error))
    },
    precioMedio(modelo) {
      let total = 0
      let cantidad = 0
      this.modelos.forEach(m => {
        if (m.idMarca === modelo.idMarca) {
          total += m.precioDia
          cantidad++
        }
      })
      return (total / cantidad).toFixed(2)
    },
    editarPrecio(modelo) {
      const nuevoPrecio = prompt('Introduce el nuevo precio medio para el modelo:')
      if (nuevoPrecio) {
        axios.patch(`http://localhost:3000/modelos/${modelo.id}`, { precioDia: nuevoPrecio })
            .then(response => {
              const index = this.modelos.findIndex(m => m.id === modelo.id)
              this.modelos.splice(index, 1, response.data)
            })
            .catch(error => console.log(error))
      }
    }
  },
  mounted() {
    this.cargarMarcas()
  }
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

table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  padding: 0.5rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
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