<script>
  let count = 0
  export let data
  console.log(data)
  $: data
  var socket = io('http://localhost:3333')
  // const socket = require('socket.io-client')('http://localhost:3333')
  socket.on('burger_post', (received) => {
    console.log(received)
    data.push(received.data)
    data = data
    console.log(data)
  })
</script>

<div>
  {#each data as { id, name }, i}
    <li>
      <a target="_blank" href="https://www.youtube.com/watch?v={id}">
        {i + 1}: {name}
      </a>
    </li>
  {/each}
  <a href="/pizza"> Go to pizza </a>
</div>
