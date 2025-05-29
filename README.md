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
