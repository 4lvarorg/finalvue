<template>
  <div class="alquiler-container">
    <h2>Alquilar vehículo</h2>
    <div class="form-container">
      <div class="form-group">
        <label for="marca-select">Marca:</label>
        <select v-model="marcaSeleccionada" id="marca-select" @change="cargarModelos">
          <option disabled value="">Selecciona una marca</option>
          <option v-for="marca in marcas" :key="marca.id" :value="marca.id">{{ marca.nombre }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="modelo-select">Modelo:</label>
        <select v-model="modeloSeleccionado" id="modelo-select" @change="cargarVehiculos" :disabled="!marcaSeleccionada">
          <option disabled value="">Selecciona un modelo</option>
          <option v-for="modelo in modelosFiltrados" :key="modelo.id" :value="modelo.id">{{ modelo.modelo }} ({{ modelo.extraPorModelo }}€ extra/día)</option>
        </select>
      </div>
      <div class="form-group">
        <label for="vehiculo-select">Vehículo:</label>
        <select v-model="vehiculoSeleccionado" id="vehiculo-select" :disabled="!modeloSeleccionado || !marcaSeleccionada">
          <option disabled value="">Selecciona un vehículo</option>
          <option v-for="vehiculo in vehiculosFiltrados" :key="vehiculo.id" :value="vehiculo.id">{{ vehiculo.modelo }} ({{ vehiculo.precioDia }}€/día)</option>
        </select>
      </div>
      <div class="form-group">
        <label for="cliente-select">Cliente:</label>
        <select v-model="clienteSeleccionado" id="cliente-select">
          <option disabled value="">Selecciona un cliente</option>
          <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">{{ cliente.nombre }} ({{ cliente.dni }})</option>
        </select>
      </div>
      <div class="form-group">
        <label for="numDias">Número de días:</label>
        <input type="number" v-model.number="numDias" id="numDias" min="1" required>
      </div>
      <div class="form-group">
        <label for="fechaInic">Fecha de inicio:</label>
        <input type="date" v-model="fechaInic" id="fechaInic" required>
      </div>
      <button :disabled="!marcaSeleccionada || !modeloSeleccionado || !vehiculoSeleccionado || !clienteSeleccionado || !numDias || !fechaInic" @click="registrarAlquiler">Alquilar</button>
    </div>
    <div class="resultado-container" v-if="resultadoAlquiler">
      <h3>Alquiler realizado</h3>
      <p>Marca: {{ marcaSeleccionada }}</p>
      <p>Modelo: {{ modeloSeleccionado }}</p>
      <p>Vehículo: {{ vehiculoSeleccionado }} ({{ precioDia }}€/día)</p>
      <p>Cliente: {{ clienteSeleccionado }}</p>
      <p>Número de días: {{ numDias }}</p>
      <p>Fecha de inicio: {{ fechaInic }}</p>
      <p>Precio total a pagar: {{ precioTotal }}€</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Alquiler",
  data() {
    return {
      marcas: [],
      modelos: [],
      vehiculos: [],
      clientes: [],
      marcaSeleccionada: "",
      modeloSeleccionado: "",
      vehiculoSeleccionado: "",
      clienteSeleccionado: "",
      numDias: "",
      fechaInic: "",
      resultadoAlquiler: null,
      precioDia: null,
    };
  },
  methods: {
    async cargarMarcas() {
      try {
        const response = await axios.get("http://localhost:3000/marcas");
        this.marcas = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async cargarModelos() {
      if (this.marcaSeleccionada) {
        try {
          const response = await axios.get(
              `http://localhost:3000/modelos?marcaId=${this.marcaSeleccionada}`
          );
          this.modelos = response.data;
        } catch (error) {
          console.log(error);
        }
      } else {
        this.modelos = [];
        this.vehiculos = [];
      }
    },
    async cargarVehiculos() {
      if (this.marcaSeleccionada && this.modeloSeleccionado) {
        try {
          const response = await axios.get(
              `http://localhost:3000/vehiculos?modeloId=${this.modeloSeleccionado}`
          );
          this.vehiculos = response.data;
        } catch (error) {
          console.log(error);
        }
      } else {
        this.vehiculos = [];
      }
    },
    async cargarClientes() {
      try {
        const response = await axios.get("http://localhost:3000/clientes");
        this.clientes = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async registrarAlquiler() {
      try {
        const vehiculo = this.vehiculos.find(
            (v) => v.id === parseInt(this.vehiculoSeleccionado)
        );
        this.precioDia = vehiculo.precioDia + vehiculo.extraPorModelo;

        const data = {
          marcaId: parseInt(this.marcaSeleccionada),
          modeloId: parseInt(this.modeloSeleccionado),
          vehiculoId: parseInt(this.vehiculoSeleccionado),
          clienteId: parseInt(this.clienteSeleccionado),
          numDias: parseInt(this.numDias),
          fechaInic: this.fechaInic,
        };

        await axios.post("http://localhost:3000/alquileres", data);

        this.resultadoAlquiler = {
          marca: this.marcas.find((m) => m.id === parseInt(this.marcaSeleccionada)).nombre,
          modelo: this.modelos.find((m) => m.id === parseInt(this.modeloSeleccionado)).modelo,
          vehiculo: this.vehiculos.find((v) => v.id === parseInt(this.vehiculoSeleccionado)).modelo,
          cliente: this.clientes.find((c) => c.id === parseInt(this.clienteSeleccionado)).nombre,
          precioTotal: this.numDias * this.precioDia,
        };
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.cargarMarcas();
    this.cargarClientes();
  },
};
</script>
<style scoped>
.nuevo-vehiculo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 5px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
