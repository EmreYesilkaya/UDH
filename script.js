class TransportSupportCalculator {
    constructor() {
        this.currentDate = new Date(2025, 4, 1); // May 2025
        this.selectedDays = new Map(); // date string -> hours
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
    }

    generateHolidays() {
        const holidays = new Map();
        
        // Fixed holidays for multiple years
        for (let year = 2024; year <= 2026; year++) {
            holidays.set(`${year}-01-01`, 'Yılbaşı');
            holidays.set(`${year}-04-23`, 'Ulusal Egemenlik ve Çocuk Bayramı');
            holidays.set(`${year}-05-01`, 'Emek ve Dayanışma Günü');
            holidays.set(`${year}-05-19`, 'Atatürk\'ü Anma, Gençlik ve Spor Bayramı');
            holidays.set(`${year}-07-15`, '15 Temmuz Demokrasi ve Milli Birlik Günü');
            holidays.set(`${year}-08-30`, 'Zafer Bayramı');
            holidays.set(`${year}-10-29`, 'Cumhuriyet Bayramı');
        }
        
        // Religious holidays (approximate dates)
        // Ramazan Bayramı
        holidays.set('2024-04-10', 'Ramazan Bayramı 1. Gün');
        holidays.set('2024-04-11', 'Ramazan Bayramı 2. Gün');
        holidays.set('2024-04-12', 'Ramazan Bayramı 3. Gün');
        holidays.set('2025-03-31', 'Ramazan Bayramı 1. Gün');
        holidays.set('2025-04-01', 'Ramazan Bayramı 2. Gün');
        holidays.set('2025-04-02', 'Ramazan Bayramı 3. Gün');
        holidays.set('2026-03-20', 'Ramazan Bayramı 1. Gün');
        holidays.set('2026-03-21', 'Ramazan Bayramı 2. Gün');
        holidays.set('2026-03-22', 'Ramazan Bayramı 3. Gün');
        
        // Kurban Bayramı
        holidays.set('2024-06-16', 'Kurban Bayramı 1. Gün');
        holidays.set('2024-06-17', 'Kurban Bayramı 2. Gün');
        holidays.set('2024-06-18', 'Kurban Bayramı 3. Gün');
        holidays.set('2024-06-19', 'Kurban Bayramı 4. Gün');
        holidays.set('2025-06-06', 'Kurban Bayramı 1. Gün');
        holidays.set('2025-06-07', 'Kurban Bayramı 2. Gün');
        holidays.set('2025-06-08', 'Kurban Bayramı 3. Gün');
        holidays.set('2025-06-09', 'Kurban Bayramı 4. Gün');
        holidays.set('2026-05-27', 'Kurban Bayramı 1. Gün');
        holidays.set('2026-05-28', 'Kurban Bayramı 2. Gün');
        holidays.set('2026-05-29', 'Kurban Bayramı 3. Gün');
        holidays.set('2026-05-30', 'Kurban Bayramı 4. Gün');
        
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
        const isSelected = this.selectedDays.has(dateString);
        
        if (isOtherMonth) {
            dayElement.classList.add('other-month');
        } else if (isHoliday) {
            dayElement.classList.add('holiday', 'tooltip');
            dayElement.setAttribute('data-tooltip', this.holidays.get(dateString));
        } else if (isWeekend) {
            dayElement.classList.add('weekend');
        } else {
            dayElement.classList.add('working-day');
            dayElement.addEventListener('click', () => this.selectDay(date));
        }

        if (isSelected) {
            dayElement.classList.add('selected');
            const hours = this.selectedDays.get(dateString);
            if (hours < 7.5) {
                dayElement.classList.add('low-hours');
            }
            dayElement.innerHTML = `
                <div>${date.getDate()}</div>
                <div class="hours">${hours}s</div>
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
            this.openModal(date, 8); // Default 8 hours
        }
    }

    openModal(date, currentHours = 8) {
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
        const hours = parseFloat(document.getElementById('hoursInput').value);
        
        console.log('Saving hours:', hours, 'Type:', typeof hours);
        
        if (isNaN(hours) || hours < 0 || hours > 24) {
            alert('Lütfen 0-24 arasında geçerli bir saat değeri girin.');
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
        const totalHours = Array.from(this.selectedDays.values()).reduce((sum, hours) => sum + hours, 0);
        const workingDaysInMonth = this.getWorkingDaysInMonth();
        const validDaysForFull = Array.from(this.selectedDays.values()).filter(hours => hours >= 7.5).length;
        const hasLowHours = Array.from(this.selectedDays.values()).some(hours => hours < 7.5);
        
        // Calculate required days for full support (half of working days in month)
        const requiredDaysForFull = Math.ceil(workingDaysInMonth / 2);

        // Debug logging
        console.log('Debug Payment Calculation:');
        console.log('Selected days:', selectedDays);
        console.log('All hours:', Array.from(this.selectedDays.values()));
        console.log('Valid days for full (>=7.5):', validDaysForFull);
        console.log('Has low hours (<7.5):', hasLowHours);
        console.log('Working days in month:', workingDaysInMonth);
        console.log('Required days for full support:', requiredDaysForFull);

        // Basic support criteria: 4+ days AND 30+ hours
        const meetsBasicCriteria = selectedDays >= 4 && totalHours >= 30;
        
        // Full support criteria: half of month's working days with 7.5+ hours each
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
            workingDaysInMonth,
            validDaysForFull,
            hasLowHours,
            requiredDaysForFull
        };
    }

    updateStats() {
        const stats = this.calculatePayment();
        
        // Update statistics
        document.getElementById('selectedDays').textContent = stats.selectedDays;
        document.getElementById('totalHours').textContent = stats.totalHours.toFixed(1);
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

        this.updateSelectedDaysDisplay();
    }

    updateSelectedDaysDisplay() {
        const container = document.getElementById('selectedDaysDetail');
        
        if (this.selectedDays.size === 0) {
            container.innerHTML = '<p class="no-selection">Henüz gün seçilmedi</p>';
            return;
        }

        const sortedDays = Array.from(this.selectedDays.entries()).sort();
        
        container.innerHTML = sortedDays.map(([dateString, hours]) => {
            const date = new Date(dateString);
            const formattedDate = this.formatDateTurkish(date);
            const isLowHours = hours < 7.5;
            
            return `
                <div class="selected-day-item ${isLowHours ? 'low-hours' : ''}">
                    <div class="day-date">${formattedDate}</div>
                    <div class="day-hours">${hours} saat ${isLowHours ? '(Tam destek hesabına sayılmaz)' : ''}</div>
                </div>
            `;
        }).join('');
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
            
            sortedDays.forEach(([dateString, hours]) => {
                const date = new Date(dateString);
                const formattedDate = this.formatDateTurkish(date);
                const isLowHours = hours < 7.5;
                
                doc.text(`${formattedDate}: ${hours} saat ${isLowHours ? '(Tam destek hesabına sayılmaz)' : ''}`, 20, yPosition);
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
        sortedDays.forEach(([dateString, hours]) => {
            const date = new Date(dateString);
            const dayName = this.turkishDays[date.getDay()];
            const formattedDate = `${date.getDate()} ${this.turkishMonths[date.getMonth()]} ${date.getFullYear()}`;
            const status = hours >= 7.5 ? 'Geçerli' : 'Tam destek hesabına sayılmaz';
            
            worksheetData.push([formattedDate, dayName, hours, status]);
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

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new TransportSupportCalculator();
    new VisitorTracker();
});
