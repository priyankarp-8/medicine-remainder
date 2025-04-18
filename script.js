let reminders = [];
let schedule = [
    { name: "Paracetamol", time: "8:00 PM" },
    { name: "Vitamin D", time: "9:00 PM" },
    { name: "Vitamin E", time: "7:30 PM" }
];

// Function to set reminder
function setReminder() {
    const name = document.getElementById("medName").value;
    const dose = document.getElementById("dosage").value;
    const time = document.getElementById("reminderTime").value;
    const message = document.getElementById("message");

    if (!name || !dose || !time) {
        message.textContent = "Please fill in all fields.";
        message.style.color = "red";
        return;
    }

    // Save reminder
    reminders.push({
        name,
        dose,
        time,
        triggered: false
    });

    updateReminderList();

    message.textContent = `Reminder set for ${name} at ${time}`;
    message.style.color = "green";

    // Clear form
    document.getElementById("medName").value = "";
    document.getElementById("dosage").value = "";
    document.getElementById("reminderTime").value = "";
}

// Function to update the reminder list on the page
function updateReminderList() {
    const list = document.getElementById("reminderList");
    list.innerHTML = "";
    reminders.forEach((r, i) => {
        const item = document.createElement("li");
        item.textContent = `${i + 1}. ${r.name} (${r.dose}) at ${r.time}`;
        list.appendChild(item);
    });
}

// Function to display the schedule
function displaySchedule() {
    const list = document.getElementById("scheduleList");
    list.innerHTML = "";
    schedule.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} - ${item.time}`;
        list.appendChild(listItem);
    });
}

// Toggle between reminder and schedule view
function toggleSchedule() {
    document.getElementById("reminderSection").style.display = "none";
    document.getElementById("scheduleSection").style.display = "block";
    displaySchedule();
}

function toggleReminder() {
    document.getElementById("reminderSection").style.display = "block";
    document.getElementById("scheduleSection").style.display = "none";
}

// Check reminders every second and trigger alarm if necessary
setInterval(() => {
    const now = new Date();
    const currentTime = now.toTimeString().substring(0, 5); // "HH:MM"

    reminders.forEach(reminder => {
        if (reminder.time === currentTime && !reminder.triggered) {
            document.getElementById("alarm").play();
            alert(`💊 Time to take: ${reminder.name} - ${reminder.dose}`);
            reminder.triggered = true;
        }
    });
}, 1000);
