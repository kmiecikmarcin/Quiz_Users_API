# Quiz_Users_API

## Wymagania:
    Narzędzie (aplikacja) ma mieć możliwość rozszerzalności oraz dostępności w celach dalszego rozwoju. 
    Program powinien zawierać obsługę użytkowników takich jak: uczeń, nauczyciel.
    Podstawą jest możliwość rozwiązywania quizu w celu sprawdzenia swojej wiedzy.
    Program powinien zawierać repetytorium dla każdego porzedmiotu i jego tematów, które bedą przechowywane za pomocą bazy danych.
    Nauczyciel powienien mieć możliwość dodawania nowych rzeczy do repetytorium oraz tworzenia quiz'ów jako sprawdzianów.
    W aplikacji powinna być swobodna dowolność dodawania nowych pytań (zarówno dla nauczycieli jak i uczniów) z konkretnego zakresu wiedzy przez użytkowników.
    Repetytorium jest niezależne od Quiz'u.
    
## Założenia dla Api:
    Api ma za zadanie obługiwać komunikację i przepływ danych między aplikacją, a bazą danych. W tym przypadku jest to
    obsługa:
        - rejestracji użytkownika w systemie,
        - logowania użytkownika w systemie,
        - edycji danych konta,
        - stworzeniu menu głównego aplikacji na podstawie przypisanych uprawnień dla konkretnej grupy użytkowników,
        - grania w quiz na podstawie informacji o zalogowaniu,
        - dostępu do przeglądania oraz edycji repetytorium dla wybranej grupy użytkowników (weryfikowanej na podstawie logowania),
        - możliwości tworzenia nowych pytań dla tematu w Quiz'ie.

# Rejestracja:
    Rejestracja ma za zadanie obsługę dodawania nowych użytkowników do systemu uwzględniając pewne wstępne założenia:
        - Nazwa użytkownika jest określona przez minimum oraz maksimum jego długości, nie może zawierać znaków specjalnych;
        - Email jest sprawdzany poprzez określenie minimum długości, sprawdzenie czy zawiera "@";
        - Hasło, które użytkownik wprowadza ma mieć określone minimum długości, może zawierać znaki specjalne i liczby, hasło ma być hash'owane podczas rejestracji;
        - Powtórzenie hasła powinno działać na tych samych regułach co hasło oraz zawierać dokładnie taką samą wartość;
        - Powyższe wprowadzane przez użytkownika dane (poza hasłem) są sprawdzane czy już w bazie nie istnieją.

# Logowanie:
    Logowanie ma na celu umożliwienia dostępu do aplikacji dla użytkowników poprzez wprowadzenie danych logowania:
        - Użytkownik wprowadza swoją nazwę użytkownika oraz hasło podane podczas rejestracji,
        - Dodakowo login oraz hasło są sprawdzane, czy faktycznie taki użytkownik o podanym konkretnym loginie istnieje oraz czy
        podane przez niego hasło jest prawidłowe z tym, które przechowuje baza danych.        
    Dodatkowo aplikacja prowadzi obłsugę przypadków, w których użytkownik:
        - Zapomniał hasła (reset), które korzystać będzie z kodu weryfikacyjnego;
        - Zapomniał loginu (wysłanie przypomnienia), obłsugiwać tą akcję bedzie implementacja automatycznego emaila.

# Edycja danych:
    Ten fragment ma obsługiwać zmiany w informacjach dotyczacych użytkownika tj.:
        - Użytkownik może zmienić adres email, jednak nowy adres nie może znajdować się już w bazie;
        - Możliwośc zmiany loginu użytkownika z tym, że nowe nazwa nie może znajdować się już w bazie;
        - Zamiana hasła, które musi być kompletnie nowe w porównaniu do porzedniego;
        - mozliwośc usunięcia konta, które nastąpi po zatiwerdzeniu akcji hasłem.   

# Endpointy:
    - Pierwszy - GET obłsugujący logowanie użytkownika;
    - PUT umożliwający resetowanie hasła w razie jego zapomnienia;
    - PUT umożliwiający wysłanie wiadomości na email użytkownika z przypomnieniem nazwy użytkownika;
    - POST odpowiadający za rejestrację nowego użytkownika w systemie;
    - DELETE odpowiadający za usuwanie konta użytkownika;
    - PUT'y pozwalające na zmianę: nazwy użytkownika, emaila, hasła.


Folder Functions -> generateSecret.js oraz generateToken, pierwszy generuje "klucz" weryfikacyjny, drugi zamienia go na cyfry a nie "zahashowany?" kod

Folder Models -> modele db działające dla poszczególnych endpointów przy ingenerncji zmiany danych z bazą 

Folder Main -> źródło programu, tutaj następuję przejście i rozbicie do routingu

Folder Routes -> endpointy oraz ich funkcjonalność

Folder bin: -> database.js zawiera implementację połączenia z bazą danych 
