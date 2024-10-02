<script>
    import { createEventDispatcher } from 'svelte';
  
    export let attendees = [];
    
    const dispatch = createEventDispatcher();
    const today = new Date().toISOString().split('T')[0];
    
    let password = '';
    let selectedAttendee = null;
    
    $: presentToday = attendees.filter(a => a.present && a.lastPresent === today);
  
    function promptUnmark(attendee) {
      selectedAttendee = attendee;
      password = '';
    }

    function checkPassword() {
      if (password === '1234') {
        dispatch('unmarkAttendance', selectedAttendee);
      } else {
        alert('Incorrect password');
      }
      password = '';
      selectedAttendee = null;
    }

    function closeModal() {
      selectedAttendee = null;
      password = '';
    }
</script>

<div class="container mx-auto p-4">
  <h2 class="text-2xl font-bold mb-4">Today's Attendance</h2>
  <h3 class="text-xl mb-2">Present Today ({today}): {presentToday.length}</h3>
  <ul class="mb-4">
    {#each presentToday as attendee}
      <li class="flex items-center justify-between bg-zinc-950 p-2 mb-2 rounded">
        <span>{attendee.nickname}</span>
        <button class="bg-red-500 text-white px-2 py-1 rounded-sm" on:click={() => promptUnmark(attendee)}>x</button>
      </li>
    {/each}
  </ul>

  {#if selectedAttendee}
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 class="text-lg font-medium mb-2">Enter Password to Unmark Attendance</h3>
        <input type="password" bind:value={password} placeholder="Enter password" class="w-full p-2 mb-4 border rounded">
        <button on:click={checkPassword} class="bg-blue-500 text-white px-4 py-2 rounded mr-2">Submit</button>
        <button on:click={closeModal} class="bg-gray-300 px-4 py-2 rounded">Cancel</button>
      </div>
    </div>
  {/if}
</div>