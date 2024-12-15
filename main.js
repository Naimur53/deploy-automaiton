function autoPopulateEnv(envString) {
  // Parse the .env string into a key-value object
  const envObject = envString
    .split('\n')
    .filter(line => line.trim() && !line.startsWith("#")) // Ignore empty and commented lines
    .reduce((acc, line) => {
      const [key, value] = line.split('=');
      if (key && value) acc[key.trim()] = value.trim();
      return acc;
    }, {});

  const keys = Object.keys(envObject);
  const goButton = document.querySelector(".go_btn");

  if (!goButton) {
    console.error("Button with class '.go_btn' not found.");
    return;
  }

  // Click the .go_btn for each key
  keys.forEach(() => goButton.click());

  // Wait for the DOM to update after the button clicks
  setTimeout(() => {
    const nameInputs = document.querySelectorAll('input[name="var_name[]"]');
    const valueInputs = document.querySelectorAll('input[name="var_val[]"]');
    console.log(nameInputs)
    if (nameInputs.length !== valueInputs.length) {
      console.error("Mismatch in the number of var_name[] and var_val[] input fields.");
      return;
    }

    // Update the inputs based on the parsed .env object
    nameInputs.forEach((nameInput, index) => {
          const key = keys[index]; 
        console.log(key);
      if (envObject[key] !== undefined) {
        valueInputs[index].value = envObject[key]; // Set corresponding value
      } else {
        console.warn(`No matching value found for key: ${key}`);
      }
    });
      nameInputs.forEach((nameInput, index) => {
          const key = keys[index]; 
        console.log(key);
      if (envObject[key] !== undefined) {
        nameInputs[index].value = key; // Set corresponding value
      } else {
        console.warn(`No matching value found for key: ${key}`);
      }
    });
  }, 500); // Adjust timeout if needed based on the delay in DOM updates
}

// Example usage:
autoPopulateEnv(`
NEXT_PUBLIC_SERVER_URL= https://ts-module-creator.onrender.com

NEXT_PUBLIC_API_KEY=AIzaSyDHmANljleYS6rD7QvLeMO3YyYg5Iz-VSg
NEXT_PUBLIC_AUTH_DOMAIN=temgen-77e82.firebaseapp.com
NEXT_PUBLIC_PROJECT_ID=temgen-77e82
NEXT_PUBLIC_STORAGE_BUCKET=temgen-77e82.appspot.com
NEXT_PUBLIC_MESSAGE_ID=292679485110
NEXT_PUBLIC_APP_ID=1:292679485110:web:6a938a5750428d35744817
NEXT_PUBLIC_MEASUREMENT_ID=G-N5M0R2WN70
`);
