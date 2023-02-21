<template>
  <nav class="menu-lateral">
    <ul>
      <li>
        <router-link to="/">Inicio</router-link>
      </li>
      <li>
        <router-link to="/marcas">Marcas</router-link>
      </li>
      <li>
        <router-link to="/nueva-marca">Nueva marca</router-link>
      </li>
      <li>
        <router-link to="/modelos">Modelos</router-link>
      </li>
      <li>
        <router-link to="/nuevo-modelo">Nuevo modelo</router-link>
      </li>
      <li>
        <router-link to="/vehiculos">Vehículos</router-link>
      </li>
      <li>
        <router-link to="/nuevo-vehiculo">Nuevo vehículo</router-link>
      </li>
      <li>
        <router-link to="/alquiler">Alquiler</router-link>
      </li>
      <li>
        <router-link to="/clientes">Clientes</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.menu-lateral {
  background-color: #2c3e50;
  color: #fff;
  padding: 1rem;
  width: 25%;
  position: relative;
}

.menu-titulo {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 0.5rem;
}

a {
  color: #fff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.contenido {
  padding: 1rem;
  width: 75%;
}
</style>
