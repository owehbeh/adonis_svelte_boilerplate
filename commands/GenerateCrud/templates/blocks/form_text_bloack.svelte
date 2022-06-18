<div class="my-2 px-2 w-1/3 overflow-hidden">
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text">{txt('{{prop_name}}')}</span>
    </label>
    <input type="text" placeholder="{txt('Insert')} {txt('{{prop_name}}')}" class="input input-bordered w-full max-w-xs" />
    <label class="label">
      <span class="label-text-alt">{DATA.errors.{{prop_name}} || ''}</span>
    </label>
  </div>
</div>
