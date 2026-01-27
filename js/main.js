document.addEventListener('DOMContentLoaded', function() {
  // City suggestions
  const cities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad",
    "Chennai", "Kolkata", "Surat", "Pune", "Jaipur",
    "Lucknow", "Kanpur", "Nagpur", "Visakhapatnam", "Indore",
    "Thane", "Bhopal", "Patna", "Vadodara", "Ghaziabad"
  ];
  
  // Initialize city suggestions
  initCitySuggestions('from-city', cities);
  initCitySuggestions('to-city', cities);
  
  // Date options
  setupDateOptions();
  
  // Swap button functionality
  document.querySelector('.swap-btn').addEventListener('click', function() {
    const fromInput = document.getElementById('from-city');
    const toInput = document.getElementById('to-city');
    const temp = fromInput.value;
    fromInput.value = toInput.value;
    toInput.value = temp;
  });
  
  // Tab switching
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // Filter buttons
  const filters = document.querySelectorAll('.filter-btn');
  filters.forEach(filter => {
    filter.addEventListener('click', function() {
      filters.forEach(f => f.classList.remove('active'));
      this.classList.add('active');
      // In a real app, you would filter bus cards here
    });
  });
  
  // View seats buttons
  document.querySelectorAll('.view-seats-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      // In a real app, this would show seat selection modal
      alert('Seat selection would open here in a complete implementation');
    });
  });
  
  // Initialize offers slider scrolling
  initOffersSlider();
});

function initCitySuggestions(inputId, cities) {
  const input = document.getElementById(inputId);
  const suggestions = input.nextElementSibling;
  
  input.addEventListener('input', function() {
    const value = this.value.toLowerCase();
    suggestions.innerHTML = '';
    
    if (value.length < 2) {
      suggestions.style.display = 'none';
      return;
    }
    
    const matches = cities.filter(city => 
      city.toLowerCase().includes(value)
    );
    
    if (matches.length > 0) {
      matches.forEach(city => {
        const div = document.createElement('div');
        div.textContent = city;
        div.addEventListener('click', function() {
          input.value = city;
          suggestions.style.display = 'none';
        });
        suggestions.appendChild(div);
      });
      suggestions.style.display = 'block';
    } else {
      suggestions.style.display = 'none';
    }
  });
  
  // Hide suggestions when clicking outside
  document.addEventListener('click', function(e) {
    if (e.target !== input) {
      suggestions.style.display = 'none';
    }
  });
}

function setupDateOptions() {
  const dateInput = document.getElementById('travel-date');
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  
  // Set default date to today
  dateInput.valueAsDate = today;
  
  // Format date for input (YYYY-MM-DD)
  function formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    
    return [year, month, day].join('-');
  }
  
  // Date option click handlers
  document.querySelectorAll('.date-option').forEach(option => {
    option.addEventListener('click', function() {
      const days = parseInt(this.dataset.days);
      const date = new Date();
      date.setDate(date.getDate() + days);
      dateInput.valueAsDate = date;
      
      // Highlight selected option
      document.querySelectorAll('.date-option').forEach(opt => {
        opt.classList.remove('active');
      });
      this.classList.add('active');
    });
  });
  
  // Highlight today's option by default
  document.querySelector('.date-option[data-days="0"]').classList.add('active');
}

function initOffersSlider() {
  const slider = document.querySelector('.offers-slider');
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.style.cursor = 'grabbing';
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.style.cursor = 'grab';
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.style.cursor = 'grab';
  });

  slider.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });
}

// In a complete implementation, you would also add:
// - Form validation
// - API calls for real data
// - Seat selection functionality
// - Payment integration
// - User authentication flows








// Main search function
function searchBuses(event) {
  event.preventDefault();
  
  // Get form values
  const fromCity = document.getElementById('from-city').value.trim();
  const toCity = document.getElementById('to-city').value.trim();
  const travelDate = document.getElementById('travel-date').value;
  
  // Validate inputs
  if (!fromCity || !toCity || !travelDate) {
    showAlert('Please fill in all fields', 'error');
    return;
  }
  
  if (fromCity.toLowerCase() === toCity.toLowerCase()) {
    showAlert('Departure and arrival cities cannot be the same', 'error');
    return;
  }
  
  // Show loading state
  toggleLoading(true);
  
  // In a real app, this would be an API call
  // For demo purposes, we'll use mock data after a short delay
  setTimeout(() => {
    const mockResults = generateMockResults(fromCity, toCity, travelDate);
    displayResults(mockResults);
    toggleLoading(false);
    
    // Scroll to results section
    document.querySelector('.bus-listing').scrollIntoView({ 
      behavior: 'smooth' 
    });
  }, 1500);
}

// Generate mock data for demonstration
function generateMockResults(fromCity, toCity, date) {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const operators = [
    "Sharma Travels", "Patel Tours", "Royal Express", 
    "GreenLine Buses", "City Travels", "Star Buses"
  ];
  
  const busTypes = [
    { type: "AC Sleeper (2+1)", amenities: ["ac", "charging", "water", "blanket"] },
    { type: "Non-AC Seater (2+2)", amenities: ["water"] },
    { type: "AC Seater (2+2)", amenities: ["ac", "charging"] },
    { type: "Volvo Multi-Axle", amenities: ["ac", "charging", "water", "blanket", "wifi"] }
  ];
  
  const results = [];
  const numResults = 4 + Math.floor(Math.random() * 3); // 4-6 results
  
  for (let i = 0; i < numResults; i++) {
    const departureHour = 6 + Math.floor(Math.random() * 12);
    const departureMin = Math.floor(Math.random() * 12) * 5;
    const durationHours = 4 + Math.floor(Math.random() * 8);
    const durationMins = Math.floor(Math.random() * 12) * 5;
    
    const arrivalHour = departureHour + durationHours;
    const arrivalMin = departureMin + durationMins;
    
    const busType = busTypes[Math.floor(Math.random() * busTypes.length)];
    
    results.push({
      id: `bus-${i+1}`,
      operator: operators[Math.floor(Math.random() * operators.length)],
      type: busType.type,
      departure: {
        time: `${departureHour.toString().padStart(2, '0')}:${departureMin.toString().padStart(2, '0')}`,
        city: fromCity
      },
      arrival: {
        time: `${arrivalHour.toString().padStart(2, '0')}:${arrivalMin.toString().padStart(2, '0')}`,
        city: toCity
      },
      duration: `${durationHours}h ${durationMins}m`,
      amenities: busType.amenities,
      price: 300 + Math.floor(Math.random() * 700),
      seats: 5 + Math.floor(Math.random() * 20),
      date: formattedDate
    });
  }
  
  // Sort by departure time
  return results.sort((a, b) => a.departure.time.localeCompare(b.departure.time));
}

// Display search results
function displayResults(results) {
  const resultsContainer = document.querySelector('.bus-cards');
  resultsContainer.innerHTML = '';
  
  if (results.length === 0) {
    resultsContainer.innerHTML = `
      <div class="no-results">
        <i class="fas fa-bus-slash"></i>
        <h3>No buses found for your search</h3>
        <p>Try different dates or nearby cities</p>
      </div>
    `;
    return;
  }
  
  results.forEach(bus => {
    const amenitiesHtml = bus.amenities.map(amenity => {
      const icons = {
        ac: '<i class="fas fa-snowflake" title="AC"></i>',
        charging: '<i class="fas fa-bolt" title="Charging Point"></i>',
        water: '<i class="fas fa-wine-bottle" title="Water Bottle"></i>',
        blanket: '<i class="fas fa-bed" title="Blanket"></i>',
        wifi: '<i class="fas fa-wifi" title="WiFi"></i>'
      };
      return `<span class="amenity">${icons[amenity]}</span>`;
    }).join('');
    
    const busCard = document.createElement('div');
    busCard.className = 'bus-card';
    busCard.innerHTML = `
      <div class="bus-header">
        <div class="bus-operator">${bus.operator}</div>
        <div class="bus-type">${bus.type}</div>
      </div>
      
      <div class="bus-details">
        <div class="timing">
          <div class="departure">
            <span class="time">${bus.departure.time}</span>
            <span class="location">${bus.departure.city}</span>
          </div>
          <div class="duration">
            <span>${bus.duration}</span>
            <div class="timeline"></div>
          </div>
          <div class="arrival">
            <span class="time">${bus.arrival.time}</span>
            <span class="location">${bus.arrival.city}</span>
          </div>
        </div>
        
        <div class="amenities">
          ${amenitiesHtml}
        </div>
      </div>
      
      <div class="bus-pricing">
        <div class="price">
          <span class="amount">₹${bus.price}</span>
          <span class="seats">${bus.seats} seats left</span>
          <span class="date">${bus.date}</span>
        </div>
        <button class="view-seats-btn" data-bus-id="${bus.id}">View Seats</button>
      </div>
    `;
    
    resultsContainer.appendChild(busCard);
  });
  
  // Add event listeners to new view seats buttons
  document.querySelectorAll('.view-seats-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const busId = this.getAttribute('data-bus-id');
      showSeatSelection(busId);
    });
  });
}

// Show seat selection modal
function showSeatSelection(busId) {
  // In a real app, this would fetch seat map from API
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>Select Your Seats</h3>
        <button class="close-modal">&times;</button>
      </div>
      <div class="modal-body">
        <div class="seat-map" id="seat-map-${busId}"></div>
        <div class="seat-legend">
          <div class="legend-item">
            <span class="seat-sample available"></span>
            <span>Available</span>
          </div>
          <div class="legend-item">
            <span class="seat-sample selected"></span>
            <span>Selected</span>
          </div>
          <div class="legend-item">
            <span class="seat-sample booked"></span>
            <span>Booked</span>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-continue">Continue to Payment</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  
  // Generate seats
  const seatMap = document.getElementById(`seat-map-${busId}`);
  generateSeats(seatMap);
  
  // Close modal handlers
  document.querySelector('.close-modal').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  // Continue button handler
  document.querySelector('.btn-continue').addEventListener('click', () => {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    if (selectedSeats.length === 0) {
      showAlert('Please select at least one seat', 'error');
      return;
    }
    
    const seats = Array.from(selectedSeats).map(seat => seat.textContent).join(', ');
    closeModal();
    showAlert(`Seats ${seats} selected! Redirecting to payment...`, 'success');
    
    // In real app, would redirect to payment page
    setTimeout(() => {
      window.location.href = 'payment.html';
    }, 2000);
  });
  
  function closeModal() {
    document.body.removeChild(modal);
    document.body.style.overflow = 'auto';
  }
}

// Generate seat map
function generateSeats(container) {
  container.innerHTML = '';
  
  // Create bus layout - 2x2 for demo
  const rows = 10;
  const cols = 4;
  
  for (let row = 1; row <= rows; row++) {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'seat-row';
    
    for (let col = 1; col <= cols; col++) {
      const seatNum = (row - 1) * cols + col;
      const seat = document.createElement('div');
      seat.className = 'seat';
      seat.textContent = seatNum;
      
      // Randomly mark some seats as booked (for demo)
      if (Math.random() < 0.3) {
        seat.classList.add('booked');
      } else {
        seat.addEventListener('click', function() {
          if (!this.classList.contains('booked')) {
            this.classList.toggle('selected');
          }
        });
      }
      
      // Mark driver side (left seats)
      if (col <= 2) {
        seat.classList.add('left-side');
      }
      
      rowDiv.appendChild(seat);
    }
    
    // Add row number
    const rowLabel = document.createElement('div');
    rowLabel.className = 'row-label';
    rowLabel.textContent = row;
    rowDiv.insertBefore(rowLabel, rowDiv.firstChild);
    
    container.appendChild(rowDiv);
  }
}

// Show alert message
function showAlert(message, type) {
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.innerHTML = `
    <span>${message}</span>
    <button class="close-alert">&times;</button>
  `;
  
  document.body.appendChild(alert);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    alert.classList.add('fade-out');
    setTimeout(() => {
      if (alert.parentNode) document.body.removeChild(alert);
    }, 300);
  }, 5000);
  
  // Manual close
  alert.querySelector('.close-alert').addEventListener('click', () => {
    alert.classList.add('fade-out');
    setTimeout(() => {
      if (alert.parentNode) document.body.removeChild(alert);
    }, 300);
  });
}

// Toggle loading state
function toggleLoading(show) {
  const searchBtn = document.querySelector('.search-btn');
  
  if (show) {
    searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
    searchBtn.disabled = true;
  } else {
    searchBtn.innerHTML = '<i class="fas fa-search"></i> Search Buses';
    searchBtn.disabled = false;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Previous initialization code...
  
  // Add search form submit handler
  document.querySelector('.search-form').addEventListener('submit', searchBuses);
  
  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('travel-date').setAttribute('min', today);
});



























// Track Bus Page



// Track Bus Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize map (will be set up when tracking starts)
  let busMap;
  let busMarker;
  let routePolyline;
  
  // Set default date to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('travel-date').value = today;
  
  // Toggle between booking ID and bus number inputs
  document.querySelectorAll('input[name="tracking-method"]').forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.value === 'booking') {
        document.getElementById('booking-id-group').classList.remove('hidden');
        document.getElementById('bus-number-group').classList.add('hidden');
      } else {
        document.getElementById('booking-id-group').classList.add('hidden');
        document.getElementById('bus-number-group').classList.remove('hidden');
      }
    });
  });
  
  // Form submission
  document.getElementById('trackBusForm').addEventListener('submit', function(e) {
    e.preventDefault();
    trackBus();
  });
  
  // FAQ accordion functionality
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
      const item = this.parentElement;
      item.classList.toggle('active');
      
      // Close other open FAQs
      document.querySelectorAll('.faq-item').forEach(faq => {
        if (faq !== item && faq.classList.contains('active')) {
          faq.classList.remove('active');
        }
      });
    });
  });
  
  // Track bus function
  function trackBus() {
    const trackingMethod = document.querySelector('input[name="tracking-method"]:checked').value;
    const bookingId = document.getElementById('booking-id').value.trim();
    const busNumber = document.getElementById('bus-number').value.trim();
    const travelDate = document.getElementById('travel-date').value;
    
    // Simple validation
    if (trackingMethod === 'booking' && !bookingId) {
      showAlert('Please enter your booking ID', 'error');
      return;
    }
    
    if (trackingMethod === 'bus' && !busNumber) {
      showAlert('Please enter the bus number', 'error');
      return;
    }
    
    if (!travelDate) {
      showAlert('Please select travel date', 'error');
      return;
    }
    
    // Show loading state
    const trackBtn = document.querySelector('.track-btn');
    trackBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Tracking...';
    trackBtn.disabled = true;
    
    // In a real app, this would be an API call
    setTimeout(() => {
      // Simulate successful tracking
      simulateBusTracking();
      
      // Show results
      document.getElementById('trackResults').classList.remove('hidden');
      
      // Scroll to results
      document.getElementById('trackResults').scrollIntoView({
        behavior: 'smooth'
      });
      
      // Reset button
      trackBtn.innerHTML = '<i class="fas fa-search-location"></i> Track Bus';
      trackBtn.disabled = false;
    }, 1500);
  }
  
  // Simulate bus tracking with mock data
  function simulateBusTracking() {
    // Initialize map if not already done
    if (!busMap) {
      initMap();
    } else {
      busMap.invalidateSize();
    }
    
    // Clear previous route if any
    if (routePolyline) {
      busMap.removeLayer(routePolyline);
    }
    
    // Sample route coordinates (Mumbai to Pune)
    const routeCoordinates = [
      [19.0760, 72.8777],  // Mumbai
      [19.2183, 72.9781],  // Thane
      [19.0330, 73.0297],  // Kalamboli
      [18.7522, 73.4059],  // Lonavala
      [18.5204, 73.8567]   // Pune
    ];
    
    // Create polyline for the route
    routePolyline = L.polyline(routeCoordinates, {
      color: '#1f4068',
      weight: 4,
      opacity: 0.7,
      dashArray: '10, 10'
    }).addTo(busMap);
    
    // Fit map to route bounds
    busMap.fitBounds(routePolyline.getBounds(), {
      padding: [50, 50]
    });
    
    // Add markers for stops
    routeCoordinates.forEach((coord, index) => {
      const stopName = ['Mumbai', 'Thane', 'Kalavali', 'Lonavala', 'Pune'][index];
      const icon = L.divIcon({
        html: `<div class="map-stop-marker">${stopName}</div>`,
        className: 'map-stop-marker-container',
        iconSize: [100, 20]
      });
      
      L.marker(coord, { icon }).addTo(busMap)
        .bindPopup(`<b>${stopName}</b><br>${['Start', 'Stop 1', 'Stop 2', 'Next Stop', 'Destination'][index]}`);
    });
    
    // Simulate bus moving along route
    let progress = 0.65; // Start at 65% for demo
    const totalDistance = routeCoordinates.length - 1;
    const segmentProgress = progress * totalDistance;
    const segmentIndex = Math.floor(segmentProgress);
    const segmentPercent = segmentProgress - segmentIndex;
    
    // Calculate bus position
    const startCoord = routeCoordinates[segmentIndex];
    const endCoord = routeCoordinates[segmentIndex + 1];
    const busLat = startCoord[0] + (endCoord[0] - startCoord[0]) * segmentPercent;
    const busLng = startCoord[1] + (endCoord[1] - startCoord[1]) * segmentPercent;
    
    // Update bus marker
    if (!busMarker) {
      const busIcon = L.divIcon({
        html: '<i class="fas fa-bus"></i>',
        className: 'map-bus-marker',
        iconSize: [30, 30]
      });
      
      busMarker = L.marker([busLat, busLng], {
        icon: busIcon,
        zIndexOffset: 1000
      }).addTo(busMap);
      
      busMarker.bindPopup('<b>Your Bus</b><br>MH01AB1234<br>Sharma Travels');
    } else {
      busMarker.setLatLng([busLat, busLng]);
    }
    
    // Update progress bar
    document.querySelector('.progress-fill').style.width = `${progress * 100}%`;
    document.querySelector('.current-location').style.left = `${progress * 100}%`;
    
    // Update last updated time
    updateTime();
    
    // Set up map controls
    document.getElementById('zoomIn').addEventListener('click', function() {
      busMap.zoomIn();
    });
    
    document.getElementById('zoomOut').addEventListener('click', function() {
      busMap.zoomOut();
    });
    
    document.getElementById('locateBus').addEventListener('click', function() {
      busMap.flyTo([busLat, busLng], 13);
      busMarker.openPopup();
    });
    
    // Start auto-update simulation
    if (window.busTrackingInterval) {
      clearInterval(window.busTrackingInterval);
    }
    
    window.busTrackingInterval = setInterval(() => {
      progress = Math.min(progress + 0.01, 1);
      const newSegmentProgress = progress * totalDistance;
      const newSegmentIndex = Math.floor(newSegmentProgress);
      const newSegmentPercent = newSegmentProgress - newSegmentIndex;
      
      // Calculate new position
      const newStartCoord = routeCoordinates[newSegmentIndex];
      const newEndCoord = routeCoordinates[newSegmentIndex + 1];
      const newBusLat = newStartCoord[0] + (newEndCoord[0] - newStartCoord[0]) * newSegmentPercent;
      const newBusLng = newStartCoord[1] + (newEndCoord[1] - newStartCoord[1]) * newSegmentPercent;
      
      // Update marker position
      busMarker.setLatLng([newBusLat, newBusLng]);
      
      // Update progress
      document.querySelector('.progress-fill').style.width = `${progress * 100}%`;
      document.querySelector('.current-location').style.left = `${progress * 100}%`;
      
      // Update remaining time (simplified calculation)
      const remainingPercent = 1 - progress;
      const remainingTime = Math.round(remainingPercent * 3 * 60); // Total journey time is 3.5 hours in this demo
      const hours = Math.floor(remainingTime / 60);
      const mins = remainingTime % 60;
      document.getElementById('remainingTime').textContent = 
        `${hours > 0 ? `${hours}h ` : ''}${mins}m remaining`;
      
      // Update next stop info
      if (progress < 0.8) {
        document.getElementById('nextStop').textContent = 'Lonavala (in 15 min)';
      } else {
        document.getElementById('nextStop').textContent = 'Pune Station (in 30 min)';
      }
      
      // Update last updated time
      updateTime();
      
      // If journey completed
      if (progress >= 1) {
        clearInterval(window.busTrackingInterval);
        document.querySelector('.progress-time span:first-child').textContent = 'Journey completed';
        document.getElementById('remainingTime').textContent = 'Bus arrived';
        document.getElementById('nextStop').textContent = 'Destination reached';
      }
    }, 3000);
  }
  
  // Initialize map
  function initMap() {
    busMap = L.map('busMap').setView([19.0760, 72.8777], 10);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(busMap);
  }
  
  // Update last updated time
  function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('lastUpdated').textContent = timeString;
  }
  
  // Show alert (same as in main.js)
  function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
      <span>${message}</span>
      <button class="close-alert">&times;</button>
    `;
    
    document.body.appendChild(alert);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      alert.classList.add('fade-out');
      setTimeout(() => {
        if (alert.parentNode) document.body.removeChild(alert);
      }, 300);
    }, 5000);
    
    // Manual close
    alert.querySelector('.close-alert').addEventListener('click', () => {
      alert.classList.add('fade-out');
      setTimeout(() => {
        if (alert.parentNode) document.body.removeChild(alert);
      }, 300);
    });
  }
});











































// offers.js
document.addEventListener('DOMContentLoaded', function() {
  // Filter offers by category
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      // Update active tab
      document.querySelectorAll('.filter-tab').forEach(t => {
        t.classList.remove('active');
      });
      this.classList.add('active');
      
      const category = this.dataset.category;
      filterOffers(category);
    });
  });
  
  // Apply offer button
  document.querySelectorAll('.offer-apply-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const offerCard = this.closest('.offer-card');
      const offerTitle = offerCard.querySelector('h3').textContent;
      const offerCode = offerCard.querySelector('.offer-code').textContent.replace('Code: ', '');
      
      // In a real app, this would store the offer for use during checkout
      showAlert(`Offer "${offerTitle}" applied! Use code ${offerCode} at checkout.`, 'success');
    });
  });
  
  // Toggle terms visibility
  document.querySelector('.terms-toggle-btn').addEventListener('click', function() {
    const terms = document.querySelector('.additional-terms');
    terms.classList.toggle('hidden');
    
    if (terms.classList.contains('hidden')) {
      this.innerHTML = 'Show More Terms <i class="fas fa-chevron-down"></i>';
    } else {
      this.innerHTML = 'Show Less Terms <i class="fas fa-chevron-up"></i>';
    }
  });
  
  // Filter offers function
  function filterOffers(category) {
    const offers = document.querySelectorAll('.offer-card');
    
    offers.forEach(offer => {
      if (category === 'all' || offer.dataset.categories.includes(category)) {
        offer.style.display = 'block';
      } else {
        offer.style.display = 'none';
      }
    });
  }
  
  // Show alert (same as in main.js)
  function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
      <span>${message}</span>
      <button class="close-alert">&times;</button>
    `;
    
    document.body.appendChild(alert);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      alert.classList.add('fade-out');
      setTimeout(() => {
        if (alert.parentNode) document.body.removeChild(alert);
      }, 300);
    }, 5000);
    
    // Manual close
    alert.querySelector('.close-alert').addEventListener('click', () => {
      alert.classList.add('fade-out');
      setTimeout(() => {
        if (alert.parentNode) document.body.removeChild(alert);
      }, 300);
    });
  }
});

// support.js
document.addEventListener('DOMContentLoaded', function() {
  // FAQ accordion functionality
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
      const item = this.parentElement;
      item.classList.toggle('active');
      
      // Close other open FAQs
      document.querySelectorAll('.faq-item').forEach(faq => {
        if (faq !== item && faq.classList.contains('active')) {
          faq.classList.remove('active');
        }
      });
    });
  });
  
  // Start chat button
  document.getElementById('startChatBtn').addEventListener('click', function() {
    // In a real app, this would open a chat widget
    showAlert('Chat support would open in a full implementation', 'info');
  });
  
  // Show alert (same as in main.js)
  function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
      <span>${message}</span>
      <button class="close-alert">&times;</button>
    `;
    
    document.body.appendChild(alert);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      alert.classList.add('fade-out');
      setTimeout(() => {
        if (alert.parentNode) document.body.removeChild(alert);
      }, 300);
    }, 5000);
    
    // Manual close
    alert.querySelector('.close-alert').addEventListener('click', () => {
      alert.classList.add('fade-out');
      setTimeout(() => {
        if (alert.parentNode) document.body.removeChild(alert);
      }, 300);
    });
  }
});






























// payment page

document.addEventListener('DOMContentLoaded', function() {
  // Payment tabs switching
  document.querySelectorAll('.payment-tabs .tab-btn').forEach(tab => {
    tab.addEventListener('click', function() {
      const tabId = this.dataset.tab;
      
      // Update active tab
      document.querySelectorAll('.payment-tabs .tab-btn').forEach(t => {
        t.classList.remove('active');
      });
      this.classList.add('active');
      
      // Show corresponding tab content
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      document.getElementById(`${tabId}-tab`).classList.add('active');
    });
  });
  
  // Format card number input
  document.getElementById('card-number').addEventListener('input', function(e) {
    let value = this.value.replace(/\s+/g, '');
    if (value.length > 16) value = value.substr(0, 16);
    
    // Add space after every 4 digits
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    this.value = value;
  });
  
  // Format expiry date input
  document.getElementById('card-expiry').addEventListener('input', function(e) {
    let value = this.value.replace(/\D/g, '');
    if (value.length > 4) value = value.substr(0, 4);
    
    // Add slash after 2 digits
    if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{0,2})/, '$1/$2');
    }
    this.value = value;
  });
  
  // Pay now button click
  document.getElementById('payNowBtn').addEventListener('click', function() {
    // Validate payment method
    const selectedTab = document.querySelector('.payment-tabs .tab-btn.active').dataset.tab;
    let isValid = false;
    
    switch(selectedTab) {
      case 'cards':
        const cardSelected = document.querySelector('input[name="payment-method"]:checked');
        const cardNumber = document.getElementById('card-number').value;
        const cardName = document.getElementById('card-name').value;
        const cardExpiry = document.getElementById('card-expiry').value;
        const cardCvv = document.getElementById('card-cvv').value;
        
        if (cardSelected || (cardNumber && cardName && cardExpiry && cardCvv)) {
          isValid = true;
        }
        break;
        
      case 'wallets':
        isValid = document.querySelector('input[name="wallet-method"]:checked') !== null;
        break;
        
      case 'netbanking':
        isValid = document.querySelector('input[name="bank-method"]:checked') !== null;
        break;
        
      case 'upi':
        isValid = document.querySelector('input[name="upi-method"]:checked') !== null;
        break;
    }
    
    if (!isValid) {
      showAlert('Please select a payment method and enter required details', 'error');
      return;
    }
    
    // Show processing modal
    const modal = document.getElementById('paymentModal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Simulate payment processing
    setTimeout(() => {
      document.querySelector('.processing-animation').classList.add('hidden');
      document.querySelector('.payment-success').classList.remove('hidden');
      
      // In a real app, this would redirect to booking details or send confirmation
    }, 3000);
  });
  
  // Close modal when clicking outside
  document.getElementById('paymentModal').addEventListener('click', function(e) {
    if (e.target === this) {
      this.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  });
  
  // Show alert function
  function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
      <span>${message}</span>
      <button class="close-alert">&times;</button>
    `;
    
    document.body.appendChild(alert);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      alert.classList.add('fade-out');
      setTimeout(() => {
        if (alert.parentNode) document.body.removeChild(alert);
      }, 300);
    }, 5000);
    
    // Manual close
    alert.querySelector('.close-alert').addEventListener('click', () => {
      alert.classList.add('fade-out');
      setTimeout(() => {
        if (alert.parentNode) document.body.removeChild(alert);
      }, 300);
    });
  }
});






