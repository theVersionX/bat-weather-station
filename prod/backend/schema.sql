
//databases and tables------------------------------------------

use avuwaker_exoProductions;

create table weather_station_data_tbl (
  id bigint AUTO_INCREMENT PRIMARY KEY,
  timestamp timestamp,
  pressure float,
  temperature int,
  windSpeed int,
  humidity int,
  precipitation float
);

create table weather_station_hardware_tbl (
  id varchar(50) PRIMARY KEY,
  hardware mediumtext
);

create table weather_station_wind_warning_tbl(
    id bigint AUTO_INCREMENT PRIMARY KEY,
    timestamp timestamp,
    isCritical boolean
);

//triggers---------------------------------------------------------
//Trigger auf weather_station_data_tbl erstellen (AFTER INSERT)

INSERT INTO weather_station_wind_warning_tbl (windSpeed,isCritical, timestamp)
VALUES (NEW.windSpeed, CASE WHEN NEW.windSpeed > 50 THEN true ELSE false END, NOW())
