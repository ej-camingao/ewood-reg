<script>
    import { createEventDispatcher } from 'svelte';
  
    export let attendees = [];
    let searchName = '';
    let filteredAttendees = [];
  
    const dispatch = createEventDispatcher();
  
    $: {
      if (searchName) {
        filteredAttendees = attendees.filter(a => 
          a.name.toLowerCase().includes(searchName.toLowerCase())
        );
      } else {
        filteredAttendees = [];
      }
    }
  
    function markPresent(attendee) {
      dispatch('markPresent', attendee);
      searchName = '';
      filteredAttendees = [];
    }
  </script>
  
  <div>
    <h2 class="mb-2 font-bold">Register Attendance</h2>
    <input class="rounded-lg text-2xl" bind:value={searchName} placeholder="Enter your name" />
    {#if filteredAttendees.length > 0}
      <ul>
        {#each filteredAttendees as attendee}
          <li>
            {attendee.name}
            {#if !attendee.present}
              <button on:click={() => markPresent(attendee)}>Mark Present</button>
            {:else}
              (Already marked present)
            {/if}
          </li>
        {/each}
      </ul>
    {:else if searchName}
      <p>No matching attendees found. If you're new, please use the "New Attendee" form.</p>
    {/if}
  </div>
  
  <style>
    input {
      width: 100%;
      padding: 8px;
      margin-bottom: 10px;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      margin: 10px 0;
      padding: 5px;
      border: 1px solid #ddd;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    button {
      padding: 5px 10px;
    }
  </style>