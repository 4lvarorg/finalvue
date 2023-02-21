<template>
  <div class="clientes-container">
    <div class="clientes-list-container">
      <h2>Clientes</h2>
      <ul>
        <li v-for="cliente in clientes" :key="cliente.id" @click="cargarVehiculos(cliente)">
          {{ cliente.nombre }} ({{ cliente.dni }})
        </li>
      </ul>
    </div>
    <div class="vehiculos-container">
      <h2>Vehículos alquilados</h2>
      <ul v-if="vehiculos.length > 0">
        <li v-for="vehiculo in vehiculos" :key="vehiculo.id">
          {{ vehiculo.marca }} {{ vehiculo.modelo }} ({{ vehiculo.precioFinal }}€)
        </li>
      </ul>
      <p v-else>No hay vehículos alquilados</p>
    </div>
    <div class="form-container">
      <h2>Formulario</h2>
      <form>
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input type="text" v-model="cliente.nombre" id="nombre" required>
        </div>
        <div class="form-group">
          <label for="dni">DNI:</label>
          <input type="text" v-model="cliente.dni" id="dni" required>
        </div>
        <div class="form-buttons-container">
          <button :disabled="!nuevoCliente" @click.prevent="registrarCliente">Alta</button>
          <button :disabled="!clienteSeleccionado" @click.prevent="modificarCliente">Modificar</button>
          <button :disabled="!clienteSeleccionado" @click.prevent="eliminarCliente">Eliminar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      clientes: [],
      vehiculos: [],
      cliente: {
        nombre: '',
        dni: '',
      },
      clienteSeleccionado: null,
      nuevoCliente: true,
    };
  },
  methods: {
    async cargarClientes() {
      const response = await axios.get('http://localhost:3000/clientes');
      this.clientes = response.data;
    },
    async cargarVehiculos(cliente) {
      const response = await axios.get(`http://localhost:3000/alquileres?clienteId=${cliente.id}&_expand=vehiculo`);
      this.vehiculos = response.data.map(alquiler => ({
        marca: alquiler.vehiculo.marca,
        modelo: alquiler.vehiculo.modelo,
        precioFinal: alquiler.precioFinal,
      }));
      this.clienteSeleccionado = cliente;
      this.cliente = {
        id: cliente.id,
        nombre: cliente.nombre,
        dni: cliente.dni,
      };
      this.nuevoCliente = false;
    },
    async registrarCliente() {
      await axios.post('http://localhost:3000/clientes', this.cliente);
      this.cliente = {
        nombre: '',
        dni: '',
      };
      this.nuevoCliente = true;
      await this.cargarClientes();
    },
    async modificarCliente() {
      await axios.put(`http://localhost:3000/clientes/${this.clienteSeleccionado.id}`, this.cliente);
      this.cliente = {
        nombre: '',
        dni: '',
      };
      this.clienteSeleccionado = null;
      this.cargarClientes();
      this.cargarVehiculosCliente();
    },

    async eliminarCliente() {
      await axios.delete(`http://localhost:3000/clientes/${this.clienteSeleccionado.id}`);
      this.cliente = {
        nombre: '',
        dni: '',
      };
      this.clienteSeleccionado = null;
      this.cargarClientes();
      this.cargarVehiculosCliente();
    },
  },
  created() {
    this.cargarClientes();
  },
};
</script>
<style>
.clientes-container {
  display: flex;
  flex-direction: row;
}

.clientes-list {
  margin-right: 20px;
  width: 30%;
}

.cliente-form {
  width: 70%;
}

.cliente-form .form-group {
  margin-bottom: 20px;
}

.cliente-form label {
  display: block;
  margin-bottom: 5px;
}

.cliente-form input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.cliente-form button {
  margin-top: 20px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #4CAF50;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.cliente-form button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.vehiculos-list {
  margin-top: 20px;
}

.vehiculos-list h3 {
  margin-bottom: 10px;
}

.vehiculos-list table {
  width: 100%;
  border-collapse: collapse;
}

.vehiculos-list th,
.vehiculos-list td {
  padding: 10px;
  border: 1px solid #ccc;
}

.vehiculos-list th {
  background-color: #f2f2f2;
  text-align: left;
}

.vehiculos-list tr:hover {
  background-color: #f5f5f5;
}
</style>



