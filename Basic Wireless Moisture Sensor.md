#engineering
# Requirements
- [Arduino Uno WIFI](https://www.reichelt.at/at/de/shop/produkt/arduino_uno_rev4_wifi_ra4m1_esp32-s3-353108?PROVID=2807&q=/at/de/shop/arduino-uno-rev4-wifi-ra4m1-esp32-s3-ard-uno-r4-wifi-p353108.html) 25€
- instead: esp8266 or esp32 6€
- [Raspberry Pi](https://www.reichelt.at/at/de/shop/produkt/raspberry_pi_4_b_4x_1_5_ghz_1_gb_ram_wlan_bt-259874?PROVID=2807&q=/at/de/shop/raspberry-pi-4-b-4x-1-5-ghz-1-gb-ram-wlan-bt-rasp-pi-4-b-1gb-p259874.html#open-modal-image-big-slider) 40€
- [Capacitor Moisture Sensor](https://www.reichelt.at/at/de/shop/produkt/entwicklerboards_-_feuchtesensor_bodenfeuchte_-223620?PROVID=2807&q=/at/de/shop/entwicklerboards-feuchtesensor-bodenfeuchte--debo-cap-sens-p223620.html) 3€
- [Router](https://www.mediamarkt.at/de/product/_tp-link-tl-sf1005d-netzwerk-switch-5port-1179045.html) 10€
- [Extra Cables](https://www.berrybase.at/kabel-mit-jst-xh-2.54mm-steckverbinder-awg26-20cm?sPartner=g_shopping_at) 0.33€
Cost: ~78.33€

```
[ Solar Panel ]
     | 
     V
[TP4056 (charge controller)] <-> [Battery]
     |
     V
[Boost Converter (MT3608)]
     |
     V
[Micro-USB to ESP32]

```

# Plan
### Phase 1
Build the ESP32 + moisture sensor setup and power it via micro-usb, run the server on my pc or my home server.
![[esp32pins.png]]
### Phase 2
Build the solar to battery setup and use it to power the ESP32
### Phase 3
Switch the server to a raspberry pi with a similar / identical solar setup and figure out long distance data transfer.