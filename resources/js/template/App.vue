<template>
    <div>
        <b-navbar>
            <b-navbar-brand>
                <b-img src="https://jorgenunes.vercel.app/assets/img/icones/JorgeNunes.png" class="w-25"></b-img>
            </b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item href="#"><router-link to="/">Home</router-link></b-nav-item>
                    <b-nav-item href="#"><router-link to="/Documentation">Sobre</router-link></b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                    <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                    </b-nav-form>
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
