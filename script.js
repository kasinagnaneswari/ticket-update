
  const addNoteBtn = document.getElementById("addNoteBtn");
  const noteText = document.getElementById("noteText");
  const activity = document.querySelector(".activity");

  const currentUser = "Sarah Wilson"; // mock logged-in user

  function timeAgo() {
    return "Just now";
  }

  addNoteBtn.addEventListener("click", () => {
    const text = noteText.value.trim();
    if (!text) return;

    const entry = document.createElement("div");
    entry.className = "entry";

    entry.innerHTML = `
      <i class="fa-solid fa-user avatar"></i>
      <div>
        <strong>${currentUser}</strong>
        <span>${timeAgo()}</span>
        <p>${text}</p>
      </div>
    `;

    activity.prepend(entry); // newest on top
    noteText.value = "";
  });

  const updateBtn = document.getElementById("updateTicketBtn");

  updateBtn.addEventListener("click", () => {
    const entry = document.createElement("div");
    entry.className = "entry system";

    entry.innerHTML = `
      <i class="fa-solid fa-gear avatar"></i>
      <div>
        <strong>System</strong>
        <span>Just now</span>
        <p>Incident details were updated.</p>
      </div>
    `;

    activity.prepend(entry);
  });