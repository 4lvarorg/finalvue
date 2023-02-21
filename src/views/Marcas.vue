<template>
  <div class="container">
    <h1>Marcas</h1>
    <div class="listado-marcas">
      <table>
        <thead>
        <tr>
          <th>Nombre</th>
          <th>País de origen</th>
          <th>Año de fundación</th>
          <th>Precio medio de sus modelos (€/día)</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(marca,index) in marcas " :key="marca.id">
          <td @click="verModelos(marca.id)">{{ marca.nombre }}</td>
          <td>{{ marca.origen }}</td>
          <td>{{ marca.anioFundacion }}</td>
          <td>{{ calcularPrecioMedio(marca) }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import async from "async";

export default {
  name: 'Marcas',
  data() {
    return {
      marcas: [],
      modelos:[],
      precio:0
    };
  },
  created() {
    this.obtenerModelos();
    this.obtenerMarcas();
  },
  computed: {

  },
  methods: {
    obtenerMarcas() {
       axios.get('http://localhost:3000/marcas')
        .then(response => {
          this.marcas = response.data;
          //this.marcasOrdenadas(this.marcas);
        })
        .catch(error => {
          console.error(error);
        });
    },
    calcularPrecioMedio(marca) {
      // Calcular precio medio de los modelos de la marca

         const modeloIdMarca =  this.modelos.find(m => m.idMarca === marca.id);;
         axios.get('http://localhost:3000/vehiculos?idModelo='+modeloIdMarca.id)
             .then(response => {
               const vehiculosIdModelo = response.data;
               const precios = vehiculosIdModelo.map(m => m.precioDia);
               const precioMedio = precios.reduce((total, p) => total + p, 0) / precios.length;
               return  precioMedio;
             })
             .catch(error => {
               console.error(error);
             });
          console.log('modeloIdMarca');
    },
    obtenerModelos(){
      axios.get('http://localhost:3000/modelos')
          .then(response => {
            this.modelos = response.data;
          })
          .catch(error => {
            console.error(error);
          });
    },
    verModelos(idMarca) {
      // Redireccionar a la vista de modelos para la marca seleccionada
      this.$router.push({ name: 'ModelosMarca', params: { idMarca } });
    },
    marcasOrdenadas(marcas) {
      // Ordenar marcas por precio medio de sus modelos (de mayor a menor)
      return marcas.sort((a, b) => {
        const precioMedioA = this.calcularPrecioMedio(a);
        const precioMedioB = this.calcularPrecioMedio(b);
        return precioMedioB - precioMedioA;
      });
    }
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

.listado-marcas {
  flex: 1;
  overflow: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.5rem;
  border: 1px solid #ccc;
  text-align: left;
}

th {
  background-color: #eee;
  font-weight: bold;
}

tr:hover {
  background-color: #eee;
  cursor: pointer;
}
</style>
