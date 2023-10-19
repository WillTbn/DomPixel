<template>
    <div>
        <b-navbar toggleable="xl">
            <b-navbar-brand style="margin-right:0 !important" class="w-50">
                <b-img src="http://localhost/jorgenunes.png" class="brand-control"></b-img>
            </b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item href="#">
                        <router-link to="/">Sobre projeto</router-link>
                    </b-nav-item>
                    <b-nav-item href="#">
                        <router-link to="/Products">Catálogo de Produtos </router-link>
                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <transition mode="out-in"
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
        >
            <router-view/>
        </transition>
    </div>
</template>
<style>
.brand-control{
    width: 25%;
    aspect-ratio: 3/2;
    object-fit: contain;
    mix-blend-mode: color-burn;
}
</style>
