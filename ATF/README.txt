client-
npm install --save react react-router-dom axios @progress/kendo-react-excel-export moment react-datepicker jwt-decode prop-types history react-dom



server
npm install --save nodemon express express-session body-parser cors cookie-parser jsonwebtoken cookies fs md5 dotenv



--
-- Tablo için tablo yapısı `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `username` varchar(32) NOT NULL,
  `password` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(32) NOT NULL,
  `yetki` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `talepler`
--

CREATE TABLE `talepler` (
  `id` int(11) NOT NULL,
  `talepEden` varchar(32) DEFAULT NULL,
  `projeAdi` varchar(32) DEFAULT NULL,
  `projeSorumlusu` varchar(32) NOT NULL,
  `urunAdi` varchar(32) DEFAULT NULL,
  `urunAciklama` varchar(100) NOT NULL,
  `birimFiyat` double(11,2) NOT NULL,
  `adet` int(11) NOT NULL,
  `toplamFiyat` double(11,2) NOT NULL,
  `kayitTarihi` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `teslimTarihi` varchar(32) NOT NULL,
  `link` varchar(500) NOT NULL,
  `durum` tinyint(1) NOT NULL DEFAULT '1',
  `onay` tinyint(1) NOT NULL DEFAULT '0',
  `onaylayan` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Tablo için indeksler `talepler`
--
ALTER TABLE `talepler`
  ADD PRIMARY KEY (`id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `talepler`
--
ALTER TABLE `talepler`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



# Build Alma

client ve server için npm install komutu çalıştırılır

client build alma

npm run build

build klasörü ismi public olarak değiştirilir

server build alma

webpack ve webpack-cli yüklenir

client/public klasörü server/public'e taşınır

ardından webpack komutu çalıştırılır.

.env dosyası düzenlenip server/dist içerisine atılır

server/dist/index.js çalıştırılır




ADMIN USER
username : admin
password : admin