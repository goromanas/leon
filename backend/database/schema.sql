create table ROLE
(
	ID BIGINT not null primary key,
	NAME VARCHAR(255)
);

create table USER
(
	ID BIGINT not null primary key,
	FIRST_NAME VARCHAR(255),
	LAST_NAME VARCHAR(255),
	PASSWORD VARCHAR(255),
	USERNAME VARCHAR(255)
);

create table USER_ROLE
(
	USER_ID BIGINT not null,
	ROLE_ID BIGINT not null,
	constraint USER_FOREIGN_KEY
		foreign key (USER_ID) references USER (ID),
	constraint ROLE_FOREIGN_KEY
		foreign key (ROLE_ID) references ROLE (ID)
);
