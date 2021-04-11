<template>
  <b-navbar toggleable="xl" type="dark" variant="dark">
    <b-container>
      <div class="p-1">
        <div class="row m-0">
          <p class="text-white h5 mr-0 mb-0">{{ mainTitle }}</p>
        </div>
        <div class="row m-0 justify-content-center">
          <p class="text-secondary h6">{{ subTitle }}</p>
        </div>
      </div>
      <b-nav-toggle target="nav-collapse"></b-nav-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar type="dark" variant="dark">
          <b-navbar-nav>
            <!-- Navbar dropdowns -->
            <!-- <b-nav-item-dropdown text="文書" right>
              <b-dropdown-item href="#"></b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown text="人事" right>
              <b-dropdown-item href="#"></b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown text="自治章規" right>
              <b-dropdown-item href="#"></b-dropdown-item>
            </b-nav-item-dropdown>-->
          </b-navbar-nav>
        </b-navbar>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  props: ["mainTitle", "subTitle"],
};
</script>

<style>
</style>