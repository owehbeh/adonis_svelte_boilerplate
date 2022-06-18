<!-- {{prop_name}} modal -->
<div class="modal modal-bottom sm:modal-middle" id="{{model_name}}-{{prop_name}}-modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">{txt('{{prop_name}}')}</h3>
    <ul class="menu p-2">
      {#each {{model_name}}.{{prop_name}} as {{prop_name}}Item}
        <li class="m-0"><a href="/{{prop_name}}s/{ {{prop_name}}Item.id }" class="m-0">{ {{prop_name}}Item.id }</a></li>
      {/each}
    </ul>
    <div class="modal-action">
      <a href="##" class="btn">{txt('Close')}</a>
    </div>
  </div>
</div>
