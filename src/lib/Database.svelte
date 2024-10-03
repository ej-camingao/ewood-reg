<script>
    import { createEventDispatcher } from 'svelte';
  
    export let attendees = [];
    
    const dispatch = createEventDispatcher();
    
    let showDetailedView = false;
    let password = '';
    let selectedAttendee = null;
    let action = ''; // 'view', 'delete', or 'edit'
    let editingAttendee = null;
    
    $: sortedAttendees = [...attendees].sort((a, b) => a.name.localeCompare(b.name));
  
    function checkPassword() {
      if (password === '1234') {
        if (action === 'view' || action === 'edit') {
          showDetailedView = true;
          if (action === 'edit') {
            editingAttendee = { ...selectedAttendee };
          }
        } else if (action === 'delete') {
          dispatch('deleteAttendee', selectedAttendee);
          closeModal();
        }
      } else {
        alert('Incorrect password');
      }
      password = '';
    }
  
    function promptAction(attendee, actionType) {
      selectedAttendee = attendee;
      action = actionType;
      password = '';
      showDetailedView = false;
    }

      function saveEditedAttendee() {
      dispatch('updateAttendee', editingAttendee);
      closeModal();
}


    function closeModal() {
      showDetailedView = false;
      editingAttendee = null;
      selectedAttendee = null;
      action = '';
      password = '';
    }

    function downloadAttendance(format) {
      let content;
      let filename;
      if (format === 'json') {
        content = JSON.stringify(attendees, null, 2);
        filename = 'attendance.json';
      } else if (format === 'csv') {
        const headers = ['name', 'nickname','age', 'birthday', 'contact', 'socials', 'lastPresent', 'present'];
        const csvContent = [
          headers.join(','),
          ...attendees.map(a => headers.map(h => a[h] || '').join(','))
        ].join('\n');
        content = csvContent;
        filename = 'attendance.csv';
      }
      
      const blob = new Blob([content], { type: format === 'json' ? 'application/json' : 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
</script>

<div class="container mx-auto p-4">
  <h2 class="text-2xl font-bold mb-4">Attendee Database</h2>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white">
      <thead>
        <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th class="py-3 px-6 text-left">Name</th>
          <th class="py-3 px-6 text-left">Age</th>
          <th class="py-3 px-6 text-left">Last Present</th>
          <th class="py-3 px-6 text-center">Actions</th>
        </tr>
      </thead>
      <tbody class="text-gray-600 text-sm font-light">
        {#each sortedAttendees as attendee (attendee)}
          <tr class="border-b border-gray-200 hover:bg-gray-100">
            <td class="py-3 px-6 text-left whitespace-nowrap">{attendee.name}</td>
            <td class="py-3 px-6 text-left">{attendee.age}</td>
            <td class="py-3 px-6 text-left">{attendee.lastPresent || 'Never'}</td>
            <td class="py-3 px-6 text-center">
              <button class="bg-blue-500 text-white px-2 py-1 rounded mr-1" on:click={() => promptAction(attendee, 'view')}>View</button>
              <button class="bg-yellow-500 text-white px-2 py-1 rounded mr-1" on:click={() => promptAction(attendee, 'edit')}>Edit</button>
              <button class="bg-red-500 text-white px-2 py-1 rounded" on:click={() => promptAction(attendee, 'delete')}>Delete</button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="mt-4">
    <button class="bg-green-500 text-white px-4 py-2 rounded mr-2" on:click={() => downloadAttendance('json')}>Download JSON</button>
    <button class="bg-green-500 text-white px-4 py-2 rounded" on:click={() => downloadAttendance('csv')}>Download CSV</button>
  </div>

  {#if selectedAttendee && !showDetailedView}
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 class="text-lg font-medium mb-2">Enter Password to {action.charAt(0).toUpperCase() + action.slice(1)}</h3>
        <input type="password" bind:value={password} placeholder="Enter password" class="w-full p-2 mb-4 border rounded">
        <button on:click={checkPassword} class="bg-blue-500 text-white px-4 py-2 rounded mr-2">Submit</button>
        <button on:click={closeModal} class="bg-gray-300 px-4 py-2 rounded">Cancel</button>
      </div>
    </div>
  {/if}

  {#if showDetailedView && selectedAttendee}
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 class="text-lg font-medium mb-4">{action === 'edit' ? 'Edit' : 'Detailed View'}: {selectedAttendee.name}</h3>
        {#if action === 'edit'}
          <div class="mb-4">
            <label class="block mb-2">Name: <input type="text" bind:value={editingAttendee.name} class="w-full p-2 border rounded"></label>
            <label class="block mb-2">Nickname: <input type="text" bind:value={editingAttendee.nickname} class="w-full p-2 border rounded"></label>
            <label class="block mb-2">Gender: <input type="text" bind:value={editingAttendee.gender} class="w-full p-2 border rounded"></label>
            <label class="block mb-2">Age: <input type="number" bind:value={editingAttendee.age} class="w-full p-2 border rounded"></label>
            <label class="block mb-2">Birthday: <input type="date" bind:value={editingAttendee.birthday} class="w-full p-2 border rounded"></label>
            <label class="block mb-2">Contact: <input type="text" bind:value={editingAttendee.contact} class="w-full p-2 border rounded"></label>
            <label class="block mb-2">Socials: <input type="text" bind:value={editingAttendee.socials} class="w-full p-2 border rounded"></label>
          </div>
          <button on:click={saveEditedAttendee} class="bg-green-500 text-white px-4 py-2 rounded">Save Changes</button>
        {:else}
          <p class="mb-2"><strong>Nickname:</strong> {selectedAttendee.nickname}</p>
          <p class="mb-2"><strong>Age:</strong> {selectedAttendee.age}</p>
          <p class="mb-2"><strong>Gender:</strong> {selectedAttendee.gender}</p>
          <p class="mb-2"><strong>Birthday:</strong> {selectedAttendee.birthday}</p>
          <p class="mb-2"><strong>Contact:</strong> {selectedAttendee.contact}</p>
          <p class="mb-2"><strong>Socials:</strong> {selectedAttendee.socials}</p>
          <p class="mb-2"><strong>Last Present:</strong> {selectedAttendee.lastPresent || 'Never'}</p>
        {/if}
        <button on:click={closeModal} class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">✖</button>
      </div>
    </div>
  {/if}
</div>