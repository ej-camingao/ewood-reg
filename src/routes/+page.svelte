<script>
    import { onMount } from 'svelte';
  
    let name = '';
    let age = '';
    let birthday = '';
    let gender = '';
    let contactNumber = '';
    let facebookName = '';
  
    async function handleSubmit() {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          age,
          birthday,
          gender,
          contactNumber,
          facebookName,
        }),
      });
  
      if (response.ok) {
        alert('Signup successful!');
        name = age = birthday = gender = contactNumber = facebookName = '';
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
        
        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
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
          <!-- Replace src with your actual logo paths -->
          <img 
            src="/nextgen.png" 
            alt="Organization 1 Logo"
            class="h-12 w-auto object-contain"
          />
          <img 
            src="/elevate.png" 
            alt="Organization 2 Logo"
            class="h-12 w-auto object-contain"
          />
        </div>
      </div>
    </div>
  </div>