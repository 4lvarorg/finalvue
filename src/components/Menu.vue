<template>
  <nav class="menu">
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
.menu {
  width: 100%;
  height: 50px;
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

ul {
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0;
  padding: 0;
}

li {
  margin-right: 15px;
}

a {
  color: white;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
}

a:hover {
  text-decoration: underline;
}
</style>
