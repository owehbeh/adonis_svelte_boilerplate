<!--  SELECT | {{prop_name}} -->
<div class="my-2 px-2 w-1/3 overflow-hidden">
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text">{txt('{{prop_name}}')}</span>
    </label>
    <select name="{{prop_name}}" class="select select-bordered w-full max-w-xs">
      {#each relations.{{prop_name}}List as {{prop_name}} }
        <option value={ {{prop_name}}.id }>{ {{prop_name}}.id }</option>
      {/each}
    </select>
  </div>
</div>
