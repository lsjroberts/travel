# Travel

### Hipchat

```
node hipchat.js [port]
```

**Summary**
```
/summary
```

**Tube Lines Status**
```
/tube/line/status
```

**Tube Line Incidents**
```
/tube/line/incidents
```

**Tube Station Incidents**
```
/tube/station/incidents
```

_etc._

<!--
_n.b. this is a work in progress_

Get travel updates and statuses from your terminal.

## Installation

...

## Usage

Run any command with `-h|--help` to see a full list of options.

**List available providers**
```
$ travel providers
```

**Use a travel provider**
```
$ travel providers use [provider] [alias]
$ travel providers use tfl
$ travel providers use national-rail nr
```

**Remove a travel provider**
```
$ travel providers remove [provider]
$ travel providers remove national-rail
```

**Status**
```
$ travel status
```

**Favourites**
```
$ travel favourite [command]
$ travel favourite tfl District --east
```

## Travel Providers

### UK

#### Transport for London (TFL)

**Lines**
```
$ travel tfl [line] [options]
$ travel tfl District --east
```

**Stations**
```
$ travel tfl [station] [options]
$ travel tfl Victoria
```

**Roads**
```
$ travel tfl roads
```

#### National Rail

**Stations**
```
$ travel nr
```
-->