<script>
  import "../app.css";
	import Header from "../comp/Header.svelte";

</script>

<div class="max-h-screen h-screen">

  <Header></Header>
  <dir class="w-full bg-neutral-900">
    <slot />
    
  </dir>
</div>