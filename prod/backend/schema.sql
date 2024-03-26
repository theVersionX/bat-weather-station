use avuwaker_exoProductions;

create table weather_station_data_tbl (
  id bigint AUTO_INCREMENT PRIMARY KEY,
  timestamp timestamp,
  pressure int,
  temperature int,
  windStrength int,
  humidity int,
  precipitation int
);

create table weather_station_antennas_tbl (
  id bigint AUTO_INCREMENT PRIMARY KEY,
  antenna mediumtext
);