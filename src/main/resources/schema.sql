create sequence hibernate_sequence;

alter sequence hibernate_sequence owner to ikqsgfdtdcoppm;

/* App_user*/
CREATE TABLE app_user
(
    id BIGINT NOT NULL DEFAULT nextval('hibernate_sequence') CONSTRAINT app_user_pkey PRIMARY KEY,
    balance BIGINT NOT NULL,
    email VARCHAR(255) CONSTRAINT email_unique UNIQUE,
    first_name VARCHAR(255),
    last_name  VARCHAR(255),
    password   VARCHAR(255),
    user_limit BIGINT DEFAULT 250000
);

/* Alert*/
CREATE TABLE alert
(
    id BIGINT NOT NULL DEFAULT nextval('hibernate_sequence') CONSTRAINT alert_pkey PRIMARY KEY,
    content VARCHAR(255),
    level   VARCHAR(10),
    read    BOOLEAN NOT NULL, /* do wywalenia */
    title   VARCHAR(50),
    user_id BIGINT NOT NULL CONSTRAINT alr_usr_fk REFERENCES app_user
);

/* Bank */
CREATE TABLE bank
(
    id BIGINT NOT NULL DEFAULT nextval('hibernate_sequence') CONSTRAINT bank_pkey PRIMARY KEY,
    name VARCHAR(255),
    user_id BIGINT CONSTRAINT bnk_usr_fk REFERENCES app_user
);

/* Bank account*/
CREATE TABLE bank_account
(
    id      BIGINT NOT NULL DEFAULT nextval('hibernate_sequence') CONSTRAINT bank_account_pkey PRIMARY KEY,
    active  BOOLEAN NOT NULL,
    number  VARCHAR(26),
    bank_id BIGINT CONSTRAINT bnkacc_bnk_fk REFERENCES bank,
    user_id BIGINT CONSTRAINT bnkacc_usr_fk REFERENCES app_user,
    balance BIGINT NOT NULL
);

/* Comment*/
CREATE TABLE comment
(
    id      BIGINT NOT NULL DEFAULT nextval('hibernate_sequence') CONSTRAINT comment_pkey PRIMARY KEY,
    content VARCHAR(512),
    date    TIMESTAMP,
    title   VARCHAR(50),
    user_id BIGINT CONSTRAINT com_usr_fk REFERENCES app_user
);

/* Currency*/
CREATE TABLE currency
(
    id      BIGINT NOT NULL DEFAULT nextval('hibernate_sequence') CONSTRAINT currency_pkey PRIMARY KEY,
    name    VARCHAR(5),
    user_id BIGINT NOT NULL CONSTRAINT cur_usr_fk REFERENCES app_user
);


/* Expense category */
CREATE TABLE expense_category
(
    id      BIGINT NOT NULL DEFAULT nextval('hibernate_sequence') CONSTRAINT expense_category_pkey PRIMARY KEY,
    color   VARCHAR(7),
    name    VARCHAR(50),
    note    VARCHAR(255),
    user_id BIGINT NOT NULL CONSTRAINT exp_cat_usr_fk REFERENCES app_user
);

/* Income category */
CREATE TABLE income_category
(
    id      BIGINT NOT NULL DEFAULT nextval('hibernate_sequence') CONSTRAINT income_category_pkey PRIMARY KEY,
    color   VARCHAR(7),
    name    VARCHAR(50),
    note    VARCHAR(255),
    user_id BIGINT NOT NULL CONSTRAINT inc_cat_usr_fk REFERENCES app_user
);

/* Bill*/
CREATE TABLE bill
(
    id     	 BIGINT NOT NULL DEFAULT nextval('hibernate_sequence') CONSTRAINT bill_pkey PRIMARY KEY,
    amount       BIGINT NOT NULL,
    bank_number  VARCHAR(26),
    due_date     TIMESTAMP,
    name         VARCHAR(50),
    note         VARCHAR(255),
    paid         BOOLEAN NOT NULL,
    payment_date TIMESTAMP,
    category_id  BIGINT NOT NULL CONSTRAINT bill_exp_cat_fk REFERENCES expense_category,
    user_id      BIGINT NOT NULL CONSTRAINT bill_usr_fk REFERENCES app_user
);

/* Expense*/
CREATE TABLE expense
(
    id          BIGINT NOT NULL DEFAULT nextval('hibernate_sequence') CONSTRAINT expense_pkey PRIMARY KEY,
    amount      BIGINT NOT NULL,
    date        TIMESTAMP,
    name        VARCHAR(50),
    note        VARCHAR(255),
    category_id BIGINT NOT NULL CONSTRAINT exp_exp_cat_fk REFERENCES expense_category,
    user_id     BIGINT NOT NULL CONSTRAINT exp_usr_fk REFERENCES app_user
);

/* Income*/
CREATE TABLE income
(
    id          BIGINT NOT NULL DEFAULT nextval('hibernate_sequence') CONSTRAINT income_pkey PRIMARY KEY,
    amount      BIGINT NOT NULL,
    date        TIMESTAMP,
    name        VARCHAR(50),
    note        VARCHAR(255),
    category_id BIGINT NOT NULL CONSTRAINT inc_inc_cat_fk REFERENCES income_category,
    user_id     BIGINT NOT NULL CONSTRAINT inc_usr_fk REFERENCES app_user
);

/* Objective*/
CREATE TABLE objective
(
    id          BIGINT NOT NULL DEFAULT nextval('hibernate_sequence') CONSTRAINT objective_pkey PRIMARY KEY,
    amount      BIGINT NOT NULL,
    date        TIMESTAMP,
    description VARCHAR(255),
    name        VARCHAR(50),
    priority    BIGINT NOT NULL,
    category_id BIGINT NOT NULL CONSTRAINT obj_exp_cat_fk REFERENCES expense_category,
    user_id     BIGINT NOT NULL CONSTRAINT obj_usr_fk REFERENCES app_user
);
