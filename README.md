# bat-weather-station

## How To setup Project

1. install latest Angular cli (https://angular.io/guide/setup-local)
2. Download Project from Github
3. navigate to prod/frontend
4. run "npm install"
5. run "ng serve"
6. Open Browser, go to http://localhost:4200/

## Projekt Weiterentwickeln

### GUI Projekt Struktur erweitern
- Neue Seite erstellen: 
    - cd prod/frontend
    - ng g c pages/new-page-name
    - Seitenname in shared/data/page-consts.ts hinzufügen
    - Page-const in pages Array in services/navigation.service.ts hinzufügen
    - Seite in app.routes.ts hinzufügen
- Neue Klasse für Berechnung erstellen in src/app/pages/home/calculations/new-class.ts
- Interfaces
    - Neue Interfaces in shared/interfaces/
- API zu Datenbank erweitern:
    - PHP API ist im Ordner backend aufzufinden. Siehe database-shared.php für weitere Schritte.
    - api-service.ts in services/api-service-ts übernimmt POST-Requests für Daten senden & empfangen

### Service erweitern
- Im C# Projekt WeatherServiceSolution ist ein Windows Service enthalten, der Periodisch alle 10 Minuten
  Daten via HttpRequest/PHP Backend in die Datenbank einfüllt.
- Im Ordner Models sind die Wetter Daten Strukturen enthalten 
- im File Service1.cs (-> View Code) ist der Initialisierungs Code des Services enthalten