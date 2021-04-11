<template>
  <div class="bg-dark text-white pt-3">
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center">
          <hr class="border border-white">
          <p>{{title}}</p>
          <p>{{contact}}</p>
        </div>	
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    props: ['title', 'contact'],
  }
</script> 
