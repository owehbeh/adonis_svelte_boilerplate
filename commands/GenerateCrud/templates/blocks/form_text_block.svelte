<!--  STRING/NUMBER | {{prop_name}} -->
<div class="my-2 px-2 w-1/3 overflow-hidden">
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text">{txt('{{prop_name}}')}</span>
    </label>
    <input
      type="text"
      name="{{prop_name}}"
      placeholder="{txt('Insert')} {txt('{{prop_name}}')}"
      class="input input-bordered w-full max-w-xs"
      value={ {{model_name}}.{{prop_name}} }
    />
    <label class="label">
      <span class="label-text-alt">{$page.props.errors?.{{prop_name}} || ''}</span>
    </label>
  </div>
</div>
