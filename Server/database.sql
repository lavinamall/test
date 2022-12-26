CREATE DATABASE LoanShark;

̀

SELECT * FROM Users;
SELECT * FROM Users ORDER BY UserName ASC;

INSERT INTO Users (UserName, Mobile, Address, Notes) VALUES ('Gannu', '9769883785', 'Phase 4, Boronada', 'no notes available');
INSERT INTO Users (UserName, Mobile, Address, Notes) VALUES ('Lavina', '9769883785', 'Poata C Road', 'no notes available');
INSERT INTO Users (UserName, Mobile, Address, Notes) VALUES ('Sunil', '', 'Boranada', 'no notes available');

UPDATE USERS SET MOBILE='9314711168' WHERE USERID=1;

CREATE TABLE UserTransactions(
    TransactionId SERIAL PRIMARY KEY,
    UserId INT NOT NULL,
    StartDate DATE NOT NULL DEFAULT CURRENT_DATE,
    Duration_in_months NUMERIC(5,0),
    EndDate DATE,
    Principal NUMERIC(18,0) NOT NULL,
    Interest NUMERIC(18,2),
    Rate NUMERIC(5,2),
    ModeOfPayment VARCHAR(100),
    CONSTRAINT fk_user FOREIGN KEY(UserId) REFERENCES Users(UserId)
);

INSERT INTO UserTransactions (UserId,StartDate,Duration_in_months,EndDate,Principal,Interest,Rate) VALUES (1,'01-October-2022',1,'31-October-2022',100000,NULL,5);
INSERT INTO UserTransactions (UserId,StartDate,Duration_in_months,EndDate,Principal,Interest,Rate) VALUES (2,'01-October-2022',2,'31-October-2022',200000,NULL,5);
INSERT INTO UserTransactions (UserId,StartDate,Duration_in_months,EndDate,Principal,Interest,Rate) VALUES (3,'01-October-2022',3,'31-October-2022',300000,NULL,5);

SELECT * FROM UserTransactions;

SELECT U.UserName, to_char(StartDate, 'DD-MMM-YYYY') AS StartDate, to_char(EndDate, 'DD-MMM-YYYY') AS EndDate 
FROM UserTransactions T 
INNER JOIN Users U ON T.UserId = U.UserId;

SELECT principal, cast(principal as money) FROM UserTransactions;

SELECT CASE WHEN (CURRENT_DATE - enddate) > 0 THEN (CURRENT_DATE - enddate) ELSE '' END AS Overdue FROM UserTransactions;

SELECT TransactionId, U.UserName, to_char(StartDate, 'DD Month YYYY') AS StartDate, 
to_char(EndDate, 'DD Month YYYY') AS EndDate,
TO_CHAR(Principal, '99G99G999') AS Principal,
TO_CHAR(Interest, '99G99G999')AS Interest, Rate,
Duration_in_months as Duration,
CASE WHEN (CURRENT_DATE - enddate) > 0 THEN (CURRENT_DATE - enddate) ELSE NULL END AS Overdue
FROM UserTransactions T INNER JOIN Users U ON T.UserId = U.UserId;

-- DROP TABLE UserTransactions; DROP TABLE Users;