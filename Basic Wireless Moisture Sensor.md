#engineering
# Requirements
- instead: esp8266 or esp32 6€
- [Raspberry Pi](https://www.reichelt.at/at/de/shop/produkt/raspberry_pi_4_b_4x_1_5_ghz_1_gb_ram_wlan_bt-259874?PROVID=2807&q=/at/de/shop/raspberry-pi-4-b-4x-1-5-ghz-1-gb-ram-wlan-bt-rasp-pi-4-b-1gb-p259874.html#open-modal-image-big-slider) 40€
- [Capacitor Moisture Sensor](https://www.reichelt.at/at/de/shop/produkt/entwicklerboards_-_feuchtesensor_bodenfeuchte_-223620?PROVID=2807&q=/at/de/shop/entwicklerboards-feuchtesensor-bodenfeuchte--debo-cap-sens-p223620.html) 3€
- [Router](https://www.mediamarkt.at/de/product/_tp-link-tl-sf1005d-netzwerk-switch-5port-1179045.html) 10€
- [Extra Cables](https://www.berrybase.at/kabel-mit-jst-xh-2.54mm-steckverbinder-awg26-20cm?sPartner=g_shopping_at) 0.33€
- TBA
# Construction
The basic idea is as follows:
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
Then there will be a raspberry pi running a python script taking all of that data and serving it in a web UI.
# Plan
### Phase 1
Build the ESP32 + moisture sensor setup and power it via micro-usb, run the server on my pc or my home server.

These are the pins on the ESP32:

![[esp32pins.png|500]]

currently the setup looks like this:

![[esp32.png|250]]

All it does at the moment is register itself to a server (at this point my desktop pc) and then transmit it's data live.

This results in a nice live graph, in the future I'd like to serve this in a nice web UI for easy access but for testing this will do. Code will be on my Github soon.
### Phase 2
Build the solar to battery setup and use it to power the ESP32.
### Phase 3
Switch the server to a raspberry pi with a similar / identical solar setup and figure out long distance data transfer.