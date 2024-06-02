#include <WiFi.h>
#include <WebServer.h>
#include <ArduinoJson.h>

#define RELAY            4   
#define RED_LED          27   //D27
#define GREEN_LED        26   //D34

const char* ssid = "HotTea";     // Replace with your network SSID (name)
const char* password = "000000CA90"; // Replace with your network password

WebServer server(80);

void setup() {
  Serial.begin(9600);
  pinMode(RELAY, OUTPUT);
  pinMode(RED_LED, OUTPUT);
  pinMode(GREEN_LED, OUTPUT);
  
  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nConnected to Wi-Fi");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  // Start the server
  server.begin();
  Serial.println("Server started");

  // Define routes
  server.on("/", HTTP_GET, handleRoot);
  server.on("/status", HTTP_GET, handleStatus);
  server.on("/relay", HTTP_POST, handleRelay);
  server.on("/led", HTTP_POST, handleLED);
  
  // Handle not found
  server.onNotFound(handleNotFound);

  // Default values
  digitalWrite(GREEN_LED, HIGH);
  digitalWrite(RED_LED, LOW);
  digitalWrite(RELAY, HIGH);
}

void loop() {
  server.handleClient();
}

void handleRoot() {
  server.send(200, "text/plain", "Welcome to the Relay and LED control server!");
}

void handleStatus() {
  StaticJsonDocument<200> jsonDoc;
  jsonDoc["relay"] = digitalRead(RELAY) == LOW ? "lock" : "unlock";
  jsonDoc["led"] = digitalRead(GREEN_LED) == HIGH ? "avail" : "unavail";
  String response;
  serializeJson(jsonDoc, response);
  server.send(200, "application/json", response);
}

void handleRelay() {
  if (server.hasArg("plain") == false) { // Check if body received
    server.send(400, "application/json", "{\"error\":\"No body received\"}");
    return;
  }

  StaticJsonDocument<200> jsonDoc;
  DeserializationError error = deserializeJson(jsonDoc, server.arg("plain"));
  if (error) {
    server.send(400, "application/json", "{\"error\":\"Invalid JSON\"}");
    return;
  }

  if (jsonDoc.containsKey("relay")) {
    if (jsonDoc["relay"] == "unlock") {
      digitalWrite(RELAY, LOW);
      server.send(200, "application/json", "{\"status\":\"Relay opened\"}");
    } else if (jsonDoc["relay"] == "lock") {
      digitalWrite(RELAY, HIGH);
      server.send(200, "application/json", "{\"status\":\"Relay closed\"}");
    } else {
      server.send(400, "application/json", "{\"error\":\"Invalid relay state\"}");
    }
  } else {
    server.send(400, "application/json", "{\"error\":\"Relay state not specified\"}");
  }
}

void handleLED() {
  if (server.hasArg("plain") == false) { // Check if body received
    server.send(400, "application/json", "{\"error\":\"No body received\"}");
    return;
  }

  StaticJsonDocument<200> jsonDoc;
  DeserializationError error = deserializeJson(jsonDoc, server.arg("plain"));
  if (error) {
    server.send(400, "application/json", "{\"error\":\"Invalid JSON\"}");
    return;
  }

  if (jsonDoc.containsKey("led")) {
    if (jsonDoc["led"] == "avail") {
      digitalWrite(GREEN_LED, HIGH);
      digitalWrite(RED_LED, LOW);
      server.send(200, "application/json", "{\"status\":\"LED set to avail\"}");
    } else if (jsonDoc["led"] == "unavail") {
      digitalWrite(GREEN_LED, LOW);
      digitalWrite(RED_LED, HIGH);
      server.send(200, "application/json", "{\"status\":\"LED set to unavail\"}");
    } else {
      server.send(400, "application/json", "{\"error\":\"Invalid LED state\"}");
    }
  } else {
    server.send(400, "application/json", "{\"error\":\"LED state not specified\"}");
  }
}

void handleNotFound() {
  server.send(404, "text/plain", "Not Found");
}
