  // ----- State -----
  let selectedMech = '';
  let selectedSlot = '';
  let currentStep = 0;
  const steps = ['Requested', 'Accepted', 'On the Way', 'Completed'];
  const stepIcons = ['📋', '✔️', '🚗', '🏁'];
  const stepMsgs = [
    'Your booking request has been sent to the mechanic.',
    'Great news! Your mechanic has accepted the job.',
    'Your mechanic is on the way to your location.',
    'Job completed! Please rate your experience.'
  ];

  // Set min date to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('bookDate').min = today;
  document.getElementById('bookDate').value = today;

  function filterMechanics() {
    const val = document.getElementById('serviceSelect').value;
    document.querySelectorAll('#mechanicList > div').forEach(card => {
      if (!val || card.dataset.services.includes(val)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  function selectMechanic(name, id) {
    selectedMech = name;
    document.getElementById('selectedMechName').textContent = name;
    const sec = document.getElementById('bookingSection');
    sec.classList.remove('hidden');
    sec.scrollIntoView({ behavior: 'smooth', block: 'center' });
    document.querySelectorAll('#mechanicList .card').forEach(c => c.classList.remove('selected'));
    document.getElementById('mech-' + id).classList.add('selected');
  }

  function selectSlot(btn, slot) {
    selectedSlot = slot;
    document.querySelectorAll('.btn-slot').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  function confirmBooking() {
    const date = document.getElementById('bookDate').value;
    if (!selectedSlot) { alert('Please choose a time slot.'); return; }
    if (!date) { alert('Please select a date.'); return; }
    const id = 'AF-' + Math.floor(10000 + Math.random() * 90000);
    document.getElementById('confirmId').textContent = id;
    document.getElementById('confirmMech').textContent = selectedMech;
    document.getElementById('confirmTime').textContent = date + ' · ' + selectedSlot;
    document.getElementById('bookingSection').classList.add('hidden');
    const cs = document.getElementById('confirmSection');
    cs.classList.remove('hidden');
    cs.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function cancelBooking() {
    document.getElementById('bookingSection').classList.add('hidden');
    document.querySelectorAll('#mechanicList .card').forEach(c => c.classList.remove('selected'));
    selectedMech = ''; selectedSlot = '';
  }

