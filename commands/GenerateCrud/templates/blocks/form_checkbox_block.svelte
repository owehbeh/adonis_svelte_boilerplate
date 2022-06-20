<!--  CHECKBOX | {{prop_name}} -->
<div class="my-2 px-2 w-1/3 overflow-hidden">
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text">{txt('{{prop_name}}')}</span>
    </label>
    <input
      name="{{prop_name}}"
      type="checkbox"
      class="checkbox"
      bind:checked={ {{model_name}}.{{prop_name}} }
    />
  </div>
</div>
