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

function startTracking() {
    currentStep = 0;
    renderSteps();
    const ts = document.getElementById('trackSection');
    ts.classList.remove('hidden');
    ts.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
function renderSteps() {
    const row = document.getElementById('stepRow');
    row.innerHTML = '';
    
    // Evaluate if the workflow has reached the final stage
    const isJobComplete = currentStep === steps.length - 1;

    steps.forEach((label, i) => {
      const stepContainer = document.createElement('div');
      stepContainer.className = 'flex flex-col items-center w-24';
      
      // The step is done if it's a previous step, OR if it's the final step and the job is complete
      const isDone = i < currentStep || (isJobComplete && i === currentStep);
      const isActive = i === currentStep && !isJobComplete;
      
      stepContainer.innerHTML = `
        <div class="step-dot ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}">${isDone ? '✓' : stepIcons[i]}</div>
        <span class="text-xs mt-2 font-medium text-center ${isDone || isActive ? 'text-blue-600' : 'text-gray-400'}">${label}</span>
      `;
      row.appendChild(stepContainer);
      
      if (i < steps.length - 1) {
        const line = document.createElement('div');
        line.className = `step-line flex-1 h-0.5 mb-6 transition-colors duration-300 ${isDone ? 'bg-blue-600 done' : 'bg-gray-200'}`;
        row.appendChild(line);
      }
    });

    document.getElementById('stepMsg').textContent = stepMsgs[currentStep];
    
    // Target the button's parent container to swap elements
    const actionContainer = document.querySelector('#trackSection .mt-6.flex.justify-center');
    
    if (!isJobComplete) {
      actionContainer.innerHTML = '<button class="btn-primary px-6 py-2 text-sm" onclick="advanceStep()">Simulate Next Status →</button>';
    } else {
      actionContainer.innerHTML = '<span class="text-sm font-medium text-blue-600">Thank you for using our service</span>';
    }
  }
  function advanceStep() {
    if (currentStep < steps.length - 1) { 
      currentStep++; 
      renderSteps(); 
    }
  }
