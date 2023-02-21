import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '@/views/Inicio.vue'
import Marcas from '@/views/Marcas.vue'
import NuevaMarca from '@/components/NuevaMarca.vue'
import Modelos from '@/views/Modelos.vue'
import NuevoModelo from '@/components/NuevoModelo.vue'
import Vehiculos from '@/views/Vehiculos.vue'
import NuevoVehiculo from '@/components/NuevoVehiculo.vue'
import Alquiler from '@/views/Alquiler.vue'
import Clientes from '@/views/Clientes.vue'

const routes = [
    {
        path: '/',
        name: 'Inicio',
        component: Inicio
    },
    {
        path: '/marcas',
        name: 'Marcas',
        component: Marcas
    },
    {
        path: '/nueva-marca',
        name: 'NuevaMarca',
        component: NuevaMarca
    },
    {
        path: '/modelos',
        name: 'Modelos',
        component: Modelos
    },
    {
        path: '/nuevo-modelo',
        name: 'NuevoModelo',
        component: NuevoModelo
    },
    {
        path: '/vehiculos',
        name: 'Vehiculos',
        component: Vehiculos
    },
    {
        path: '/nuevo-vehiculo',
        name: 'NuevoVehiculo',
        component: NuevoVehiculo
    },
    {
        path: '/alquiler',
        name: 'Alquiler',
        component: Alquiler
    },
    {
        path: '/clientes',
        name: 'Clientes',
        component: Clientes
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router