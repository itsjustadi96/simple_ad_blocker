document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleButton');
  
    // Load the current state from storage and update the button text
    chrome.storage.local.get('adBlockerEnabled', function(result) {
      if (result.adBlockerEnabled === false) {
        toggleButton.textContent = 'Enable Ad Blocker';
        toggleButton.classList.add('disabled');
      }
    });
  
    toggleButton.addEventListener('click', function() {
      chrome.storage.local.get('adBlockerEnabled', function(result) {
        let isEnabled = result.adBlockerEnabled !== false;
        let newState = !isEnabled;
  
        // Update the storage with the new state
        chrome.storage.local.set({ adBlockerEnabled: newState }, function() {
          // Update the button text
          toggleButton.textContent = newState ? 'Disable Ad Blocker' : 'Enable Ad Blocker';
          toggleButton.classList.toggle('disabled', !newState);
  
          // Update the ruleset based on the new state
          chrome.declarativeNetRequest.updateEnabledRulesets({
            disableRulesetIds: newState ? [] : ['ruleset_1'],
            enableRulesetIds: newState ? ['ruleset_1'] : []
          });
        });
      });
    });
  });