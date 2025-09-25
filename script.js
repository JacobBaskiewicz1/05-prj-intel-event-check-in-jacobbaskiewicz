const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelection = document.getElementById("teamSelect");

// Load counts from localStorage or set to 0
let count = parseInt(localStorage.getItem("attendanceCount")) || 0;
const maxCount = 50;

let teamCounts = {
  water: parseInt(localStorage.getItem("waterCount")) || 0,
  zero: parseInt(localStorage.getItem("zeroCount")) || 0,
  power: parseInt(localStorage.getItem("powerCount")) || 0,
};

// On page load, update UI with saved counts
window.addEventListener("DOMContentLoaded", function () {
  document.getElementById("attendeeCount").textContent = count;
  document.getElementById("waterCount").textContent = teamCounts.water;
  document.getElementById("zeroCount").textContent = teamCounts.zero;
  document.getElementById("powerCount").textContent = teamCounts.power;
  // Update progress bar
  const progressBar = document.getElementById("progressBar");
  const percentage = Math.round((count / maxCount) * 100);
  progressBar.style.width = `${percentage}%`;
});

// Store attendees
const attendees = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = nameInput.value;
  const team = teamSelection.value;
  const teamName = teamSelection.selectedOptions[0].text;

  count++;
  teamCounts[team]++;

  // Update team count
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = teamCounts[team];

  // Update attendee count
  const attendeeCount = document.getElementById("attendeeCount");
  attendeeCount.textContent = count;

  // Save counts to localStorage
  localStorage.setItem("attendanceCount", count);
  localStorage.setItem("waterCount", teamCounts.water);
  localStorage.setItem("zeroCount", teamCounts.zero);
  localStorage.setItem("powerCount", teamCounts.power);

  // Update progress bar
  const progressBar = document.getElementById("progressBar");
  const percentage = Math.round((count / maxCount) * 100);
  progressBar.style.width = `${percentage}%`;

  // Show greeting message
  const greeting = document.getElementById("greeting");
  greeting.textContent = `Welcome, ${name} from ${teamName}!`;
  greeting.style.display = "block";

  // Add attendee to list
  attendees.push({ name: name, team: team });
  updateAttendeeList();

  // Celebration feature
  if (count === maxCount) {
    // Get team counts
    const water = parseInt(document.getElementById("waterCount").textContent);
    const zero = parseInt(document.getElementById("zeroCount").textContent);
    const power = parseInt(document.getElementById("powerCount").textContent);
    let winningTeam = "";
    let winningTeamDisplay = "";
    if (water >= zero && water >= power) {
      winningTeam = "Team Water Wise";
      winningTeamDisplay = "🌊 Team Water Wise";
    } else if (zero >= water && zero >= power) {
      winningTeam = "Team Net Zero";
      winningTeamDisplay = "🌿 Team Net Zero";
    } else {
      winningTeam = "Team Renewables";
      winningTeamDisplay = "⚡ Team Renewables";
    }
    greeting.innerHTML = `🎉 <b>Goal reached!</b> <br> Congratulations, <span class=\"success-message\">${winningTeamDisplay}</span> has the most check-ins! 🎉`;
    greeting.style.display = "block";
  }

  form.reset();
});

// Update attendee list display
function updateAttendeeList() {
  const attendeeList = document.getElementById("attendeeList");
  attendeeList.innerHTML = "";
  for (let i = 0; i < attendees.length; i++) {
    const attendee = attendees[i];
    let teamLabel = "";
    if (attendee.team === "water") {
      teamLabel = '<span class="attendee-team water">🌊 Water Wise</span>';
    } else if (attendee.team === "zero") {
      teamLabel = '<span class="attendee-team zero">🌿 Net Zero</span>';
    } else if (attendee.team === "power") {
      teamLabel = '<span class="attendee-team power">⚡ Renewables</span>';
    }
    attendeeList.innerHTML += `<li><span>${attendee.name}</span> ${teamLabel}</li>`;
  }
}
