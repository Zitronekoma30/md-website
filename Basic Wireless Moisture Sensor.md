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
Then there will be a raspberry pi running a python script taking all of that data and serving it in a nice web UI.
# Plan
### Phase 1
Build the ESP32 + moisture sensor setup and power it via micro-usb, run the server on my pc or my home server.

These are the pins on the ESP32:
![[esp32pins.png|500]]

currently the setup looks like this:
![[esp32.png|250]]

All it does at the moment is register itself to a server (at this point my desktop pc) and then transmit it's data live, here's the code running on the esp to do accomplish this:
```C++
#include <WiFi.h>
#include <Preferences.h>

const int moisturePin = 34; // Update to GPIO13
const int ledPin = 2;
const int wateringThresh = 1600;
const int sampleInterval = 100;



const char * wifi_ssid = "Local Router";
const char * wifi_password = "******";
const int port = 4210;

WiFiUDP udp;
IPAddress serverIp;
Preferences preferences;

int espId = 0;

enum State {
    SETUP,
    READ,
    TRANSMIT,
};

State state;

void setup() {
    // Set up ports and serial
    Serial.begin(115200);
    while (!Serial);
    preferences.begin("storage", true); // open in read mode
    espId = preferences.getInt("espId", -1);
    if (espId == -1) {
        state = SETUP;
    } else {
        state = SETUP;
    }
    preferences.end();
    
    delay(1000);
    pinMode(moisturePin, INPUT);
    pinMode(ledPin, OUTPUT);
    
    // Wifi setup
    Serial.print("Connecting to Wifi");
    WiFi.begin(wifi_ssid, wifi_password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    
    Serial.print("\nConnected successfully!");
    udp.begin(port);
    
    if (state == SETUP) {
        // broadcast identification
        udp.beginPacket(IPAddress(255, 255, 255, 255), port);
        udp.print("ESP32_MOISTURE_SENSOR_BROADCAST");
        udp.endPacket();
        Serial.print("Broadcast message sent");
    }
}



void loop() {
    if (state == SETUP) {
        char packet[255];
        int packetSize = udp.parsePacket();
        
        if (packetSize) {
            udp.read(packet, 255);
            sscanf(packet, "%d,%u.%u.%u.%u", & espId, & serverIp[0], & serverIp[1], & serverIp[2], & serverIp[3]);
            
            String serverString;
            sscanf(packet, "%*[^,],%15s", serverString);
            
            preferences.begin("storage", false); // open in read-write mode
            preferences.putInt("espId", espId);
            preferences.putString("serverIp", serverString);
            preferences.end();
            Serial.print("Received IP: ");
            Serial.print(serverIp);
            Serial.print("\nAssigned ID: ");
            Serial.print(espId);
            state = READ;
        }
    }
    if (state == READ) {
        int moistureLevel = analogRead(moisturePin);
        String data = String(espId) + "," + String(moistureLevel);
        
        // send data
        udp.beginPacket(serverIp, port);
        udp.print(data);
        udp.endPacket();
        delay(sampleInterval);
    }
}
```

The server registers any connecting esps as follows:
```python
import socket
import time
import matplotlib.pyplot as plt
import matplotlib.animation as animation
import threading

broadcast_port = 4210
buffer_size = 1024
esp_id = 1  # ID to assign to each ESP

sensors = {}
moisture_data = {}

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind(("", broadcast_port))
sock.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)

def listen_for_data():
    global esp_id
    print("Listening for ESP32 broadcast...")

    while True:
        data, addr = sock.recvfrom(buffer_size)
        message = data.decode()

        if message == "ESP32_MOISTURE_SENSOR_BROADCAST":
            print(f"ESP32 broadcast received from {addr}")
            pc_ip = socket.gethostbyname(socket.gethostname())
            response_message = f"{esp_id},{pc_ip}"

            if addr in sensors.values():
                # If the ESP is already known, send its ID and IP
                for esp_id, esp_addr in sensors.items():
                    if esp_addr == addr:
                        response_message = f"{esp_id},{pc_ip}"
                        break
            else:
                sensors[esp_id] = addr
                moisture_data[esp_id] = {}
                esp_id += 1

            sock.sendto(response_message.encode(), addr)
            print(f"Sent IP and ID to ESP32: {response_message}")
        elif addr in sensors.values(): # If the message is from a known ESP, record its moisture level
            esp_id_received, moisture_level = message.split(',')
            moisture_level = int(moisture_level)
            timestamp = time.time()
            
            # Update moisture data with timestamp for this ESP ID
            if esp_id_received not in moisture_data:
                moisture_data[esp_id_received] = {}
            moisture_data[esp_id_received][timestamp] = moisture_level
            
            print(f"ESP ID {esp_id_received} - Moisture Level: {moisture_level}")

# Start data listener thread
data_thread = threading.Thread(target=listen_for_data, daemon=True)
data_thread.start()

# Plot setup
fig, ax = plt.subplots()
ax.set_title("Real-Time Moisture Levels")
ax.set_xlabel("Time")
ax.set_ylabel("Moisture Level")

lines = {}

def update_plot(frame):
    current_time = time.time()

    for esp_id, data in moisture_data.items():
        # Get timestamps and values within the last 5 minutes
        recent_data = {t: v for t, v in data.items() if current_time - t < 300}

        if not recent_data:
            continue

        # Extract sorted timestamps and values
        times = list(recent_data.keys())
        values = list(recent_data.values())

        # Convert timestamps to relative times for plotting
        times = [t - times[0] for t in times]

        # If ESP line doesn't exist, create it
        if esp_id not in lines:
            (line,) = ax.plot(times, values, label=f"ESP {esp_id}")
            lines[esp_id] = line
            ax.legend()
        else:
            # Update existing line
            lines[esp_id].set_data(times, values)
            
        ax.set_xlim(0, max(60, max(times)))  # Minimum 60s view or max data time
        ax.set_ylim(0, max(3000, max(values)))  # Adjust Y-axis as needed
    return lines.values()

ani = animation.FuncAnimation(fig, update_plot, blit=True, interval=1000)
plt.show()
```
This results in a nice live graph, in the future I'd like to server this in a nice web UI for easy access but for testing this will do. I'll add an image
### Phase 2
Build the solar to battery setup and use it to power the ESP32.
### Phase 3
Switch the server to a raspberry pi with a similar / identical solar setup and figure out long distance data transfer.