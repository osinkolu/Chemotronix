//.........................The Chemotron V1 source code..............................................................................
//Author: Olufemi Victor Tolulope in Team Chemotronix
//Reach out on linkedIn https://www.linkedin.com/in/olufemi-victor-tolulope/

#include <ESP8266WiFi.h> //wifi library is needed
#include "CO2Sensor.h" // download co2sensor library from https://content.instructables.com/ORIG/FLJ/CVDP/K6HPDU8R/FLJCVDPK6HPDU8R.ino
#define MQ9_Digital D0 //Define port D0 for the MQ9 sensor
#define co2 D1 //Just in case you'll like to check out digital values of the Co2 sensor


CO2Sensor co2Sensor(A0, 0.99, 10); // Use library to average sensor readings.

String apiKey = "1WWUCY43PGCWMX8J"; // Enter your Write API key from ThingSpeak
const char *ssid = "Professor"; // replace with your wifi ssid.
const char *pass = "Professor"; //replace with your wifi password
const char* server = "api.thingspeak.com"; // We're using the thingspeak server


// ...........................Connecting to WiFi....................................................................

WiFiClient client;

void setup()
{
Serial.begin(115200); // The Baud rate for reading serial monitor
delay(500);
Serial.println("=== Initialized ===");
delay(500);

pinMode(MQ9_Digital,INPUT); //Set Pins as Inputs
pinMode(co2,INPUT);
delay(500);
Serial.println("Connecting to ");
Serial.println(ssid);
WiFi.begin(ssid, pass);
while (WiFi.status() != WL_CONNECTED)
{
delay(500);
Serial.print(".");
}
Serial.println("");
Serial.println("WiFi connected");
delay(500);

//.............................................READ SENSOR VALUES.................................................................................
co2Sensor.calibrate();// Use the Library to Caliberate the sensor

Serial.println("Sensor Caliberated Successfully");
}
void loop()
{
//delay(5000);
float h = analogRead(A0); //Raw analog value of the co2 sensor
delay(500);
int val = co2Sensor.read(); //Using the library to read the Co2 sensor.
delay(500);

int mq9_sensor = digitalRead(MQ9_Digital); //Digital value for CO sensor(MQ9)
delay(500);
int co2_sensor = digitalRead(co2); //Digital value for CO2 sensor(MG811)
if (isnan(val))
{
Serial.println("Failed to read from CO2 sensor!");
return;
}

//..................................................Connecting to Thingspeak.......................................................................................
 
if (client.connect(server, 80)) // "184.106.153.149" or api.thingspeak.com
{
String postStr = apiKey; //Make Sure You write To your Own API key.
postStr += "&field1=";
postStr += String(val);
postStr += "&field2=";
postStr += String(mq9_sensor);
postStr += "&field3=";
postStr += String(co2_sensor);
client.print("POST /update HTTP/1.1\n");
client.print("Host: api.thingspeak.com\n");
client.print("Connection: close\n");
client.print("X-THINGSPEAKAPIKEY: " + apiKey + "\n");
client.print("Content-Type: application/x-www-form-urlencoded\n");
client.print("Content-Length: ");
client.print(postStr.length());
client.print("\n\n");
client.print(postStr);

//......................................................SERIAL MONITORING..........................................................................................
Serial.print("Readings from the Mg811 sensor: ");
Serial.println(val);
Serial.print("Readings from the Mq9 sensor: ");
Serial.println(mq9_sensor);
Serial.print("raw Readings from the Mg811 sensor: ");
Serial.println(h);
Serial.print("Digital Readings from the co2 sensor: ");
Serial.println(co2_sensor);
Serial.println("Data Send to Thingspeak");
}
delay(500);
client.stop();
Serial.println("Waiting...");
 
// thingspeak needs minimum 15 sec delay between updates.
delay(1500);
}
