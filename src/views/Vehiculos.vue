<template>
  <div class="container">
    <h1>Vehículos</h1>
    <div class="form-group">
      <label for="marca">Marca</label>
      <select id="marca" v-model="marcaSeleccionada" @change="cargarModelos()">
        <option value="">-- Seleccione una marca --</option>
        <option v-for="marca in marcas" :key="marca.id" :value="marca.id">{{ marca.nombre }}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="modelo">Modelo</label>
      <select id="modelo" v-model="modeloSeleccionado" :disabled="!marcaSeleccionada" @change="cargarVehiculos()">
        <option value="">-- Seleccione un modelo --</option>
        <option v-for="modelo in modelosFiltrados" :key="modelo.id" :value="modelo.id">{{ modelo.modelo }}</option>
      </select>
    </div>
    <div v-if="!vehiculosFiltrados.length">No se han encontrado vehículos</div>
    <div v-else>
      <table>
        <thead>
        <tr>
          <th>Modelo</th>
          <th>Precio por día</th>
          <th>Clientes que lo han alquilado</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="vehiculo in vehiculosFiltrados" :key="vehiculo.id">
          <td>{{ modeloPorId(vehiculo.idModelo)?.modelo }}</td>
          <td>{{ vehiculo.precioDia }} €</td>
          <td>
            <ul>
              <li v-for="alquiler in alquileresPorVehiculo(vehiculo.id)" :key="alquiler.id">
                {{ clientePorId(alquiler.idCliente)?.nombre }} ({{ alquiler.numDias }} días)
              </li>
            </ul>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <button @click="mostrarNuevoVehiculo()">Nuevo Vehículo</button>
    <div v-if="mostrarFormulario">
      <nuevo-vehiculo :marcaSeleccionada="marcaSeleccionada" :modeloSeleccionado="modeloSeleccionado" @ocultar="ocultarFormulario"/>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import NuevoVehiculo from '../components/NuevoVehiculo.vue';

export default {
  name: 'Vehiculos',
  components: {
    NuevoVehiculo,
  },
  data() {
    return {
      marcas: [],
      modelos: [],
      vehiculos: [],
      clientes: [],
      marcaSeleccionada: '',
      modeloSeleccionado: '',
      modelosFiltrados: [],
      vehiculosFiltrados: [],
      mostrarFormulario: false,
    };
  },
  created() {
    this.obtenerDatos();
  },
  methods: {
    async obtenerDatos() {
      const responseMarcas = await axios.get('http://localhost:3000/marcas');
      this.marcas = responseMarcas.data;

      const responseModelos = await axios.get('http://localhost:3000/modelos');
      this.modelos = responseModelos.data;

      const responseVehiculos = await axios.get('http://localhost:3000/vehiculos');
      this.vehiculos = responseVehiculos.data;

      const responseClientes = await axios.get('http://localhost:3000/clientes');
      this.clientes = responseClientes.data;
    },
    cargarModelos() {
      const marcaSeleccionada = this.marcaSeleccionada;
      if (marcaSeleccionada) {
        this.modelosFiltrados = this.modelos.filter(modelo => modelo.idMarca === marcaSeleccionada);
      } else {
        this.modelosFiltrados = this.modelos;
      }
      this.modeloSeleccionado = '';
    },
    mostrarNuevoVehiculo() {
      this.mostrarFormulario = true;
    },
    ocultarNuevoVehiculo() {
      this.mostrarFormulario = false;
    },
    async guardarNuevoVehiculo(datosVehiculo) {
      const nuevoVehiculo = {
        idModelo: datosVehiculo.modelo,
        precioDia: datosVehiculo.precioDia,
        puertas: datosVehiculo.puertas,
        sillaInfantil: datosVehiculo.sillaInfantil,
      };

      await axios.post('http://localhost:3000/vehiculos', nuevoVehiculo);
      this.obtenerDatos();
      this.mostrarFormulario = false;
    },
    cargarVehiculos() {
      const marcaSeleccionada = this.marcaSeleccionada;
      const modeloSeleccionado = this.modeloSeleccionado;
      if (marcaSeleccionada && modeloSeleccionado) {
        this.vehiculosFiltrados = this.vehiculos.filter(
            vehiculo => vehiculo.idModelo === modeloSeleccionado
        );
      } else if (marcaSeleccionada && !modeloSeleccionado) {
        const modelosFiltrados = this.modelos.filter(
            modelo => modelo.idMarca === marcaSeleccionada
        );
        const modelosIds = modelosFiltrados.map(modelo => modelo.id);
        this.vehiculosFiltrados = this.vehiculos.filter(
            vehiculo => modelosIds.includes(vehiculo.idModelo)
        );
      } else {
        this.vehiculosFiltrados = this.vehiculos;
      }
    },
  },
  computed: {
    marcasOrdenadas() {
      return this.marcas.sort((a, b) => (a.nombre > b.nombre ? 1 : -1));
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

select {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ced4da;
  margin-right: 1rem;
}

button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  border: none;
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

.add-button {
  margin-top: 1rem;
}
</style>
