# Tesztprojekt Vázlat – D modul – Interaktív Frontend API-val

## Versenyidő

**4 órád** van a D modul elvégzésére.

## Bevezetés

A D modul egy REST API frontend implementációjára fókuszál.

## Általános projekt- és feladatleírás

A projekt során egy REST API frontendjét kell létrehoznod. Először a frontend felhasználóinak be kell tudniuk jelentkezniük. Az API hitelesítési mechanizmusát használva a frontend hozzáférhet az API-hoz és adatokat küldhet és kérhet le róla. Az ebben a modulban általad létrehozott funkcionalitás a C modulban létrehozott backend szolgáltatásaira épül.

**Backend:** A projekt elkészítéséhez rendelkezésre áll egy teljesen működőképes backend. A projekt során saját fejlesztésű backend nem használható. A backendet az `/assets/backend-solution/README.md` fájlban leírtak szerint lehet elindítani egy docker konténerben.

**API dokumentáció:** A backend szolgáltatás API végpontjait leíró OpenAPI referencia dokumentum áll rendelkezésre a `\assets\skillshare-academy-api.yaml` fájlban. A leírást könnyebben olvasható formában is megjelenítheted a Swagger online eszközével: [https://editor.swagger.io/](https://editor.swagger.io/)

**Adatbázis:** A backend által használt adatbázishoz nincs közvetlen hozzáférésed. Egy adatbázis dump azonban elérhető az `assets/db` könyvtárban, hogy megvizsgálhasd az adatstruktúrát és tartalmat. Az adatbázisban tárolt összes felhasználó jelszava **`password123`**.

A frontend felhasználói megjeleníthetik az elérhető kurzusokat, beiratkozhatnak kurzusokra, fejezeteket teljesítésével krediteket szerzhetnek meg és mentorált órákat foglalhatnak. A frontendnek kezelnie kell a kreditrendszert, valós idejű visszaigazolásokat és adatvizualizációt kell biztiosítania, miközben intuitív felületet nyújt a felhasználóknak.

Az alkalmazás használatának megkezdéséhez a felhasználóknak hitelesíteni kell magukat. A felhasználóknak be kell jelentkezniük a tanulási platform funkcióinak eléréséhez. A kapott X-API tokent minden kérésnél el kell küldeni a szervernek. A tokent a böngészőben le kell tárolni, annak érdekében, hogy az oldal újratöltések után és navigáció során is elérhető maradjon.

A frontendet JavaScript keretrendszerrel kell elkészítened. Ezen felül használhatsz további könyvtárakat is (pl. React Router). Az alkalmazásnak egyoldalas alkalmazásnak (SPA) kell lennie. Az útválasztást (routing) a keretrendszernek kell kezelnie. Az oldal újratöltése után ugyanazt a tartalmat kell megjeleníteni, mint ami korábban látható volt, kivéve a nem mentendő felhasználói inputokat (pl. formok kitöltésénél).

## Követelmények

A frontenden a következő funkcionális követelményeket kell implementálnod:

- Egyoldalas alkalmazás (SPA) architektúra modern JavaScript keretrendszerrel
- A backend által biztosított hitelesítési rendszer használata X-API tokenekkel
- Integráció a biztosított REST API backenddel
- Hibakezelés különböző HTTP státuszkódokkal
- Helyi tárolás a böngészőben a hitelesítési token megőrzéséhez
- Adatlekérdezés valós idejű foglalási státusz megjelenítéséhez
- Adatvizualizáció Chart.js használatával a tanulási előzmények elemzéséhez
- Harmadik féltől származó script integrációja a továbbfejlesztett funkcionalitáshoz
- Reszponzív design az optimális felhasználói élményhez

### Tervezési irányelvek:

Az egyes oldalakhoz tartozó vázlatok (wireframe-ek) az `assets/` könyvtárban találhatók. Az implementációnak:

- Követnie kell a vázlatokban látható elrendezési struktúrát és komponens elhelyezést
- Meg kell őriznie a SkillShare Academy márka identitását és arculatát
- Konzisztens stílust kell alkalmazni, amely illeszkedik a platform vizuális szabványaihoz
- Biztosítani kell, hogy a reszponzív tervezési elvek érvényesüljenek minden képernyőméreten
- Meg kell felelnie a modern UI/UX jó gyakorlatoknak

### Hibakezelés

Az API különböző hibákat adhat vissza működés során. A frontendnek kezelnie kell ezeket a hibákat és érthető módon meg kell jelenítenie őket a felhasználónak. A következő hibákat kell kezelni:

- `400 Bad Request` – A kérés hibás volt. A felhasználót értesíteni kell, hogy érvénytelen adatokat adott meg.
- `401 Unauthorized` – A hitelesítési token érvénytelen vagy lejárt. A felhasználót át kell irányítani a bejelentkezési oldalra.
- `403 Forbidden` – A felhasználónak nincs jogosultsága a kért művelethez. A felhasználót értesíteni kell a hiányzó jogosultságokról.
- `404 Not Found` – A kért erőforrás nem található. A felhasználót értesíteni kell, hogy a tartalom nem elérhető.
- `422 Unprocessable Entity` – Validációs hibák történtek. Meg kell jeleníteni a specifikus mező hibát, hogy a felhaszunáló javítani tudja.
- `500 Internal Server Error` – Szerver hiba történt. A felhasználót értesíteni kell egy ideiglenes rendszerhibáról.

### Oldalak

A következő oldalakat kell implementálni:

#### Bejelentkezési oldal (Login page)

A bejelentkezési oldal lehetővé teszi a felhasználók számára a SkillShare Academy platformmal való hitelesítést. Ha a felhasználó nincs bejelentkezve, automatikusan erre az oldalra lesz irányítva.

Az oldalnak a következő elemeket kell tartalmaznia:

- Egy email bemeneti mezőt a felhasználó email címének megadásához.
- Egy jelszó bemeneti mezőt a felhasználó jelszavának megadásához.
- Egy bejelentkezési gombot a felhasználó hitelesítésének indításához.
- Szöveget, amely elmagyarázza, hogy a regisztráció ingyenes.
- Egy linket a regisztrációs oldalra azoknak a felhasználóknak, akiknek még nincs fiókjuk.
- Űrlap validációt valós idejű visszajelzéssel érvénytelen bemenetekhez.

Sikeres hitelesítés után az X-API tokent a böngésző local storage-ában kell tárolni és a felhasználót át kell irányítani a Felhasználói Irányítópultra (Dashboard).

#### Regisztrációs oldal (Registration page)

A regisztrációs oldal lehetővé teszi az új felhasználók számára ingyenes fiókok létrehozását a platformon.

Az oldalnak a következő elemeket kell tartalmaznia:

- Egy név bemeneti mezőt a felhasználó teljes nevéhez.
- Egy email bemeneti mezőt a felhasználó email címéhez.
- Egy jelszó bemeneti mezőt erősség validációval.
- Egy jelszó megerősítő mezőt, amelynek meg kell egyeznie a jelszóval.
- Egy regisztrációs gombot a fiók létrehozásához.
- Egy linket, ami visszavezet a bejelentkezési oldalra.

Az űrlap validációnak tartalmaznia kell email formátum ellenőrzést, jelszó erősség követelményeket és két megadott jelszó egyezőségének megerősítését. Sikeres regisztráció után a felhasználót vissza kell irányítani a bejelentkezési oldalra.

#### Felhasználói Irányítópult (Dashboard page)

Az irányítópult a bejelentkezés utáni fő kezdőlapként szolgál, felhasználói statisztikákat és tanulási elemzéseket jelenít meg.

![Dashboard Wireframe](assets/wireframes/03-dashboard.png)

Az oldalnak a következő elemeket kell tartalmaznia:

- Üdvözlő üzenet a felhasználó nevével.
- Jelenlegi kredit egyenleg kiemelten megjelenítve.
- Kreditszerzés előrehaladási diagramja (vonaldiagram) Chart.js használatával implementálva, amely az elmúlt 30 nap kreditszerzését mutatja.
- Kurzus teljesítések státusz diagramja (fánk diagram) Chart.js használatával implementálva, amely a teljesített vs. hátralévő fejezeteket mutatja az összes beiratkozott kurzusban.
- Navigációs linkek a Kurzuskatalógus és Mentor foglalás oldalakra.
- Gyors statisztika megjelenítése az összes beiratkozott kurzus és teljesített fejezet számával.

**Chart.js implementáció**: A diagram implementációhoz lásd a [hivatalos Chart.js dokumentációt](https://www.chartjs.org/docs/latest/).

#### Kurzus Katalógus (Course Catalog)

A kurzus katalógus az összes elérhető kurzust megjeleníti kijelezve a kurzuskártyán, hogy a felhasználó beiratkozott-e az adott kurzusra.

Az oldalnak a következő elemeket kell tartalmaznia:

- Kurzuskártyák megjelenítése az alábbi információkkal: cím, leírás, nehézségi szint, összes fejezet, összes elérhető kredit.
- Minden kurzuskártyánál a beiratkozási státuszt egyértelműen jelezni kell:
  - Ha a felhasználó **nincs beiratkozva**: jelenítsen meg egy "Beiratkozás" gombot, amely azonnali beiratkozást indít.
  - Ha a felhasználó **beiratkozott**: jelenítsen meg egy "Tanulás folytatása" gombot, amely a kurzusoldalra navigál.
- Keresési funkcionalitás a kurzusok cím vagy leírás szerinti szűréséhez.
- Szűrési lehetőségek nehézségi szint szerint (Kezdő, Középszintű, Haladó).
- Vizuális jelzők a beiratkozási státusz megjelenítéséhez minden kurzusnál.

A kurzus beiratkozásnak azonnali vizuális visszajelzést kell adnia, és frissíteni kell a gomb állapotát.

#### Kurzus oldal (Course page)

Az oldal részletes előrehaladási információt és fejezetkezelést biztosít egy olyan kurzushoz, amire a felhasználó beiratkozott.

##### Kurzus fejléc

- Kurzus címe és leírása
- Vizuális haladásjelző a teljesített fejezetek számát mutatja az összes fejezethez képest
- Kredit haladásjelző a megszerzett krediteket mutatja a kurzuson megszerezhető lehetséges összes kredithez képest

##### Fejezetkezelés

Az kurzus összes fejezetének listázása a következő információkkal:

- Fejezet címe és rövid leírása
- Kreditérték (3-5 kredit fejezetként)
- Teljesítési státusz megfelelő műveletekkel:
  - **Ha nincs teljesítve**: "Teljesítettnek jelölés" gomb, amely krediteket ad a felhasználó fiókjához kattintáskor
  - **Ha teljesítve**: "Fejezet teljesítve" címke és "Eredmény megosztása" gomb LinkedIn megosztáshoz
- Egy "Fejezet megtekintése" gomb, amely letiltottként (inaktívként) jelenik meg, hogy a jövőbeli funkcionalitást reprezentálja. Ezt a gombot olyan stílussal kell megjeleníteni, hogy egyértelműen jelezze, hogy nem funkcionális (pl. szürkítve, letiltott kurzorral)

##### Fejezet teljesítési viselkedés

Amikor egy felhasználó egy fejezetet teljesítésként jelöl:

- A krediteket azonnal hozzá kell adni a fiókjához
- A "Teljesítettként jelölés" gombot le kell cserélni egy "Fejezet teljesítve" címkére és LinkedIn megosztási gombra
- A haladásjelzőket frissíteni kell az új teljesítési státusz tükrözéséhez

##### LinkedIn megosztási integráció

- Lásd az `assets/third-party/README.md` fájlt az implementáció részleteihez
- Konfigurálni kell a megosztási tartalmat a kurzus címe, fejezet neve, a most megszerzett kreditek és a felhasználó összes eddig megszerzett kreditjei alapján

#### Mentorált foglalkozás foglalási oldala (Mentor Session Booking page)

A mentorált foglalkozás foglalási oldala az elérhető jövőbeli mentor foglalkozásokat jeleníti meg, amelyeket a felhasználók foglalhatnak és megnézhetik a foglalási visszaigazolásokat.

Az oldalnak a következő elemeket kell tartalmaznia:

- Elérhető mentor foglalkozások listája a következő információkkal minden üléshez:
  - Mentor neve és további kulcsfontosságú információ (szakértési területek, tapasztalati szint).
  - Egy "Profil megtekintése" gomb, amely letiltott/inaktívként jelenik meg, hogy a jövőbeli funkcionalitást reprezentálja. Ezt a gombot olyan stílussal kell megjeleníteni, hogy egyértelműen jelezze, hogy nem funkcionális (pl. szürkítve, letiltott kurzorral).
  - A foglalkozás dátuma és időpontja.
  - A foglalkozás időtartama (mindig egy óra).
  - A foglalkozás kreditköltsége a mentor óradíja alapján (8-15 kredit/óra).
  - "A foglalkozás foglalása" gomb a foglalási kérelem elküldéséhez.
- A foglalás elküldése után az foglalkozásnak "Visszaigazolásra vár" státuszt kell mutatniuk.
- Valós idejű lekérdezés 30 másodpercenként a mentor válaszok ellenőrzéséhez.
- Státuszfrissítések, amikor a foglalások "pending" állapotból "confirmed" vagy "rejected" állapotba változnak.
- Vizuális értesítések a foglalási státusz változásai esetén.
- A felhasználó lefoglalt foglalkozásainak listája a státuszt, a mentort, a dátum/időt és a költséget kijelezve.

A foglalási visszaigazolási rendszernek kezelnie kell a mentor válaszát és azonnali vizuális visszajelzést kell adnia a felhasználóknak. A foglalási elküldés után 30 másodpercenként le kell kérdezni a mentori visszaigazolásokat. Frissíteni kell a felhasználói felületet, amikor a foglalások "pending" állapotból "confirmed" vagy "rejected" állapotba változnak.

## Értékelés

A projektmunka a Google Chrome böngészőben lesz értékelve. Az értékelés funkcionális teszteket és felhasználói élmény értékelését tartalmazza.

**Fontos**: A biztosított REST API backend bármilyen módosítása, beleértve az adatbázis változtatásait, nem lesz figyelembevéve az értékelés során. Csak a biztosított REST API végpontokat használd módosítás nélkül.

## Pontszám eloszlás

Az alábbi táblázat bemutatja, hogyan oszlanak meg a pontok és hogyan illeszkednek a WorldSkills Occupation Standards (WSOS) szabványokhoz.
Kérjük, olvasd el a Műszaki Leírást a WorldSkills Occupation Standards teljes magyarázatához.

| WSOS SZAKASZ | Leírás                                     | Pontok |
| ------------ | ------------------------------------------ | ------ |
| 1            | Munkaszervezés és önkezelés                | 0      |
| 2            | Kommunikáció és interperszonális készségek | 0      |
| 3            | Tervezési implementáció                    | 5      |
| 4            | Front-End fejlesztés                       | 17     |
| 5            | Back-End fejlesztés                        | 0      |
|              |                                            |        |
| **Összesen** |                                            | 22     |
