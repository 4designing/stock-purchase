import home from '../views/home.vue'
import nav from '../components/navbar.vue'
import profile from '../components/profile.vue'
import basket from '../components/basket.vue'

export const routes = [{
        path: '',
        components: {
            'nav': nav,
            default: home,
        },
        name: 'home'
    },
    {
        path: '/profile',
        components: {
            'nav': nav,
            default: profile
        },
        name: 'profile'
    },
    {
        path: '/basket',
        components: {
            'nav': nav,
            default: basket
        },
        name: 'basket'
    }

]