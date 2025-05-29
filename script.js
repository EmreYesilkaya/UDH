class TransportSupportCalculator {
    constructor() {
        this.currentDate = new Date(2025, 4, 1); // May 2025
        this.selectedDays = new Map(); // date string -> hours
        this.previousQualificationState = null; // Track qualification state for confetti
        this.turkishMonths = [
            'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
            'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
        ];
        this.turkishDays = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
        
        // Turkish holidays for 2024-2026
        this.holidays = this.generateHolidays();
        
        this.init();
    }

    init() {
        this.renderCalendar();
        this.bindEvents();
        this.updateStats();
        
        // Enable transitions after initial load
        setTimeout(() => {
            document.body.classList.add('transition-enabled');
        }, 100);
        
        // Add test confetti button for development (remove in production)
        // this.addTestConfettiButton();
    }

    generateHolidays() {
        const holidays = new Map();
        const bridgeDays = new Map();
        
        // Fixed holidays for 2024 and 2026 only (2025 has custom dates)
        for (let year = 2024; year <= 2026; year++) {
            if (year === 2025) continue; // Skip 2025, handled separately
            holidays.set(`${year}-01-01`, 'Yılbaşı');
            holidays.set(`${year}-04-23`, 'Ulusal Egemenlik ve Çocuk Bayramı');
            holidays.set(`${year}-05-01`, 'Emek ve Dayanışma Günü');
            holidays.set(`${year}-05-19`, 'Atatürk\'ü Anma, Gençlik ve Spor Bayramı');
            holidays.set(`${year}-07-15`, '15 Temmuz Demokrasi ve Milli Birlik Günü');
            holidays.set(`${year}-08-30`, 'Zafer Bayramı');
            holidays.set(`${year}-10-29`, 'Cumhuriyet Bayramı');
        }
        
        // 2025 Specific holidays - Only the dates you specified
        // Ocak holidays
        holidays.set('2025-01-01', 'Yılbaşı');
        
        // Mart holidays
        holidays.set('2025-03-29', 'Resmi Tatil');
        holidays.set('2025-03-30', 'Resmi Tatil');
        holidays.set('2025-03-31', 'Resmi Tatil');
        
        // Nisan holidays  
        holidays.set('2025-04-01', 'Resmi Tatil');
        holidays.set('2025-04-02', 'Resmi Tatil');
        holidays.set('2025-04-03', 'Resmi Tatil');
        holidays.set('2025-04-04', 'Resmi Tatil');
        holidays.set('2025-04-23', 'Ulusal Egemenlik ve Çocuk Bayramı');
        
        // Mayıs holidays
        holidays.set('2025-05-01', 'Emek ve Dayanışma Günü');
        holidays.set('2025-05-02', 'Resmi Tatil');
        holidays.set('2025-05-19', 'Atatürk\'ü Anma, Gençlik ve Spor Bayramı');
        
        // Haziran holidays
        holidays.set('2025-06-05', 'Resmi Tatil');
        holidays.set('2025-06-06', 'Resmi Tatil');
        holidays.set('2025-06-07', 'Resmi Tatil');
        holidays.set('2025-06-08', 'Resmi Tatil');
        holidays.set('2025-06-09', 'Resmi Tatil');
        
        // Temmuz holidays
        holidays.set('2025-07-14', 'Resmi Tatil');
        holidays.set('2025-07-15', '15 Temmuz Demokrasi ve Milli Birlik Günü');
        holidays.set('2025-07-16', 'Resmi Tatil');
        holidays.set('2025-07-17', 'Resmi Tatil');
        holidays.set('2025-07-18', 'Resmi Tatil');
        
        // Ağustos holidays
        holidays.set('2025-08-18', 'Resmi Tatil');
        holidays.set('2025-08-19', 'Resmi Tatil');
        holidays.set('2025-08-20', 'Resmi Tatil');
        holidays.set('2025-08-21', 'Resmi Tatil');
        holidays.set('2025-08-22', 'Resmi Tatil');
        holidays.set('2025-08-30', 'Zafer Bayramı');
        
        // Ekim holidays
        holidays.set('2025-10-27', 'Resmi Tatil');
        holidays.set('2025-10-28', 'Resmi Tatil');
        holidays.set('2025-10-29', 'Cumhuriyet Bayramı');
        
        // Previous years holidays (2024)
        // Ramazan Bayramı 2024
        holidays.set('2024-04-10', 'Ramazan Bayramı 1. Gün');
        holidays.set('2024-04-11', 'Ramazan Bayramı 2. Gün');
        holidays.set('2024-04-12', 'Ramazan Bayramı 3. Gün');
        
        // Kurban Bayramı 2024
        holidays.set('2024-06-16', 'Kurban Bayramı 1. Gün');
        holidays.set('2024-06-17', 'Kurban Bayramı 2. Gün');
        holidays.set('2024-06-18', 'Kurban Bayramı 3. Gün');
        holidays.set('2024-06-19', 'Kurban Bayramı 4. Gün');
        
        // Future years holidays (2026)
        // Ramazan Bayramı 2026
        holidays.set('2026-03-20', 'Ramazan Bayramı 1. Gün');
        holidays.set('2026-03-21', 'Ramazan Bayramı 2. Gün');
        holidays.set('2026-03-22', 'Ramazan Bayramı 3. Gün');
        
        // Kurban Bayramı 2026
        holidays.set('2026-05-27', 'Kurban Bayramı 1. Gün');
        holidays.set('2026-05-28', 'Kurban Bayramı 2. Gün');
        holidays.set('2026-05-29', 'Kurban Bayramı 3. Gün');
        holidays.set('2026-05-30', 'Kurban Bayramı 4. Gün');
        
        // Store bridge days separately
        this.bridgeDays = bridgeDays;
        
        return holidays;
    }

    bindEvents() {
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.renderCalendar();
        });

        document.getElementById('nextMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.renderCalendar();
        });

        // Modal events
        document.getElementById('saveHours').addEventListener('click', () => this.saveHours());
        document.getElementById('cancelHours').addEventListener('click', () => this.closeModal());
        document.getElementById('removeDay').addEventListener('click', () => this.removeDay());

        // Export events
        document.getElementById('exportPDF').addEventListener('click', () => this.exportPDF());
        document.getElementById('exportExcel').addEventListener('click', () => this.exportExcel());

        // Close modal on outside click
        document.getElementById('hourModal').addEventListener('click', (e) => {
            if (e.target.id === 'hourModal') {
                this.closeModal();
            }
        });

        // Enter key to save hours
        document.getElementById('hoursInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.saveHours();
            }
        });

        // Prevent entering 0 in hours input
        document.getElementById('hoursInput').addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            if (value === 0) {
                e.target.value = '';
                e.target.classList.add('input-error');
                
                // Update help text temporarily
                const helpText = e.target.parentNode.querySelector('.input-help');
                const originalText = helpText.textContent;
                helpText.textContent = '⚠️ 0 saat girilemez! En az 1 saat girmelisiniz.';
                helpText.classList.add('input-error-text');
                
                setTimeout(() => {
                    e.target.classList.remove('input-error');
                    helpText.textContent = originalText;
                    helpText.classList.remove('input-error-text');
                }, 3000);
            }
        });

        // Responsive layout handler for dynamic screen size changes
        let resizeTimeout;
        window.addEventListener('resize', () => {
            // Debounce resize events for better performance
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 150);
        });

        // Handle orientation changes on mobile devices
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleResize();
            }, 300); // Delay to allow orientation change to complete
        });

        // Mobile-specific touch event improvements
        this.setupMobileOptimizations();

        // Handle visibility changes (when switching tabs or apps)
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                setTimeout(() => {
                    this.handleResize();
                }, 100);
            }
        });

        // Initial responsive setup
        this.handleResize();
    }

    handleResize() {
        // Disable transitions during resize
        document.body.classList.remove('transition-enabled');
        
        // Force layout recalculation
        const mainLayout = document.querySelector('.main-layout');
        if (mainLayout) {
            // Temporarily hide to force reflow
            mainLayout.style.display = 'none';
            
            // Force a reflow
            mainLayout.offsetHeight;
            
            // Restore display
            mainLayout.style.display = 'grid';
            
            // Add force reflow class
            mainLayout.classList.add('force-reflow');
        }

        // Recalculate calendar layout if needed
        this.updateCalendarLayout();
        
        // Update statistics display
        this.updateStats();
        
        // Re-enable transitions after a short delay
        setTimeout(() => {
            document.body.classList.add('transition-enabled');
            if (mainLayout) {
                mainLayout.classList.remove('force-reflow');
            }
        }, 100);
    }

    updateCalendarLayout() {
        const calendar = document.getElementById('calendar');
        if (calendar) {
            // Force calendar recalculation
            const days = calendar.querySelectorAll('.calendar-day');
            days.forEach(day => {
                // Trigger reflow for each day
                day.style.transform = 'scale(0.999)';
                requestAnimationFrame(() => {
                    day.style.transform = '';
                });
            });
        }
    }

    renderCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        // Update month display
        document.getElementById('currentMonth').textContent = 
            `${this.turkishMonths[month]} ${year}`;

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const calendar = document.getElementById('calendar');
        calendar.innerHTML = '';

        // Previous month days
        const prevMonth = new Date(year, month - 1, 0);
        const prevMonthDays = prevMonth.getDate();
        
        for (let i = startingDayOfWeek - 1; i >= 0; i--) {
            const day = prevMonthDays - i;
            const dayElement = this.createDayElement(new Date(year, month - 1, day), true);
            calendar.appendChild(dayElement);
        }

        // Current month days
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dayElement = this.createDayElement(date, false);
            calendar.appendChild(dayElement);
        }

        // Next month days
        const remainingCells = 42 - (startingDayOfWeek + daysInMonth);
        for (let day = 1; day <= remainingCells; day++) {
            const dayElement = this.createDayElement(new Date(year, month + 1, day), true);
            calendar.appendChild(dayElement);
        }

        this.updateStats();
    }

    createDayElement(date, isOtherMonth) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        const dayOfWeek = date.getDay();
        const dateString = this.formatDate(date);
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const isHoliday = this.holidays.has(dateString);
        const isBridgeDay = this.bridgeDays && this.bridgeDays.has(dateString);
        const isSelected = this.selectedDays.has(dateString);
        
        if (isOtherMonth) {
            dayElement.classList.add('other-month');
        } else if (isHoliday) {
            dayElement.classList.add('holiday', 'tooltip');
            dayElement.setAttribute('data-tooltip', this.holidays.get(dateString));
        } else if (isBridgeDay) {
            dayElement.classList.add('bridge-day', 'tooltip');
            dayElement.setAttribute('data-tooltip', this.bridgeDays.get(dateString));
        } else if (isWeekend) {
            dayElement.classList.add('weekend');
        } else {
            dayElement.classList.add('working-day');
            dayElement.addEventListener('click', () => this.selectDay(date));
        }

        if (isSelected) {
            dayElement.classList.add('selected');
            const hours = this.selectedDays.get(dateString);
            const totalMinutes = Math.floor(hours * 100) % 100 + Math.floor(hours) * 60;
            if (totalMinutes < 7.5 * 60) { // 7 hours 30 minutes = 450 minutes
                dayElement.classList.add('low-hours');
            }
            
            // Convert decimal format back to hours:minutes for display
            const displayHours = Math.floor(hours);
            const displayMinutes = Math.floor((hours * 100) % 100);
            
            // Format time display - show only hours if minutes are 00
            const timeDisplay = displayMinutes === 0 ? `${displayHours}` : `${displayHours}:${displayMinutes.toString().padStart(2, '0')}`;
            
            dayElement.innerHTML = `
                <div>${date.getDate()}</div>
                <div class="hours">${timeDisplay}</div>
            `;
        } else {
            dayElement.textContent = date.getDate();
        }

        return dayElement;
    }

    selectDay(date) {
        const dateString = this.formatDate(date);
        
        if (this.selectedDays.has(dateString)) {
            // Edit existing selection
            this.openModal(date, this.selectedDays.get(dateString));
        } else {
            // New selection
            this.openModal(date, 8.00); // Default 8.00 (8 hours 0 minutes)
        }
    }

    openModal(date, currentHours = 8.00) {
        this.currentModalDate = date;
        const dateString = this.formatDateTurkish(date);
        
        document.getElementById('modalDate').textContent = dateString;
        document.getElementById('hoursInput').value = currentHours;
        document.getElementById('hourModal').style.display = 'block';
        document.getElementById('hoursInput').focus();
        document.getElementById('hoursInput').select();
        
        // Show/hide remove button
        const removeBtn = document.getElementById('removeDay');
        const dateKey = this.formatDate(date);
        removeBtn.style.display = this.selectedDays.has(dateKey) ? 'block' : 'none';
    }

    closeModal() {
        document.getElementById('hourModal').style.display = 'none';
        this.currentModalDate = null;
    }

    saveHours() {
        let input = document.getElementById('hoursInput').value.trim();
        
        // If input doesn't contain a dot, add .00 for whole hours
        if (!input.includes('.')) {
            input = input + '.00';
        }
        
        const hours = parseFloat(input);
        
        console.log('Saving hours:', hours, 'Type:', typeof hours);
        
        if (isNaN(hours)) {
            alert('Lütfen geçerli bir saat değeri girin.');
            return;
        }
        
        // Check for zero hours
        if (hours === 0) {
            alert('0 saat girilemez. Lütfen en az 1 saat girin.');
            return;
        }
        
        // Check for negative hours
        if (hours < 0) {
            alert('Negatif saat değeri girilemez. Lütfen pozitif bir değer girin.');
            return;
        }
        
        // Check format: X.YZ where X is hours, YZ is minutes (00-59)
        const parts = input.split('.');
        if (parts.length !== 2 || parts[1].length !== 2) {
            alert('Lütfen saat formatını X.YZ şeklinde girin (örnek: 8.30 = 8 saat 30 dakika) veya tam saat için sadece sayı yazın (örnek: 8).');
            return;
        }
        
        const hourPart = parseInt(parts[0]);
        const minutePart = parseInt(parts[1]);
        
        // Additional validation for hour part
        if (isNaN(hourPart) || isNaN(minutePart)) {
            alert('Lütfen geçerli sayısal değerler girin.');
            return;
        }
        
        if (minutePart < 0 || minutePart > 59) {
            alert('Dakika değeri 00-59 arasında olmalıdır.');
            return;
        }
        
        if (hourPart <= 0 || hourPart > 24) {
            alert('Saat değeri 1-24 arasında olmalıdır. 0 saat girilemez.');
            return;
        }

        const dateString = this.formatDate(this.currentModalDate);
        this.selectedDays.set(dateString, hours);
        
        console.log('Saved to selectedDays:', dateString, hours);
        
        this.renderCalendar();
        this.updateSelectedDaysDisplay();
        this.closeModal();
    }

    removeDay() {
        const dateString = this.formatDate(this.currentModalDate);
        this.selectedDays.delete(dateString);
        
        this.renderCalendar();
        this.updateSelectedDaysDisplay();
        this.closeModal();
    }

    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    formatDateTurkish(date) {
        const day = date.getDate();
        const month = this.turkishMonths[date.getMonth()];
        const year = date.getFullYear();
        const dayName = this.turkishDays[date.getDay()];
        
        return `${dayName}, ${day} ${month} ${year}`;
    }

    getWorkingDaysInMonth() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        let workingDays = 0;

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dayOfWeek = date.getDay();
            const dateString = this.formatDate(date);
            
            if (dayOfWeek !== 0 && dayOfWeek !== 6 && !this.holidays.has(dateString)) {
                workingDays++;
            }
        }

        return workingDays;
    }

    calculatePayment() {
        const selectedDays = this.selectedDays.size;
        
        // Convert decimal format (X.YZ) to total minutes for accurate calculation
        const totalMinutes = Array.from(this.selectedDays.values()).reduce((sum, timeValue) => {
            const hours = Math.floor(timeValue);
            const minutes = Math.floor((timeValue * 100) % 100);
            return sum + (hours * 60) + minutes;
        }, 0);
        
        const totalHours = totalMinutes / 60; // Convert back to decimal hours for display
        const workingDaysInMonth = this.getWorkingDaysInMonth();
        
        // Count days with at least 7 hours 30 minutes (450 minutes)
        const validDaysForFull = Array.from(this.selectedDays.values()).filter(timeValue => {
            const hours = Math.floor(timeValue);
            const minutes = Math.floor((timeValue * 100) % 100);
            const totalMins = (hours * 60) + minutes;
            return totalMins >= 450; // 7 hours 30 minutes
        }).length;
        
        const hasLowHours = Array.from(this.selectedDays.values()).some(timeValue => {
            const hours = Math.floor(timeValue);
            const minutes = Math.floor((timeValue * 100) % 100);
            const totalMins = (hours * 60) + minutes;
            return totalMins < 450; // Less than 7 hours 30 minutes
        });
        
        // Calculate required days for full support (half of working days in month)
        const requiredDaysForFull = Math.ceil(workingDaysInMonth / 2);

        // Debug logging
        console.log('Debug Payment Calculation:');
        console.log('Selected days:', selectedDays);
        console.log('All time values:', Array.from(this.selectedDays.values()));
        console.log('Total minutes:', totalMinutes);
        console.log('Total hours (decimal):', totalHours);
        console.log('Valid days for full (>=7:30):', validDaysForFull);
        console.log('Has low hours (<7:30):', hasLowHours);
        console.log('Working days in month:', workingDaysInMonth);
        console.log('Required days for full support:', requiredDaysForFull);

        // Basic support criteria: 4+ days AND 30+ hours
        const meetsBasicCriteria = selectedDays >= 4 && totalHours >= 30;
        
        // Full support criteria: half of month's working days with 7:30+ hours each
        const meetsFullCriteria = validDaysForFull >= requiredDaysForFull;

        console.log('Meets full criteria:', meetsFullCriteria);
        console.log(`validDaysForFull >= requiredDaysForFull: ${validDaysForFull} >= ${requiredDaysForFull}`);

        let amount = 0;
        let type = 'Destek Yok';

        if (meetsFullCriteria) {
            amount = 12000;
            type = 'Tam Destek';
        } else if (meetsBasicCriteria) {
            amount = 3000;
            type = 'Temel Destek';
        }

        return {
            amount,
            type,
            meetsBasicCriteria,
            meetsFullCriteria,
            selectedDays,
            totalHours,
            totalMinutes,
            workingDaysInMonth,
            validDaysForFull,
            hasLowHours,
            requiredDaysForFull
        };
    }

    updateStats() {
        const stats = this.calculatePayment();
        
        // Convert total hours to hours:minutes format for display
        const totalHours = Math.floor(stats.totalHours);
        const totalMinutes = Math.round((stats.totalHours - totalHours) * 60);
        
        // Format time display - show only hours if minutes are 00
        const timeDisplay = totalMinutes === 0 ? `${totalHours}` : `${totalHours}:${totalMinutes.toString().padStart(2, '0')}`;
        
        // Update statistics
        document.getElementById('selectedDays').textContent = stats.selectedDays;
        document.getElementById('totalHours').textContent = timeDisplay;
        document.getElementById('workingDaysInMonth').textContent = stats.workingDaysInMonth;
        document.getElementById('validDaysForFull').textContent = stats.validDaysForFull;

        // Update criteria checks
        const basicCriteria = document.getElementById('basicCriteria');
        const fullCriteria = document.getElementById('fullCriteria');

        basicCriteria.className = 'check-item ' + (stats.meetsBasicCriteria ? 'valid' : 'invalid');
        basicCriteria.querySelector('i').className = stats.meetsBasicCriteria ? 'fas fa-check-circle' : 'fas fa-times-circle';

        fullCriteria.className = 'check-item ' + (stats.meetsFullCriteria ? 'valid' : 'invalid');
        fullCriteria.querySelector('i').className = stats.meetsFullCriteria ? 'fas fa-check-circle' : 'fas fa-times-circle';

        // Update payment amount
        document.getElementById('paymentAmount').textContent = `${stats.amount.toLocaleString('tr-TR')} TL`;
        document.getElementById('paymentType').textContent = stats.type;

        // Show/hide warnings
        const lowHourWarning = document.getElementById('lowHourWarning');
        
        lowHourWarning.style.display = stats.hasLowHours && stats.selectedDays > 0 ? 'block' : 'none';

        // Check for qualification and trigger confetti if newly qualified
        const currentQualificationLevel = stats.meetsFullCriteria ? 'full' : (stats.meetsBasicCriteria ? 'basic' : 'none');
        const previousLevel = this.previousQualificationState || 'none';
        
        // Trigger confetti when:
        // 1. Moving from no qualification to any qualification
        // 2. Moving from basic to full qualification
        const shouldTriggerConfetti = 
            (previousLevel === 'none' && currentQualificationLevel !== 'none') ||
            (previousLevel === 'basic' && currentQualificationLevel === 'full');
        
        if (shouldTriggerConfetti) {
            // Add a small delay to let the UI update first
            setTimeout(() => {
                triggerConfetti();
            }, 300);
        }
        
        // Update the previous state
        this.previousQualificationState = currentQualificationLevel;

        this.updateSelectedDaysDisplay();
    }

    updateSelectedDaysDisplay() {
        const container = document.getElementById('selectedDaysDetail');
        
        if (this.selectedDays.size === 0) {
            container.innerHTML = '<p class="no-selection">Henüz gün seçilmedi</p>';
            return;
        }

        const sortedDays = Array.from(this.selectedDays.entries()).sort();
        
        container.innerHTML = sortedDays.map(([dateString, timeValue]) => {
            const date = new Date(dateString);
            const formattedDate = this.formatDateTurkish(date);
            
            // Convert decimal format to hours and minutes
            const hours = Math.floor(timeValue);
            const minutes = Math.floor((timeValue * 100) % 100);
            const totalMinutes = (hours * 60) + minutes;
            const isLowHours = totalMinutes < 450; // Less than 7 hours 30 minutes
            const isBelow8Hours = totalMinutes < 480; // Less than 8 hours
            
            // Format time display - show only hours if minutes are 00
            const timeDisplay = minutes === 0 ? `${hours}` : `${hours}:${minutes.toString().padStart(2, '0')}`;
            
            const statusClass = isLowHours ? 'low-hours' : (isBelow8Hours ? 'below-8-hours' : '');
            const statusText = isLowHours ? '(Tam destek hesabına sayılmaz)' : 
                              isBelow8Hours ? '(8 saat altı)' : '(Tam destek)';
            
            return `
                <div class="selected-day-item ${statusClass}" data-date="${dateString}">
                    <div class="day-date">${formattedDate}</div>
                    <div class="day-hours">${timeDisplay} ${statusText}</div>
                    <div class="quick-actions">
                        <button class="quick-action-btn edit-btn" onclick="calculator.editDayHours('${dateString}')" title="Düzenle">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="quick-action-btn delete-btn" onclick="calculator.removeDayQuick('${dateString}')" title="Sil">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Quick edit function for selected days
    editDayHours(dateString) {
        const currentHours = this.selectedDays.get(dateString) || 8;
        const date = new Date(dateString);
        this.openModal(date, currentHours);
    }

    // Quick remove function for selected days  
    removeDayQuick(dateString) {
        this.selectedDays.delete(dateString);
        this.updateCalendarDay(dateString);
        this.updateStats();
        this.updateSelectedDaysDisplay();
    }

    // Helper function to update a specific calendar day
    updateCalendarDay(dateString) {
        const dayElement = document.querySelector(`[data-date="${dateString}"]`);
        if (dayElement) {
            dayElement.classList.remove('selected', 'low-hours', 'below-8-hours');
            const hoursSpan = dayElement.querySelector('.hours');
            if (hoursSpan) {
                hoursSpan.remove();
            }
        }
    }

    exportPDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Title
        doc.setFontSize(20);
        doc.text('Destek Hesaplama Raporu', 20, 30);
        
        // Month info
        doc.setFontSize(14);
        const monthYear = `${this.turkishMonths[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
        doc.text(`Ay: ${monthYear}`, 20, 50);
        
        // Statistics
        const stats = this.calculatePayment();
        doc.setFontSize(12);
        let yPosition = 70;
        
        doc.text(`Seçilen Günler: ${stats.selectedDays}`, 20, yPosition);
        yPosition += 10;
        doc.text(`Toplam Saat: ${stats.totalHours.toFixed(1)}`, 20, yPosition);
        yPosition += 10;
        doc.text(`Ayın Çalışma Günleri: ${stats.workingDaysInMonth}`, 20, yPosition);
        yPosition += 10;
        doc.text(`Tam Desteğe Sayılan Günler: ${stats.validDaysForFull}`, 20, yPosition);
        yPosition += 20;
        
        // Payment result
        doc.setFontSize(16);
        doc.text(`Ödeme: ${stats.amount.toLocaleString('tr-TR')} TL (${stats.type})`, 20, yPosition);
        yPosition += 20;
        
        // Selected days detail
        if (this.selectedDays.size > 0) {
            doc.setFontSize(14);
            doc.text('Seçilen Günler Detayı:', 20, yPosition);
            yPosition += 15;
            
            doc.setFontSize(10);
            const sortedDays = Array.from(this.selectedDays.entries()).sort();
            
            sortedDays.forEach(([dateString, timeValue]) => {
                const date = new Date(dateString);
                const formattedDate = this.formatDateTurkish(date);
                
                // Convert decimal format to hours and minutes
                const hours = Math.floor(timeValue);
                const minutes = Math.floor((timeValue * 100) % 100);
                const totalMinutes = (hours * 60) + minutes;
                const isLowHours = totalMinutes < 450; // Less than 7 hours 30 minutes
                
                // Format time display - show only hours if minutes are 00
                const timeDisplay = minutes === 0 ? `${hours}` : `${hours}:${minutes.toString().padStart(2, '0')}`;
                
                doc.text(`${formattedDate}: ${timeDisplay} ${isLowHours ? '(Tam destek hesabına sayılmaz)' : ''}`, 20, yPosition);
                yPosition += 8;
                
                if (yPosition > 280) {
                    doc.addPage();
                    yPosition = 20;
                }
            });
        }
        
        doc.save(`ulastirma-destegi-${monthYear.replace(' ', '-')}.pdf`);
    }

    exportExcel() {
        const stats = this.calculatePayment();
        const monthYear = `${this.turkishMonths[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
        
        // Prepare data
        const worksheetData = [
            ['Türkiye Ulaştırma Desteği Raporu'],
            [''],
            ['Ay:', monthYear],
            ['Seçilen Günler:', stats.selectedDays],
            ['Toplam Saat:', stats.totalHours.toFixed(1)],
            ['Ayın Çalışma Günleri:', stats.workingDaysInMonth],
            ['Tam Desteğe Sayılan Günler:', stats.validDaysForFull],
            ['Ödeme Tutarı:', `${stats.amount.toLocaleString('tr-TR')} TL`],
            ['Ödeme Türü:', stats.type],
            [''],
            ['Seçilen Günler Detayı:'],
            ['Tarih', 'Gün', 'Saat', 'Durum']
        ];
        
        // Add selected days
        const sortedDays = Array.from(this.selectedDays.entries()).sort();
        sortedDays.forEach(([dateString, timeValue]) => {
            const date = new Date(dateString);
            const dayName = this.turkishDays[date.getDay()];
            const formattedDate = `${date.getDate()} ${this.turkishMonths[date.getMonth()]} ${date.getFullYear()}`;
            
            // Convert decimal format to hours and minutes
            const hours = Math.floor(timeValue);
            const minutes = Math.floor((timeValue * 100) % 100);
            const totalMinutes = (hours * 60) + minutes;
            
            // Format time display - show only hours if minutes are 00
            const timeDisplay = minutes === 0 ? `${hours}` : `${hours}:${minutes.toString().padStart(2, '0')}`;
            const status = totalMinutes >= 450 ? 'Geçerli' : 'Tam destek hesabına sayılmaz';
            
            worksheetData.push([formattedDate, dayName, timeDisplay, status]);
        });
        
        // Create workbook
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(worksheetData);
        
        // Style the worksheet
        ws['!cols'] = [
            { width: 25 },
            { width: 10 },
            { width: 10 },
            { width: 20 }
        ];
        
        XLSX.utils.book_append_sheet(wb, ws, 'Ulaştırma Desteği');
        XLSX.writeFile(wb, `ulastirma-destegi-${monthYear.replace(' ', '-')}.xlsx`);
    }

    // Test function for confetti (development only)
    /*
    addTestConfettiButton() {
        const testButton = document.createElement('button');
        testButton.innerHTML = '🎉 Test Confetti';
        testButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: #e74c3c;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            z-index: 1000;
            font-size: 12px;
        `;
        testButton.onclick = () => triggerConfetti();
        document.body.appendChild(testButton);
    }
    */

    // Mobile optimization setup for touch events and UX improvements
    setupMobileOptimizations() {
        const isMobile = window.innerWidth <= 768;
        const isTouch = 'ontouchstart' in window;
        
        if (isMobile || isTouch) {
            // Prevent zoom on input focus (mobile specific)
            const inputs = document.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('focus', (e) => {
                    // Add viewport meta tag modification temporarily
                    const viewport = document.querySelector('meta[name=viewport]');
                    if (viewport) {
                        const original = viewport.content;
                        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
                        
                        // Restore original viewport on blur
                        input.addEventListener('blur', () => {
                            viewport.content = original;
                        }, { once: true });
                    }
                });
            });
            
            // Enhanced touch feedback for calendar days
            const calendar = document.getElementById('calendar');
            if (calendar) {
                calendar.addEventListener('touchstart', (e) => {
                    const day = e.target.closest('.calendar-day');
                    if (day && !day.classList.contains('other-month')) {
                        day.style.transform = 'scale(0.95)';
                        day.style.opacity = '0.8';
                    }
                }, { passive: true });
                
                calendar.addEventListener('touchend', (e) => {
                    const day = e.target.closest('.calendar-day');
                    if (day && !day.classList.contains('other-month')) {
                        setTimeout(() => {
                            day.style.transform = '';
                            day.style.opacity = '';
                        }, 150);
                    }
                }, { passive: true });
            }
            
            // Optimize modals for mobile
            const modal = document.getElementById('hourModal');
            if (modal) {
                // Add mobile-specific modal behaviors
                modal.addEventListener('touchmove', (e) => {
                    // Prevent background scrolling when modal is open
                    if (modal.style.display === 'flex') {
                        e.preventDefault();
                    }
                }, { passive: false });
                
                // Enhanced touch closing for modal
                let touchStartY = 0;
                modal.addEventListener('touchstart', (e) => {
                    touchStartY = e.touches[0].clientY;
                }, { passive: true });
                
                modal.addEventListener('touchend', (e) => {
                    const touchEndY = e.changedTouches[0].clientY;
                    const diffY = touchStartY - touchEndY;
                    
                    // Allow swipe down to close modal (if swipe > 50px)
                    if (diffY < -50 && e.target === modal) {
                        this.closeModal();
                    }
                }, { passive: true });
            }
            
            // Optimize confetti for mobile performance
            this.optimizeConfettiForMobile();
            
            // Add touch-friendly quick actions
            this.setupMobileQuickActions();
            
            // Handle iOS Safari viewport height issues
            this.fixIOSViewportHeight();
        }
        
        // Add mobile navigation helpers
        this.addMobileNavigationHelpers();
        
        // Setup mobile-optimized statistics scrolling
        this.setupMobileStatsScrolling();
    }
    
    // Optimize confetti for mobile devices
    optimizeConfettiForMobile() {
        // Reduce confetti particles on mobile for better performance
        if (window.innerWidth <= 768) {
            this.mobileConfettiCount = 15; // Reduced from 25
            this.mobileConfettiDuration = 2000; // Shorter duration
        }
    }
    
    // Setup mobile-specific quick actions
    setupMobileQuickActions() {
        const selectedDaysContainer = document.querySelector('.selected-days-container');
        if (selectedDaysContainer && window.innerWidth <= 768) {
            // Add long press support for mobile edit/delete
            let longPressTimer;
            
            selectedDaysContainer.addEventListener('touchstart', (e) => {
                const dayItem = e.target.closest('.selected-day-item');
                if (dayItem) {
                    longPressTimer = setTimeout(() => {
                        // Show quick actions on long press
                        const existingActions = dayItem.querySelector('.quick-actions');
                        if (existingActions) {
                            existingActions.style.display = 'flex';
                            existingActions.style.opacity = '1';
                            
                            // Add haptic feedback if available
                            if (navigator.vibrate) {
                                navigator.vibrate(50);
                            }
                        }
                    }, 500); // Long press duration
                }
            }, { passive: true });
            
            selectedDaysContainer.addEventListener('touchend', () => {
                clearTimeout(longPressTimer);
            }, { passive: true });
            
            selectedDaysContainer.addEventListener('touchmove', () => {
                clearTimeout(longPressTimer);
            }, { passive: true });
        }
    }
    
    // Fix iOS Safari viewport height issues
    fixIOSViewportHeight() {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        if (isIOS) {
            // Handle iOS Safari viewport height changes
            const setVH = () => {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            };
            
            setVH();
            window.addEventListener('resize', setVH);
            window.addEventListener('orientationchange', () => {
                setTimeout(setVH, 100);
            });
        }
    }
    
    // Add mobile navigation helpers
    addMobileNavigationHelpers() {
        if (window.innerWidth <= 768) {
            // Add mobile-friendly month navigation
            const monthNav = document.querySelector('.month-navigation');
            if (monthNav) {
                // Add swipe support for month navigation
                let touchStartX = 0;
                let touchEndX = 0;
                
                monthNav.addEventListener('touchstart', (e) => {
                    touchStartX = e.touches[0].clientX;
                }, { passive: true });
                
                monthNav.addEventListener('touchend', (e) => {
                    touchEndX = e.changedTouches[0].clientX;
                    const diffX = touchStartX - touchEndX;
                    
                    // Swipe threshold of 50px
                    if (Math.abs(diffX) > 50) {
                        if (diffX > 0) {
                            // Swipe left - next month
                            document.getElementById('nextMonth').click();
                        } else {
                            // Swipe right - previous month
                            document.getElementById('prevMonth').click();
                        }
                    }
                }, { passive: true });
            }
        }
    }
    
    // Setup mobile-optimized statistics scrolling
    setupMobileStatsScrolling() {
        const statsGrid = document.querySelector('.stats-grid');
        if (statsGrid && window.innerWidth <= 768) {
            // Add smooth momentum scrolling for iOS
            statsGrid.style.webkitOverflowScrolling = 'touch';
            
            // Add scroll indicators for horizontal scroll
            const scrollIndicator = document.createElement('div');
            scrollIndicator.className = 'mobile-scroll-indicator';
            scrollIndicator.innerHTML = '← Kaydırın →';
            scrollIndicator.style.cssText = `
                display: none;
                text-align: center;
                color: #666;
                font-size: 12px;
                padding: 5px;
                margin-top: 5px;
            `;
            
            // Show indicator if content is scrollable
            if (statsGrid.scrollWidth > statsGrid.clientWidth) {
                scrollIndicator.style.display = 'block';
                statsGrid.parentNode.appendChild(scrollIndicator);
                
                // Hide indicator after user scrolls
                let scrollTimer;
                statsGrid.addEventListener('scroll', () => {
                    clearTimeout(scrollTimer);
                    scrollIndicator.style.opacity = '0.5';
                    
                    scrollTimer = setTimeout(() => {
                        scrollIndicator.style.display = 'none';
                    }, 2000);
                }, { passive: true });
            }
        }
    }
}

// Visitor tracking functionality
class VisitorTracker {
    constructor() {
        this.storageKey = 'transport_calc_stats';
        this.init();
    }

    init() {
        this.updateVisitorStats();
        this.updateSiteInfo();
    }

    updateVisitorStats() {
        const stats = this.getStats();
        const today = new Date().toDateString();
        
        // Update total visitors
        if (!stats.totalVisitors) {
            stats.totalVisitors = 0;
        }
        stats.totalVisitors++;
        
        // Update daily visitors
        if (!stats.dailyVisits) {
            stats.dailyVisits = {};
        }
        if (!stats.dailyVisits[today]) {
            stats.dailyVisits[today] = 0;
        }
        stats.dailyVisits[today]++;
        
        // Update last visit
        stats.lastVisit = new Date().toISOString();
        
        this.saveStats(stats);
        this.displayStats(stats, today);
    }

    getStats() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : {};
        } catch (e) {
            return {};
        }
    }

    saveStats(stats) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(stats));
        } catch (e) {
            console.warn('Unable to save visitor stats');
        }
    }

    displayStats(stats, today) {
        // Total visitors
        const totalElement = document.getElementById('totalVisitors');
        if (totalElement) {
            totalElement.textContent = stats.totalVisitors.toLocaleString('tr-TR');
        }
        
        // Daily visitors
        const dailyElement = document.getElementById('dailyVisitors');
        if (dailyElement) {
            const todayVisits = stats.dailyVisits[today] || 0;
            dailyElement.textContent = todayVisits.toLocaleString('tr-TR');
        }
    }

    updateSiteInfo() {
        // Last update
        const lastUpdateElement = document.getElementById('lastUpdate');
        if (lastUpdateElement) {
            const now = new Date();
            const formatted = now.toLocaleDateString('tr-TR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            lastUpdateElement.textContent = formatted;
        }
        
        // Deploy status (simulated)
        const deployStatusElement = document.getElementById('deployStatus');
        if (deployStatusElement) {
            // Simulate checking deployment status
            setTimeout(() => {
                deployStatusElement.textContent = 'Active';
                deployStatusElement.className = 'stat-number deploy-status';
            }, 500);
        }
    }
}

// Confetti Animation Functions - Mobile Optimized
function createConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    if (!confettiContainer) return;
    
    // Mobile optimization check
    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 15 : 25; // Reduced count for mobile
    const baseSize = isMobile ? 6 : 10; // Smaller particles on mobile
    const maxDuration = isMobile ? 2.5 : 4.5; // Shorter duration on mobile
    
    // Clear any existing confetti
    confettiContainer.innerHTML = '';
    
    // Create confetti pieces with mobile-optimized settings
    for (let i = 0; i < particleCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Add random shapes
        const shapes = ['', 'circle', 'square'];
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        if (randomShape) {
            confetti.classList.add(randomShape);
        }
        
        // Random properties for more natural effect
        const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#e67e22', '#1abc9c', '#34495e', '#e91e63', '#ff5722', '#607d8b', '#795548', '#009688', '#ff9800', '#673ab7'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomLeft = Math.random() * 100;
        const randomDelay = Math.random() * (isMobile ? 1 : 2);
        const randomDuration = 2.5 + Math.random() * (maxDuration - 2.5);
        const randomRotation = Math.random() * 360;
        const randomSize = baseSize + Math.random() * (isMobile ? 3 : 6); // Reduced size variation for mobile
        
        confetti.style.backgroundColor = randomColor;
        confetti.style.left = randomLeft + '%';
        confetti.style.animationDelay = randomDelay + 's';
        confetti.style.animationDuration = randomDuration + 's';
        confetti.style.transform = `rotate(${randomRotation}deg)`;
        confetti.style.width = randomSize + 'px';
        confetti.style.height = randomSize + 'px';
        
        // Mobile optimization: use transform3d for hardware acceleration
        if (isMobile) {
            confetti.style.transform += ' translateZ(0)';
            confetti.style.willChange = 'transform, opacity';
            confetti.style.backfaceVisibility = 'hidden';
        }
        
        // For triangles, set the border color instead
        if (randomShape === 'triangle') {
            confetti.style.borderBottomColor = randomColor;
            confetti.style.backgroundColor = 'transparent';
        }
        
        confettiContainer.appendChild(confetti);
    }
    
    // Show the confetti container
    confettiContainer.style.display = 'block';
    
    // Hide confetti after animation completes - shorter duration for mobile
    const cleanupTime = isMobile ? 3000 : 6000;
    setTimeout(() => {
        if (confettiContainer) {
            confettiContainer.style.display = 'none';
            confettiContainer.innerHTML = '';
        }
    }, cleanupTime);
}

function triggerConfetti() {
    createConfetti();
    
    // Add celebratory message to console
    console.log('🎉 Tebrikler! Ulaştırma desteği alabilirsiniz! 🎉');
    
    // Show success message with current qualification level
    showSuccessMessage();
}

function showSuccessMessage() {
    // Get current qualification level for the message
    const paymentType = document.getElementById('paymentType').textContent;
    const amount = document.getElementById('paymentAmount').textContent;
    
    let message = '';
    let gradient = '';
    
    if (paymentType === 'Tam Destek') {
        message = `🎉 Tam Destek Kazandınız! ${amount}`;
        gradient = 'linear-gradient(135deg, #f39c12, #e67e22)'; // Gold gradient for full support
    } else if (paymentType === 'Temel Destek') {
        message = `✅ Temel Destek Kazandınız! ${amount}`;
        gradient = 'linear-gradient(135deg, #2ecc71, #27ae60)'; // Green gradient for basic support
    } else {
        message = '🎉 Tebrikler! Destek alabilirsiniz!';
        gradient = 'linear-gradient(135deg, #3498db, #2980b9)'; // Blue gradient as fallback
    }
    
    // Mobile optimization check
    const isMobile = window.innerWidth <= 768;
    
    // Create a temporary success message
    const successDiv = document.createElement('div');
    successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    successDiv.style.cssText = `
        position: fixed;
        ${isMobile ? 'top: 10px; left: 10px; right: 10px;' : 'top: 20px; right: 20px;'}
        background: ${gradient};
        color: white;
        padding: ${isMobile ? '12px 16px' : '15px 20px'};
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        font-weight: 600;
        font-size: ${isMobile ? '13px' : '14px'};
        ${isMobile ? 'transform: translateY(-100px);' : 'transform: translateX(400px);'}
        transition: all 0.5s ease;
        max-width: ${isMobile ? 'none' : '300px'};
        text-align: center;
        border: 2px solid rgba(255, 255, 255, 0.2);
        ${isMobile ? 'margin: 0 auto;' : ''}
    `;
    
    document.body.appendChild(successDiv);
    
    // Add haptic feedback for mobile
    if (isMobile && navigator.vibrate) {
        navigator.vibrate([100, 50, 100]); // Success pattern
    }
    
    // Slide in animation (different for mobile)
    setTimeout(() => {
        if (isMobile) {
            successDiv.style.transform = 'translateY(0)';
        } else {
            successDiv.style.transform = 'translateX(0)';
        }
    }, 100);
    
    // Slide out and remove (shorter duration for mobile)
    const displayTime = isMobile ? 3000 : 4000;
    setTimeout(() => {
        if (isMobile) {
            successDiv.style.transform = 'translateY(-100px)';
        } else {
            successDiv.style.transform = 'translateX(400px)';
        }
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
        }, 500);
    }, displayTime);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new TransportSupportCalculator();
    new VisitorTracker();
});
