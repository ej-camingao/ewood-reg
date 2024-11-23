<script>
    import { onMount } from 'svelte';
  
    let isFirstTime = true; // New state to track if user is first-time attendee
    
    // First-time attendee fields
    let name = '';
    let age = '';
    let birthday = '';
    let gender = '';
    let contactNumber = '';
    let facebookName = '';
    
    // Returning attendee fields
    let returningName = '';
    let dgroupLeader = '';
  
    async function handleSubmit() {
      const formData = isFirstTime ? {
        isFirstTime,
        name,
        age,
        birthday,
        gender,
        contactNumber,
        facebookName
      } : {
        isFirstTime,
        name: returningName,
        dgroupLeader
      };

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert('Signup successful!');
        // Reset all fields
        if (isFirstTime) {
          name = age = birthday = gender = contactNumber = facebookName = '';
        } else {
          returningName = dgroupLeader = '';
        }
      } else {
        alert('Signup failed. Please try again.');
      }
    }
</script>
  
<div class="flex flex-col md:flex-row min-h-screen">
    <!-- Video container -->
    <div class="w-full md:w-3/4 bg-black h-screen md:h-screen">
      <video 
        id="backgroundVideo" 
        class="w-full h-full object-cover"
        loop 
        muted 
        autoplay 
        playsinline
      >
        <source src="/Youth Month 2024 Video_low.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  
    <!-- Form container with flex column to push logos to bottom -->
    <div class="w-full md:w-1/4 bg-gray-100 min-h-screen md:h-screen flex flex-col">
      <!-- Form content wrapped in a div that can scroll -->
      <div class="flex-grow p-6 overflow-y-auto">
        <h1 class="text-2xl font-bold mb-6 text-center">Signup Form</h1>
        
        <!-- Attendance Type Selection -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Is this your first time attending?
          </label>
          <div class="flex space-x-4">
            <label class="inline-flex items-center">
              <input 
                type="radio" 
                bind:group={isFirstTime} 
                value={true}
                class="form-radio text-green-600"
              >
              <span class="ml-2">Yes</span>
            </label>
            <label class="inline-flex items-center">
              <input 
                type="radio" 
                bind:group={isFirstTime} 
                value={false}
                class="form-radio text-green-600"
              >
              <span class="ml-2">No</span>
            </label>
          </div>
        </div>

        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
          {#if isFirstTime}
            <!-- First-time attendee form -->
            <div class="flex flex-col">
              <label class="text-sm font-medium text-gray-700">
                Name:
                <input 
                  type="text" 
                  bind:value={name} 
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                >
              </label>
            </div>
  
            <div class="flex flex-col">
              <label class="text-sm font-medium text-gray-700">
                Age:
                <input 
                  type="number" 
                  bind:value={age} 
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                >
              </label>
            </div>
  
            <div class="flex flex-col">
              <label class="text-sm font-medium text-gray-700">
                Birthday:
                <input 
                  type="date" 
                  bind:value={birthday} 
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                >
              </label>
            </div>
  
            <div class="flex flex-col">
              <label class="text-sm font-medium text-gray-700">
                Gender:
                <select 
                  bind:value={gender} 
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </label>
            </div>
  
            <div class="flex flex-col">
              <label class="text-sm font-medium text-gray-700">
                Contact Number:
                <input 
                  type="tel" 
                  bind:value={contactNumber} 
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                >
              </label>
            </div>
  
            <div class="flex flex-col">
              <label class="text-sm font-medium text-gray-700">
                Facebook Name:
                <input 
                  type="text" 
                  bind:value={facebookName} 
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                >
              </label>
            </div>
          {:else}
            <!-- Returning attendee form -->
            <div class="flex flex-col">
              <label class="text-sm font-medium text-gray-700">
                Name:
                <input 
                  type="text" 
                  bind:value={returningName} 
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                >
              </label>
            </div>

            <div class="flex flex-col">
              <label class="text-sm font-medium text-gray-700">
                DGroup Leader:
                <input 
                  type="text" 
                  bind:value={dgroupLeader}
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                >
              </label>
            </div>
          {/if}
  
          <button 
            type="submit"
            class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
          >
            Submit
          </button>
        </form>
      </div>
  
      <!-- Logo section -->
      <div class="p-4 border-t border-gray-200 bg-white">
        <div class="flex justify-center items-center space-x-8">
          <!-- <img 
            src="/nextgen.png" 
            alt="Organization 1 Logo"
            class="h-12 w-auto object-contain"
          /> -->
          <img 
            src="/elevate.png" 
            alt="Organization 2 Logo"
            class="h-12 w-auto object-contain"
          />
        </div>
      </div>
    </div>
</div>