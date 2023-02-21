<template>
  <div>
    <h2>Nuevo Vehículo</h2>
    <form @submit.prevent="crearVehiculo">
      <div class="form-group">
        <label>Marca:</label>
        <select v-model="idMarca">
          <option v-for="marca in marcas" :key="marca.id" :value="marca.id">
            {{ marca.nombre }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>Modelo:</label>
        <select v-model="idModelo">
          <option v-for="modelo in modelos" :key="modelo.id" :value="modelo.id">
            {{ modelo.modelo }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>Precio por día:</label>
        <input type="number" v-model="precioDia" required>
      </div>
      <div class="form-group">
        <label>Número de puertas:</label>
        <input type="number" v-model="puertas" required>
      </div>
      <div class="form-group">
        <label>Silla infantil:</label>
        <input type="checkbox" v-model="sillaInfantil">
      </div>
      <button type="submit">Guardar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NuevoVehiculo',
  data() {
    return {
      marcas: [],
      modelos: [],
      idMarca: '',
      idModelo: '',
      precioDia: '',
      puertas: '',
      sillaInfantil: false,
    };
  },
  mounted() {
    axios
        .get('http://localhost:3000/marcas')
        .then(response => {
          this.marcas = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    axios
        .get('http://localhost:3000/modelos')
        .then(response => {
          this.modelos = response.data;
        })
        .catch(error => {
          console.log(error);
        });
  },
  methods: {
    crearVehiculo() {
      const vehiculo = {
        idModelo: this.idModelo,
        precioDia: this.precioDia,
        puertas: this.puertas,
        sillaInfantil: this.sillaInfantil,
      };
      axios
          .post('http://localhost:3000/vehiculos', vehiculo)
          .then(response => {
            console.log(response.data);
            this.$emit('vehiculo-creado');
          })
          .catch(error => {
            console.log(error);
          });
    },
  },
};
</script>
<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

label {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
}

select {
  margin-left: 1rem;
}

input {
  margin-left: 1rem;
}

button {
  margin-top: 2rem;
}
</style>
