
document.addEventListener('DOMContentLoaded', () => {

  const stateButtons = document.querySelectorAll('.pill');
  const noteBtn = document.querySelector('.add-note .btn.primary.full');
  const noteArea = document.querySelector('.add-note textarea');
  const activityFeed = document.querySelector('.activity');
  const updateBtn = document.querySelector('.actions .btn.primary');

  const ticketId = "INC0005";
  const currentUser = "John";

  // Load activity from localStorage
  let activityLog = JSON.parse(localStorage.getItem(`activity_${ticketId}`)) || [];

  function addActivityEntry(user, message, isSystem = false) {
    const activity = {
      user,
      message,
      isSystem,
      time: new Date().toLocaleString()
    };

    activityLog.push(activity);
    localStorage.setItem(`activity_${ticketId}`, JSON.stringify(activityLog));
    renderActivityFeed();
  }

  function renderActivityFeed() {
    activityFeed.innerHTML = "";

    activityLog.forEach(item => {
      const entry = document.createElement('div');
      entry.className = item.isSystem ? 'entry system' : 'entry';

      entry.innerHTML = `
        <i class="fa-solid ${item.isSystem ? 'fa-gear' : 'fa-user'} avatar"></i>
        <div>
          <strong>${item.user}</strong>
          <span>${item.time}</span>
          <p>${item.message}</p>
        </div>
      `;

      activityFeed.prepend(entry);
    });
  }

  /* STATE CHANGE LOGGING */
  stateButtons.forEach(button => {
    button.addEventListener('click', () => {
      const currentActive = document.querySelector('.pill.active');
      const oldState = currentActive?.innerText.trim();
      const newState = button.innerText.trim();

      if (oldState !== newState) {
        stateButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        addActivityEntry("System", `State changed from ${oldState} to ${newState}`, true);
      }
    });
  });

  /* ADD NOTE */
  noteBtn.addEventListener('click', () => {
    const noteText = noteArea.value.trim();
    if (!noteText) return;

    addActivityEntry(currentUser, noteText);
    noteArea.value = "";
  });

  /* FIELD CHANGE TRACKING */
  document.querySelectorAll('.field input, .field select, .field textarea')
    .forEach(field => {

      let previousValue = field.value;

      field.addEventListener('change', () => {
        const newValue = field.value;
        if (previousValue !== newValue) {

          const label = field.closest('.field')
            ?.querySelector('label')?.innerText || "Field";

          addActivityEntry(
            "System",
            `${label} changed from "${previousValue}" to "${newValue}"`,
            true
          );

          previousValue = newValue;
        }
      });
    });

  /* UPDATE BUTTON */
  updateBtn.addEventListener('click', () => {
    addActivityEntry("System", "Incident details were updated.", true);
    alert("Ticket updated successfully.");
  });

  renderActivityFeed();
});

