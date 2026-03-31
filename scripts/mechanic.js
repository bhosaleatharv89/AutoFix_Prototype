
  let completedJobs = 5;
  let totalEarnings = 2500;
  let pendingCount = 3;

  const customerData = {
    1: { name: 'Arjun Mehta', issue: 'Battery Issue', location: 'Kothrud, Pune', time: '10:30 AM' },
    2: { name: 'Sneha Patil',  issue: 'Puncture Repair', location: 'Wakad, Pune', time: '11:00 AM' },
    3: { name: 'Kiran Sharma', issue: 'Oil Change', location: 'Baner, Pune', time: '2:00 PM' }
  };

  const jobStatuses = {}; // id -> step index (0=Accepted,1=OnWay,2=Working,3=Done)

  function toggleStatus(cb) {
    const lbl = document.getElementById('statusLabel');
    const banner = document.getElementById('offlineBanner');
    if (cb.checked) { lbl.textContent = '🟢 Online'; banner.classList.add('hidden'); }
    else { lbl.textContent = '🔴 Offline'; banner.classList.remove('hidden'); }
  }

  function acceptRequest(id) {
    const el = document.getElementById('req-' + id);
    el.style.transition = 'opacity 0.3s, transform 0.3s';
    el.style.opacity = '0'; el.style.transform = 'translateX(-20px)';
    setTimeout(() => {
      el.remove();
      pendingCount--;
      document.getElementById('reqCount').textContent = pendingCount;
      if (pendingCount === 0) document.getElementById('noRequests').classList.remove('hidden');
      addAcceptedJob(id);
    }, 300);
  }

  function rejectRequest(id) {
    const el = document.getElementById('req-' + id);
    el.style.transition = 'opacity 0.3s, transform 0.3s';
    el.style.opacity = '0'; el.style.transform = 'translateX(20px)';
    setTimeout(() => {
      el.remove();
      pendingCount--;
      document.getElementById('reqCount').textContent = pendingCount;
      if (pendingCount === 0) document.getElementById('noRequests').classList.remove('hidden');
    }, 300);
  }

  function addAcceptedJob(id) {
    document.getElementById('noAccepted').remove?.() || document.getElementById('noAccepted')?.classList.add('hidden');
    const d = customerData[id];
    jobStatuses[id] = 0;
    const div = document.createElement('div');
    div.className = 'card p-5 fade-in';
    div.id = 'job-' + id;
    div.innerHTML = `
      <div class="flex flex-wrap justify-between gap-3 mb-3">
        <div>
          <div class="flex items-center gap-2 mb-0.5">
            <span class="font-bold text-base heading">${d.name}</span>
            <span class="badge badge-accepted" id="badge-${id}">Accepted</span>
          </div>
          <p class="text-sm text-muted">📍 ${d.location} · 🕐 ${d.time}</p>
        </div>
        <div class="text-right">
          <p class="text-xs text-muted">Service</p>
          <p class="font-semibold text-green-700">${d.issue}</p>
        </div>
      </div>
      <div class="job-steps mb-4" id="steps-${id}">
        <span class="job-step current">✓ Accepted</span>
        <span class="job-step">🚗 On the Way</span>
        <span class="job-step">🔧 Working</span>
        <span class="job-step">🏁 Completed</span>
      </div>
      <div class="flex gap-2 flex-wrap">
        <button class="btn-status" onclick="updateJobStatus(${id}, 1)">🚗 On the Way</button>
        <button class="btn-status" onclick="updateJobStatus(${id}, 2)">🔧 Start Work</button>
        <button class="btn-status" onclick="updateJobStatus(${id}, 3)">🏁 Complete Job</button>
      </div>
    `;
    document.getElementById('acceptedList').appendChild(div);
  }

  function updateJobStatus(id, step) {
    jobStatuses[id] = step;
    const stepsEl = document.getElementById('steps-' + id);
    const spans = stepsEl.querySelectorAll('.job-step');
    spans.forEach((s, i) => {
      s.classList.remove('done', 'current');
      if (i < step) s.classList.add('done');
      else if (i === step) s.classList.add('current');
    });
    const badges = { 0: ['Accepted','badge-accepted'], 1: ['On the Way','badge-onway'], 2: ['Working','badge-onway'], 3: ['Completed','badge-done'] };
    const badge = document.getElementById('badge-' + id);
    badge.className = 'badge ' + badges[step][1];
    badge.textContent = badges[step][0];
    if (step === 3) {
      completedJobs++;
      document.getElementById('completedCount').textContent = completedJobs;
      document.getElementById('summaryJobs').textContent = completedJobs;
    }
  }

  function generateBill() {
    const raw = parseFloat(document.getElementById('costInput').value);
    if (!raw || raw <= 0) { alert('Please enter a valid cost.'); return; }
    const fee = Math.round(raw * 0.05);
    const total = raw + fee;
    document.getElementById('serviceCharge').textContent = '₹' + raw;
    document.getElementById('platformFee').textContent = '₹' + fee;
    document.getElementById('billTotal').textContent = '₹' + total;
    document.getElementById('billAmount').textContent = '₹' + total;
    document.getElementById('billResult').classList.remove('hidden');
    // Update earnings
    totalEarnings += raw;
    document.getElementById('earningsDisplay').textContent = '₹' + totalEarnings;
    document.getElementById('summaryEarnings').textContent = '₹' + totalEarnings.toLocaleString('en-IN');
  }
