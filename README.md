# 🚛 UDH - Ulaştırma Desteği Hesaplama

[![Deploy to GitHub Pages](https://github.com/EmreYesilkaya/UDH/actions/workflows/deploy.yml/badge.svg)](https://github.com/EmreYesilkaya/UDH/actions/workflows/deploy.yml)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://emreyesilkaya.github.io/UDH/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Modern ve kullanıcı dostu bir ulaştırma desteği hesaplama uygulaması. Çalışma günlerinizi seçin, saatlerinizi girin ve otomatik olarak destek miktarınızı hesaplayın.

## 🌟 Özellikler

- **📅 İnteraktif Takvim**: Çalışma günlerinizi kolayca seçin
- **⏰ Saat Girişi**: Her gün için çalıştığınız saatleri girin
- **💰 Otomatik Hesaplama**: Ulaştırma desteği miktarını otomatik hesaplayın
- **📊 İstatistikler**: Toplam çalışma günü, saat ve kazanç bilgileri
- **📄 PDF Export**: Hesaplamalarınızı PDF olarak indirin
- **📋 Excel Export**: Verilerinizi Excel formatında dışa aktarın
- **🎨 Modern Tasarım**: Responsive ve kullanıcı dostu arayüz
- **🇹🇷 Türkiye Tatilleri**: Resmi tatil günleri otomatik olarak işaretlenir

## 📅 2025 Resmi Tatiller (Turuncu Alanlar)

**Toplam: 27 Gün**

**Ocak:**
1. **1 Ocak (Çarşamba)** – Yılbaşı

**Mart:**
29. **29 Mart (Cumartesi)** – Resmi Tatil
30. **30 Mart (Pazar)** – Resmi Tatil  
31. **31 Mart (Pazartesi)** – Resmi Tatil

**Nisan:**
1. **1 Nisan (Salı)** – Resmi Tatil
2. **2 Nisan (Çarşamba)** – Resmi Tatil
3. **3 Nisan (Perşembe)** – Resmi Tatil
4. **4 Nisan (Cuma)** – Resmi Tatil
23. **23 Nisan (Çarşamba)** – Ulusal Egemenlik ve Çocuk Bayramı

**Mayıs:**
1. **1 Mayıs (Perşembe)** – Emek ve Dayanışma Günü
2. **2 Mayıs (Cuma)** – Resmi Tatil
19. **19 Mayıs (Pazartesi)** – Atatürk'ü Anma, Gençlik ve Spor Bayramı

**Haziran:**
5. **5 Haziran (Perşembe)** – Resmi Tatil
6. **6 Haziran (Cuma)** – Resmi Tatil
7. **7 Haziran (Cumartesi)** – Resmi Tatil
8. **8 Haziran (Pazar)** – Resmi Tatil
9. **9 Haziran (Pazartesi)** – Resmi Tatil

**Temmuz:**
14. **14 Temmuz (Pazartesi)** – Resmi Tatil
15. **15 Temmuz (Salı)** – 15 Temmuz Demokrasi ve Milli Birlik Günü
16. **16 Temmuz (Çarşamba)** – Resmi Tatil
17. **17 Temmuz (Perşembe)** – Resmi Tatil
18. **18 Temmuz (Cuma)** – Resmi Tatil

**Ağustos:**
18. **18 Ağustos (Pazartesi)** – Resmi Tatil
19. **19 Ağustos (Salı)** – Resmi Tatil
20. **20 Ağustos (Çarşamba)** – Resmi Tatil
21. **21 Ağustos (Perşembe)** – Resmi Tatil
22. **22 Ağustos (Cuma)** – Resmi Tatil
30. **30 Ağustos (Cumartesi)** – Zafer Bayramı

**Ekim:**
27. **27 Ekim (Pazartesi)** – Resmi Tatil
28. **28 Ekim (Salı)** – Resmi Tatil
29. **29 Ekim (Çarşamba)** – Cumhuriyet Bayramı

## 🚀 Canlı Demo

🌐 **[UDH - Ulaştırma Desteği Hesaplama](https://emreyesilkaya.github.io/UDH/)**

Uygulamayı canlı olarak test etmek için yukarıdaki linke tıklayın!

## 📱 Ekran Görüntüleri

![Ana Sayfa](screenshots/main.png)
*Ana sayfa görünümü*

![Takvim](screenshots/calendar.png)
*İnteraktif takvim*

![Hesaplama](screenshots/calculation.png)
*Hesaplama sonuçları*

## 🛠️ Teknolojiler

- **HTML5**: Semantik yapı
- **CSS3**: Modern tasarım ve animasyonlar
- **Vanilla JavaScript**: Dinamik fonksiyonalite
- **jsPDF**: PDF oluşturma
- **SheetJS**: Excel export
- **Font Awesome**: İkonlar

## 📋 Kurulum

1. Repository'yi klonlayın:
```bash
git clone https://github.com/EmreYesilkaya/UDH.git
```

2. Proje dizinine gidin:
```bash
cd UDH
```

3. Dosyaları bir web sunucusunda çalıştırın:
```bash
# Python 3 ile
python -m http.server 8000

# Node.js ile (http-server gerekli)
npx http-server

# PHP ile
php -S localhost:8000
```

4. Tarayıcınızda `http://localhost:8000` adresine gidin

## 📖 Kullanım

1. **Takvim Navigasyonu**: Ay butonlarını kullanarak istediğiniz aya gidin
2. **Gün Seçimi**: Çalıştığınız günlere tıklayın
3. **Saat Girişi**: Açılan popup'ta çalıştığınız saatleri girin
4. **Hesaplama**: Otomatik olarak hesaplanan sonuçları görün
5. **Export**: PDF veya Excel olarak sonuçları indirin

## 💡 Özellik Detayları

### Takvim Özellikleri
- Türkiye resmi tatilleri otomatik işaretlenir
- Hafta sonları farklı renkte gösterilir
- Seçili günler vurgulanır
- Ay navigasyonu

### Hesaplama Sistemi
- Günlük ulaştırma desteği: 25 TL
- Minimum çalışma saati kontrolü
- Otomatik toplam hesaplama

### Export Özellikleri
- PDF raporu oluşturma
- Excel tablosu oluşturma
- Detaylı çalışma kayıtları

## 🎨 Tasarım Özellikleri

- Gradient arkaplan
- Hover efektleri
- Smooth animasyonlar
- Responsive tasarım
- Modern UI/UX

## 📱 Responsive Tasarım

Uygulama tüm cihazlarda mükemmel çalışır:
- 🖥️ Desktop
- 💻 Laptop
- 📱 Tablet
- 📱 Mobile

## 🔧 Geliştirme

### Proje Yapısı
```
UDH/
├── .github/workflows/
│   ├── deploy.yml                    # GitHub Pages deployment
│   └── deploy-backup.yml.disabled    # Backup deployment method
├── index.html                        # Ana HTML dosyası
├── styles.css                        # CSS stilleri
├── script.js                         # JavaScript kodu
├── README.md                         # Proje dokümantasyonu
├── DEPLOYMENT.md                     # Deployment troubleshooting
└── LICENSE                           # Lisans dosyası
```

### Deployment
Proje GitHub Actions ile otomatik olarak deploy edilir. Deployment sorunları için `DEPLOYMENT.md` dosyasına bakın.

### Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'i push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👨‍💻 Geliştirici

**Emre Yeşilkaya**
- 🔗 [LinkedIn](https://www.linkedin.com/in/emregit/)
- 🐙 [GitHub](https://github.com/EmreYesilkaya)
- ✍️ [Medium](https://medium.com/@emregithub)

## 🙏 Teşekkürler

- Font Awesome ikonları için
- jsPDF ve SheetJS kütüphaneleri için
- Tüm katkıda bulunanlar için

## 📧 İletişim

Sorularınız veya önerileriniz için benimle iletişime geçebilirsiniz:
- 📧 Email: [email@example.com]
- 💼 LinkedIn: [LinkedIn Profile]

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın! 
