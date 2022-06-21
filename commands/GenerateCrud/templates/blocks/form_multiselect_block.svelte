<!--  MULTI SELECT | {{prop_name}} -->
<div class="my-2 px-2 w-1/3">
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text">{txt('{{prop_name}}')}</span>
    </label>
    <select name="{{prop_name}}" class="multiple w-full max-w-xs" multiple>
      {#each relations.{{prop_name}}List as {{prop_name}} }
        <option
          value={ {{prop_name}}.id }
          selected={ {{model_name}}?.{{prop_name}}.map((x) => x.id).indexOf({{prop_name}}.id) != -1 ? 'selected' : ''}
          >{ {{prop_name}}.id }</option
        >
      {/each}
    </select>
  </div>
</div>
